import React, { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

const AddTodo = () => {

    const navigate = useNavigate()
    const [seachParams] = useSearchParams()
    const id = seachParams.get("id")
    const allData = JSON.parse(localStorage.getItem("todoData"))
    const availableData = allData?.find((a) => a.id == String(id))

    const [formData, setFormData] = useState({
        id: availableData?.id || 0,
        title: availableData?.title || '',
        description: availableData?.description || '',
        endDate: availableData?.endDate || '',
        priority: availableData?.priority || 'High',
        status: availableData?.status || 'To Do'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        allData.push({...formData,id:allData.length + 1});
        localStorage.setItem('todoData', JSON.stringify(allData))
        setFormData({
            title: '',
            description: '',
            endDate: '',
            priority: '',
            status: ''
        });
        navigate("/")
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        console.log(formData);
        const index = allData.findIndex((d) => d.id == String(id))
        allData.splice(index, 1, formData);
        localStorage.setItem('todoData', JSON.stringify(allData))
        setFormData({
            title: '',
            description: '',
            endDate: '',
            priority: '',
            status: ''
        });
        navigate("/")
    };

    return (
        <form onSubmit={availableData ?  handleUpdate : handleSubmit} className='container w-25 p-4'>
            <div className="form-group mb-2">
                <label>Title</label>
                <input required value={formData.title} onChange={handleChange} type="text" className="form-control" name='title' placeholder="Enter Title" />
            </div>
            <div className="form-group mb-2">
                <label>Description</label>
                <input required value={formData.description} onChange={handleChange} type="text" className="form-control" name='description' placeholder="Enter description" />
            </div>
            <div className="form-group mb-2">
                <label>End Date</label>
                <input required  value={formData.endDate} onChange={handleChange} type="date" className="form-control" name='endDate' placeholder="Enter Date" />
            </div>
            <div className="form-group mb-2">
                <label >Priority</label>
                <select required style={{cursor:"pointer"}} value={formData.priority} onChange={handleChange} className="form-control" name='priority' >
                    <option value={"High"} >High</option>
                    <option value={"Medium"}>Medium</option>
                    <option value={"Low"}>Low</option>
                </select>
            </div>
            <div className="form-group mb-2">
                <label >Status</label>
                <select required style={{cursor:"pointer"}} value={formData.status} onChange={handleChange} name='status' className="form-control" >
                    <option value={"To Do"}>To Do</option>
                    <option value={"Doing"}>Doing</option>
                    <option value={"Done"}>Done</option>
                </select>
            </div>
            <button type='submit' className='btn btn-md mt-2 bg-info form-control'>
                {availableData ? 'Update' :'Add'}
            </button>
        </form>
    )
}

export default AddTodo

