import React, { useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Users = (props) => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/users')
            .then((response) => {
                const result = response.data
                setUsers(result)
            })
            .catch((err) => {
                alert(err.message)
            })
    }, [])

    return (
        <div>
            <h1>USERS LIST : { users.length } </h1>
            <ul>
                {users.map((user) => {
                    return <li key={user.id}> <Link to={`/users/${user.id}`}>  { user.name } </Link> </li>
                })}
            </ul>
        </div>
    )
}

export default Users