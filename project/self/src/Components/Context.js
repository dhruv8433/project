import React, { useContext, useEffect, useReducer } from 'react'
import reducer from './Reducer'

let API = "https://jsonplaceholder.typicode.com/posts"

const intialstage = {
  data: []
}

const AppContext = React.createContext()

const AppProvider = ({ children }) => {

  const [state, dispatch] = useReducer(reducer, intialstage)

  const fetchApi = async (url) => {

    try {
      const res = await fetch(API)
      const data = await res.json()
      console.log(data)
      dispatch({type:"GET_BLOGS",
                payload:{
                  data: data
                }})
                
    } catch (error) {
      console.log("MyError" + error)
    }
  } 

  useEffect(() => {
    fetchApi(`${API}`)
  }, [])


 const removeblog = (blog_id) => {
  dispatch({type:"REMOVE_BLOG",
            payload: blog_id})
 }

  return (
    <AppContext.Provider value={{...state, removeblog}}>
      {children}
    </AppContext.Provider>
  )


}
//custom hook
const useMyhook = () => {
  return useContext(AppContext)
}

export { useMyhook, AppContext, AppProvider }