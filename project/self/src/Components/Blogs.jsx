import React, { useEffect } from 'react'
import { useMyhook } from './Context'
// import { AppContext,AppProvider } from './Context'

const Blogs = () => {

    const myvar = useMyhook()
    const {data,removeblog} = useMyhook()
    return (
    <div>
        {
            data.map((result) => {
                const {id, title, body} = result
                return(
                    <div className="div" key={id}>
                        <h5>id : {id}</h5>
                        <h2>{title}</h2>
                        <p>{body}</p>
                        <a href="" onClick={()=> removeblog(id)}>Remove</a>
                    </div>
                )
            })
        }
    </div>
  )
}

export default Blogs