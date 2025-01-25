// // Controllers: authController.js
// const jwt = require("jsonwebtoken");
// const { Student } = require("../models/user.model");
// const sendResponse = require("../utils/sendResponse");
// const { sendEmail } = require("../utils/email");

// exports.register = async (req, res) => {
//     try {
//         const { name, age, email, major, isAdmin } = req.body;
//         const newStudent = new Student({ name, age, email, major, isAdmin });
//         await newStudent.save();
//         res.status(201).json({ message: "Student registered. Verification email sent." });
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// };

// exports.login = async (req, res) => {
//     const { email } = req.body;
//     try {
//         const student = await Student.findOne({ email });
//         if (!student) return res.status(404).json({ message: "Student not found" });

//         const token = jwt.sign(
//             { id: student._id, isAdmin: student.isAdmin },
//             process.env.JWT_SECRET,
//             { expiresIn: "1h" }
//         );
//         res.json({ token, student });
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// };

const bcryptjs = require('bcryptjs');
const { Student } = require("../models/user.model");
const { OTP } = require("../models/otp.model");
const { sendEmail } = require("../utils/email");
const jwt = require("jsonwebtoken");

// Generate OTP
const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();

// Validate email and send OTP
exports.sendOtp = async (req, res) => {
    const { email } = req.body;

    try {
        // Check if the email is already registered
        const existingUser = await Student.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already registered" });
        }

        const otp = generateOtp();
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // OTP valid for 10 minutes

        // Save OTP in the database
        await OTP.findOneAndUpdate(
            { email },
            { otp, expiresAt },
            { upsert: true, new: true }
        );

        // Send OTP via email
        const emailContent = `
            <p>Your OTP for registration is <strong>${otp}</strong>.</p>
            <p>This OTP will expire in 10 minutes.</p>
            <br>
            <p>Thank you,<br>emailhelper468@gmail.com</p>
        `;
        await sendEmail({ to: email, subject: "Your OTP Code", html: emailContent });

        res.status(200).json({ message: "OTP sent to email" });
    } catch (error) {
        console.error("Error sending OTP:", error.message);
        res.status(500).json({ message: "Failed to send OTP" });
    }
};

// Verify OTP and create user with hashed password
exports.register = async (req, res) => {
    const { name, email, age, major, password, otp } = req.body;

    try {
        const otpRecord = await OTP.findOne({ email });
        if (!otpRecord || otpRecord.otp !== otp || otpRecord.expiresAt < new Date()) {
            return res.status(400).json({ message: "Invalid or expired OTP" });
        }

        // Delete OTP after successful validation
        await OTP.deleteOne({ email });

        // Hash the password before saving
        console.log(typeof(password))
        const hashedPassword = await bcryptjs.hash(password, 10);
        console.log(password)
        console.log(hashedPassword)
        const isMatch = await bcryptjs.compare(password, hashedPassword);
        console.log(isMatch)

        // Register the student with the hashed password
        const newStudent = new Student({ name, email, age, major, password: hashedPassword });
        await newStudent.save();

        res.status(201).json({ message: "Student registered successfully" });
    } catch (error) {
        console.error("Error during registration:", error.message);
        res.status(500).json({ message: "Registration failed" });
    }
};


exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Ensure email and password are provided
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        // Find student by email
        const student = await Student.findOne({ email });
        if (!student) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // Ensure the password exists in the database and compare with the hashed password
        if (!student.password) {
            return res.status(500).json({ message: "No password found in the database for this user" });
        }

        // Log both password and hashed password for debugging
        console.log('Received password:', password);
        console.log('Stored hashed password:', student.password);

        // Compare the provided password with the hashed password stored in the database
        console.log(typeof(password), typeof(student.password))
        const isMatch = await bcryptjs.compare(password, student.password);
        console.log(isMatch)
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: student._id, isAdmin: student.isAdmin },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.json({ token, student });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

        

exports.checkForm = async (req, res) => {
    try {
        const student = await Student.findById(req.user.id);
        if (!student) return res.status(404).json({ message: "Student not found" });

        if (!student.isFormFilled) {
            return res.status(403).json({ message: "Complete your form to access other APIs" });
        }

        res.json({ message: "Form is filled" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.fillForm = async (req, res) => {
    const { Task } = req.body;
    try {
        const student = await Student.findByIdAndUpdate(
            req.user.id,
            { Task, isFormFilled: true },
            { new: true }
        );

        if (!student) return res.status(404).json({ message: "Student not found" });

        res.json({ message: "Form successfully filled", student });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.checkStatus = async (req, res) => {
    try {
        const student = await Student.findById(req.user.id);
        if (!student) return res.status(404).json({ message: "Student not found" });

        const status = { user: student };
        res.json({ status });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
