import React from 'react'
import { Link } from 'react-router-dom';

const Todo = ({ todos, setIsCompleted }) => {
    const handleMarkAsComplete = (id, index) => {
        const allData = JSON.parse(localStorage.getItem("todoData"))
        const existingData = allData.find((d) => d.id == String(id))
        existingData.status = "Done"
        allData.splice(index, 1, existingData);
        localStorage.setItem('todoData', JSON.stringify(allData))
        setIsCompleted(true)
    }

    return (
        <div className='text-center container'>
            {!todos || !todos?.length ? <h4 className='mt-4 text-danger'>No data found !</h4> : <>
                <div style={{ "maxHeight": 300, overflowY: "scroll" }}>
                    <table className="table border">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">Id</th>
                                <th scope="col">Title</th>
                                <th scope="col">Description</th>
                                <th scope="col">End Date</th>
                                <th scope="col">Priority</th>
                                <th scope="col">Status</th>
                                <th scope="col"></th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody className=''>
                            {todos?.map((t, i) => (<tr key={t.id}>
                                <td>{t.id}</td>
                                <td>{t.title}</td>
                                <td className='text-truncate'>{t.description}</td>
                                <td>{t.endDate}</td>
                                <td>{t.priority}</td>
                                <td>{t.status}</td>
                                <td>
                                    <Link to={`/add?id=${t.id}`} className='btn btn-sm border-danger text-danger px-4'>Edit</Link>
                                </td>
                                <td>
                                    <button disabled={t.status === "Done"} onClick={() => handleMarkAsComplete(t.id, i)} className={`${t.status === "Done" ? 'btn btn-sm bg-success text-white' : 'btn btn-sm border-success text-success'}`}>
                                        {t.status === "Done" ? 'Completed' : 'Complete'}
                                    </button>
                                </td>
                            </tr>))}
                        </tbody>
                    </table>
                </div>
            </>}
        </div>
    )
}

export default Todo
