import React, { useEffect, useState } from 'react'
import Todo from './Todo'
import { Link } from 'react-router-dom'

const Home = () => {
    const [selectedtype, setSelectedType] = useState("")
    const [isCompleted,setIsCompleted] = useState(false)
    let todosData = JSON.parse(localStorage.getItem('todoData'))
    const [todos, setTodos] = useState(todosData)
    const handleTypeClick = (typeOfData) => {
        setTodos(typeOfData.length > 0 ? todosData?.filter((td) => td.status === typeOfData) : todosData)
        setSelectedType(typeOfData)
    }

    const handlePriorityClick = (priority = "High") => {
        setTodos(todosData?.filter((td) => td.priority === priority))
    }

    const handleEndDateClick = (typeOfSort = "Asc") => {
        setTodos(todosData?.sort((a,b) => typeOfSort === "Asc" ? new Date(a.endDate) - new Date(b.endDate) : new Date(b.endDate) - new Date(a.endDate)))
    }
    useEffect(() => {
        if(isCompleted){
            setTodos(JSON.parse(localStorage.getItem('todoData')))
        }
        return() => {
            setIsCompleted(false)
        }
    },[isCompleted])

    return (
        <div>
            <div className='d-flex bg-light flex-row justify-content-between align-items-center w-75 mx-auto mt-4 border py-2 px-1 rounded'>
                <div className='d-flex flex-row justify-content-start align-items-center w-75'>
                <button onClick={() => handleTypeClick("")} className={`px-3 btn btn-sm ${!selectedtype && 'bg-info text-white' }`}>All</button>
                    <button onClick={() => handleTypeClick("To Do")} className={`px-3 btn btn-sm ${selectedtype === "To Do" && 'bg-info text-white' }`}>To Do</button>
                    <button onClick={() => handleTypeClick("Doing")} className={`px-3 btn btn-sm ${selectedtype === "Doing" && 'bg-info text-white' }`}>Doing</button>
                    <button onClick={() => handleTypeClick("Done")} className={`px-3 btn btn-sm ${selectedtype === "Done" && 'bg-info text-white' }`}>Completed</button>
                </div>
                <div className='d-flex flex-row justify-content-end align-items-center'>

                    <Link to={"/add"} className='btn btn-sm text-primary'>+ Add Todo</Link>
                </div>
            </div>
            <div className='d-flex flex-row py-4 container'>
                <div className='w-25 d-flex flex-row justify-content-start align-items-center'>
                    <label className='mx-2 text-secondary'>Priority</label>
                    <select onChange={(e) => handlePriorityClick(e.target.value)} role='button' className="p-1 border-secondary text-secondary cursor-pointer" id="exampleFormControlSelect1">
                        <option value={"High"}>High</option>
                        <option value={"Medium"}>Medium</option>
                        <option value={"Low"}>Low</option>
                    </select>
                </div>
                <div className='w-25 d-flex flex-row justify-content-start align-items-center'>
                    <label className='mx-2 text-secondary'>End Date</label>
                    <select onChange={(e) => handleEndDateClick(e.target.value)} role='button' className="p-1 border-secondary text-secondary cursor-pointer" id="exampleFormControlSelect1">
                        <option value={"Asc"}>Asc</option>
                        <option value={"Desc"}>Desc</option>
                    </select>
                </div>
            </div>
            <Todo setIsCompleted={(status) => setIsCompleted(status)} todos={todos} />
        </div>
    )
}

export default Home
