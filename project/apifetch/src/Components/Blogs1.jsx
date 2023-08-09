import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import axios from 'axios'

const Blogs = () => {    

    const [posts,setState] = useState([])    

    const [dtext, setText] = useState([])

    useEffect(() => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch("https://jsonplaceholder.typicode.com/posts", requestOptions)
            .then(response => response.json())
            .then(result => setText(result))
            .catch(error => console.log('error', error));

    }, [])

    const deleteRow = (id, e) => {  
        return(
        axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`)  
          .then(res => {  
            console.log(res);   
        
            const posts = posts.filter(item => item.id !== id);  
            setState({ posts });  
          }) 
        )} 

    return (
        <div>
            <div className="blogs">
                {
                    dtext.map((result) => {
                        return (
                            <div className="mydiv">
                                <div className="flexdisplay">
                                    <h1>{result.title}</h1>
                                    <div className="btn">
                                        <a href='' id='delete' onClick={deleteRow}>Delete</a>
                                        <a href='' id='edit' >Edit</a>
                                    </div>
                                </div>
                                <h3>Author : {result.body}</h3>
                                <p>points: {result.userID}</p>
                                <NavLink to='/advance'>REad more </NavLink>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Blogs
