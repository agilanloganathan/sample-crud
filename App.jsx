import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [user,setUser] = useState([])
  const [filterusers,setFilterusers]=useState([])
  const [isModalOpen,setIsModalOpen]=useState(false)
  const [userData,setUserData]=useState ({
    name: "", age: "", city:""
  })


const getAllUsers = async() =>{
    await axios.get("https://6614dda02fc47b4cf27d4589.mockapi.io/sample")
    .then ((res) =>{
      console.log(res.data)
      setUser(res.data)
      setFilterusers(res.data)
    })
}
  useEffect (()=>{
    getAllUsers()

  },[]) 

  // Search function

  const handleSearchChange = (e)=>{
    const searchText = e.target.value.toLowerCase()
     const filteredUsers = user.filter((user)=>
     user.name.toLowerCase().includes(searchText) || 
     user.city.toLowerCase().includes(searchText) )
     setFilterusers(filteredUsers)
     
  

  }

  // Delete user function

  const handleDelete = async() =>{
    await axios.delete('https://6614dda02fc47b4cf27d4589.mockapi.io/sample')
    .then ((res)=>{

      setUser(res.data)
      setFilterusers(res.data)

    })

  }
  // close Modal
  const closeModal =()=>{
    setIsModalOpen(false)

  }

  // Add user details
  const handleAddRecord =()=>{
    setUserData({name: "", age: "", city:"" })
    setIsModalOpen(true)

  }
const handleData = (e)=>{
    setUserData({...userData , [e.target.name]: [e.target.value]})
}
   const handleSubmit = async()=>{
    e.preventDefault()
    if (userData.id){
      await axios.patch("https://6614dda02fc47b4cf27d4589.mockapi.io/sample/post",userData)
    .then((res)=>{
      console.log(res)
    })

    }else{
    await axios.post("https://6614dda02fc47b4cf27d4589.mockapi.io/sample/post",userData)
    .then((res)=>{
      console.log(res)
    })
  }
  closeModal ()
   }
   // update user function
   const handleUpdateRecord = (user)=>{
      setUserData(user)
      setIsModalOpen(true)
   }

  return (
    
      <div className='container'>
      <h3>CRUD APPLICATION USING FORNTEND DEVELOPEMENT AND NODE JS BACKEND DEV...</h3>

      <div className='input-search'>
      <input type='search' placeholder='Search Text Here' onChange={handleSearchChange}/>
      <button className='btn green' onClick={handleAddRecord}>Add Records</button>
      
      </div>
     <div>
     <table className='table'>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Age</th>
            <th>City</th>
            <th >Edit</th>
            <th >Delete</th>
          </tr>
        </thead>
        <tbody>
          {filterusers&& filterusers.map((User,index)=>{
              return(
                <tr key={User.id}>
                <td>{index + 1}</td>
                <td>{User.name}</td>
                <td>{User.age}</td>
                <td>{User.city}</td>
                <td ><button className='btn green' onClick={handleUpdateRecord}>Edit</button></td>
                <td ><button onClick={()=> handleDelete(User.id)} className='btn red'>Delete</button></td>
    
              </tr>
              )
          }) }
         

         
        </tbody>
      </table> 
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <h2>User Record</h2>
            <div className="input-group">
              <label htmlFor="name">Full Name</label>
              <input type="text" name='name' value={userData.name} id='name' onChange={handleData} />
            </div>
            <div className="input-group">
              <label htmlFor="age">Age</label>
              <input type="number" name='age' value={userData.age}  id='age'onChange={handleData} />
            </div>
            <div className="input-group">
              <label htmlFor="city">City</label>
              <input type="text" name='city' value={userData.city} id='city' onChange={handleData} />
            </div>
            <button className='btn green' onChange={handleSubmit}>Submit</button>
          </div>
        </div>
      )}
     </div>
     
      </div>
      
    
  )
}

export default App
