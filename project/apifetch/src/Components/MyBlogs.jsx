import React, { useEffect } from 'react'
import { useGlobleContext } from './Context';

const MyBlogs = () => {
 const {hits,nbPages,isLoading, removeblog, updateblog} = useGlobleContext();

 if(isLoading){
    return(
        <>
            <h1>Loading...</h1>
        </>
    )
 }

 return (
    <div className='stories-div'>
        {
            hits.map((curBlog) => {

            const {title, author, url,objectID ,num_comments} = curBlog
            return (
                <>
                    <div className="card" key={objectID} >
                        <h2>{title}</h2>
                        <p> By <span> {author} </span>| <span> {num_comments } Comments </span></p>
                        <div className="card-btn">
                            <a href={url} id='readmore' target='_blank'>Read more</a>
                            <a href="#" id='remove' onClick={() => removeblog(objectID)}>Remove</a>
                            <a href="#" id='edit' onClick={() => updateblog(objectID)}>Edit</a>
                        </div>
                    </div>
                </>
                )
            })
        }
    </div>
  )
}

export default MyBlogs