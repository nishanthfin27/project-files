import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const PostDetails = (props) => {

    const { id } = props.match.params

    const [postData, setPostdata] = useState({})
    const [comments, setComments] = useState([])
    const [userName, setUserName] = useState('')

    useEffect(() => {

        axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
            .then((response) => {
                const result = response.data
                setPostdata(result)
            })
            .catch((err) => {
                alert(err.message)
            })

            axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${id}`)
            .then((response) => {
                const result = response.data
                setComments(result)
            })
            .catch((err) => {
                alert(err.message)
            })

    }, [id])

    useEffect(() => {

        if(postData.userId) {
            
            axios.get(`https://jsonplaceholder.typicode.com/users/${postData.userId}`)
            .then((response) => {
                const result = response.data.name
                setUserName(result)
            })
            .catch((err) => {
                alert(err.message)
            })
        }

    }, [postData.userId])

    return (
        <div>
            <h1>USER NAME: { userName } </h1>
            <h2>TITLE : { postData.title } </h2>
            <h1>BODY: </h1>
            <h2> {postData.body} </h2>
            <hr /> 
            <h1>COMMENTS</h1>
            <ul>
                {comments.map((comment) => {
                    return (
                    <li key={comment.id}> {comment.body} </li>
                    )
                })}
            </ul>
            <hr />

            <Link to={`/users/${postData.userId}`}>
                More posts of author:{userName}
            </Link>
        </div>
    )
}

export default PostDetails