import React, { useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const UserDetails = (props) => {
    
    const { id } = props.match.params

    const [user, setUser] = useState({})
    const [userPosts, setUserPosts] = useState([])


    useEffect(() => {
        axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
            .then((response) => {
                const result = response.data
                setUser(result)
            })
            .catch((err) => {
                alert(err.message)
            })
    }, [id])

    useEffect(() => {
        axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${id}`)
            .then((response) => {
                const result = response.data
                setUserPosts(result)
            })
            .catch((err) => {
                alert(err.message)
            })
    }, [id])

    return (
        <div>
            <h1>USER NAME:  { user.name } </h1>

            <h2>POSTS WRITTEN BY USER</h2>
            <ul>
                {userPosts.map((post) => {
                    return (
                        <li key={post.id}> <Link to={`/posts/${post.id}`}> {post.title} </Link> </li>
                    )
                })}
            </ul>

            <Link to="/users"> back </Link>
        </div>
    )
}

export default UserDetails