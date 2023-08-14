import React from 'react'
import { useGlobleContext } from './Context'

const Search = () => {
    const {query, searchBlog} = useGlobleContext()
    return (
    <div>
        <h1>Blogs Website</h1>
        <form onSubmit={(e) => e.preventDefault()}>
            <div>
                <input type="text" placeholder='Search Here'  value={query} onChange={(e) => {
                    searchBlog(e.target.value)
                }}/>

            </div>
        </form>
    </div>
  )
}

export default Search