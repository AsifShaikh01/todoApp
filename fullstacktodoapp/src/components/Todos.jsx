import React, { useEffect, useState } from 'react'
import axios from "axios";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import "../components/todo.css"
const Todos = () => {
    const [todo , setTodo] = useState([]);
    const [title , setTitle] = useState("");
    const [desc , setDesc] = useState("");
    const [status , setStatus] = useState(false)

    const getData = async ()=>{
      await axios.get(`https://easy-teal-colt.cyclic.app/todos/todos`)
      .then((res)=>{
         setTodo(res.data)
      })
      .catch((err)=>{
          console.log(err)
      })
    }
    useEffect(()=>{
      getData();
    },[])
    // console.log(todo)
    const handleClick = async () =>{
        
       await axios.post(`https://easy-teal-colt.cyclic.app/todos/create`,{
          title:title,
          desc:desc,
          status:false
       })
    
       getData();
    }
    const handleDelete=async(id)=>{
       await axios.delete(`https://easy-teal-colt.cyclic.app/todos/delete/${id}`);
       getData();
    }
    const handleUpdate=async(id)=>{
      if(status){
          setStatus(false)
      }else{
        setStatus(true)
      }
      await axios.patch(`https://easy-teal-colt.cyclic.app/todos/update/${id}` ,{
        status : status
      });
      getData();
   }
  return (
    <div>
       <div>
        <h4>Add Todo</h4>
        <input type="text" placeholder='title' value={title} onChange={(e)=> setTitle(e.target.value)}/>
        <input type="text" placeholder='desc' value={desc} onChange={(e)=> setDesc(e.target.value)} />
        <button onClick={handleClick}>Add</button>
       </div>

            <table>
                <thead>
                <tr>
                    <th>Title</th>
                    <th>desc</th>
                    <th>Status</th>
                    <th>delete</th>
                </tr>
                </thead>
                <tbody>
                
                {todo.map((el)=>(
                    // <div className='todos' key={el._id}>
                    <tr>
                    <td>{el.title}</td>
                    <td>{el.desc}</td>
                    <td ><h4 onClick={()=>{handleUpdate(el._id)}}>{el.status ? "Completed" : "Pending"}</h4></td>
                    <td><button onClick={()=>handleDelete(el._id)}>delete</button></td>
                    </tr>
                      ))}
                
                </tbody>
            </table>
        


    </div>
  )
}

export default Todos
