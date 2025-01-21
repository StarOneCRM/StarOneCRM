import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [Mode, SetMode] = useState(false)
  const [data, setData] = useState({});

  const handleChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    setData(values => ({...values, [name]: value}))
  }
  const MakeCall = (callType) => {
    switch(callType){
      case "create":
        document.querySelector(".popUpCreate").style.display = "block";
        // CreateCall()
        break;
      case "read":
        document.querySelector(".popUpRead").style.display = "block";
        // CreateCall()
        break;
      case "update":
        document.querySelector(".popUpUpdate").style.display = "block";
        // CreateCall()
        break;
      case "del":
        document.querySelector(".popUpDelete").style.display = "block";
        // CreateCall()
        break;
    }
  }
  const handleMode = (event) => {
    SetMode(event.target.value)
    MakeCall(event.target.value)
  }
  const handleCreate = (event) => {
    console.log("creat")
  }
  const handleRead = (event) => {
    console.log("read")
  }
  const handleUpdate = (event) => {
    console.log("update")
  }
  const handleDelete = (event) => {
    console.log("delete")
  }
  // const create
  return (
    <>
      <div>
        <h1>Student CRUD</h1>
        <button onClick={handleMode} value={"create"}>Create</button>
        <button onClick={handleMode} value={"read"}>Read</button>
        <button onClick={handleMode} value={"update"}>Update</button>
        <button onClick={handleMode} value={"del"}>Delete</button>
      </div>
      <div className='popUpCreate'>
        <h4>Insert Student Data</h4>
        <form onSubmit={handleCreate}>
          <label>Name:
          <input 
            type="text" 
            name="name" 
            value={data.name || ""} 
            onChange={handleChange}
          />
          </label>
          <br/>
          <label>Email:
            <input 
              type="email" 
              name="email" 
              value={data.email || ""} 
              onChange={handleChange}
            />
          </label>
          <br/>
          <label>Password:
            <input 
              type="password" 
              name="password" 
              value={data.password || ""} 
              onChange={handleChange}
            />
            </label>
            <br/>
            <input type="submit" />
            <button onClick={() => {document.querySelector(".popUpCreate").style.display = "none";setData({})}}>X</button>
        </form>
      </div>
      <div className='popUpRead'>
        <h4>Read Student Data</h4>
        <form onSubmit={handleRead}>
          <label>Name:
          <input 
            type="text" 
            name="name" 
            value={data.name || ""} 
            onChange={handleChange}
          />
          <br/>
        </label>
            <input type="button" value={"Submit"}/>
            <button onClick={() => {document.querySelector(".popUpRead").style.display = "none";setData({})}}>X</button>
        </form>
      </div>
      <div className='popUpUpdate'>
        <h4>Update Student Data</h4>
          <label>Name:
          <input 
            type="text" 
            name="name" 
            value={data.name || ""} 
            onChange={handleChange}
          />
          <br/>
        </label>
        <input type="button" value={"Submit"}/>
        <form onSubmit={handleUpdate}>
          <label>Name:
          <input 
            type="text" 
            name="name" 
            value={data.name || ""} 
            onChange={handleChange}
          />
          </label>
          <br/>
          <label>Email:
            <input 
              type="email" 
              name="email" 
              value={data.email || ""} 
              onChange={handleChange}
            />
          </label>
          <br/>
          <label>Password:
            <input 
              type="password" 
              name="password" 
              value={data.password || ""} 
              onChange={handleChange}
            />
            </label>
            <br/>
            <input type="submit" value={"Change"} />
            <button onClick={() => {document.querySelector(".popUpUpdate").style.display = "none";setData({})}}>X</button>
        </form>
      </div>
      <div className='popUpDelete'>
        <h4>Read Student Data</h4>
        <form onSubmit={handleDelete}>
          <label>Name:
          <input 
            type="text" 
            name="name" 
            value={data.name || ""} 
            onChange={handleChange}
          />
          <br/>
        </label>
        <label>Password:
          <input 
            type="password" 
            name="name" 
            value={data.password || ""} 
            onChange={handleChange}
          />
          <br/>
        </label>
            <input type="button" value={"Submit"}/>
            <button onClick={() => {document.querySelector(".popUpDelete").style.display = "none";setData({})}}>X</button>
        </form>
      </div>
    </>
  )
}

export default App
