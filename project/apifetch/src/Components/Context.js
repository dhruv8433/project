import React, { useContext, useReducer, useEffect } from "react";
import reducer from "./reducer";

let API = 'https://hn.algolia.com/api/v1/search?'
const initialState = {
    isLoading: "true",
    query: "CSS",
    nbPage: 0,
    page: 0,
    hits: []
}


const AppContext = React.createContext()

const AppProvider = ({children}) => {

    const [state, dispatch] = useReducer(reducer,initialState);

    
    const fetchApiData = async (url) => {
        dispatch({type: "SET_LOADAING"})

        try {
            const res = await fetch(API)
            const data = await res.json()
            console.log(data)
            dispatch({
                type: "GET_BLOGS",
                payload: {
                    hits: data.hits,
                    nbPages: data.nbPages
                }
            })

        } catch (error) {
            console.log(error)

        }
    }

    const removeblog = (blog_ID) => {
        dispatch({type:"REMOVE_BLOG" , payload: blog_ID})
    }

    const updateblog = (upd_id) => {
        dispatch({type:"UPDATE_BLOG", payload: upd_id})
    }

    const searchBlog = (searchQuery) => {
        dispatch({type: "SEARCH_QUERY", payload: searchQuery,})
    }

    const getNextPage = () =>{
        dispatch({
            type: "NEXT_PAGE"
        })
    }

    const getPrevPage = () =>{
        dispatch({
            type: "PREV_PAGE"
        })
    }

    useEffect(()=>{
        fetchApiData(`${API}query=${state.query}&page=${state.page}`)
    },[state.query,state.page])


    return (
        <AppContext.Provider value={{...state, removeblog, searchBlog, getNextPage, getPrevPage, updateblog}}>
            {children}
        </AppContext.Provider>
    )
}

//custom hook
const useGlobleContext = () => {
    return useContext(AppContext);
}

export {AppContext,AppProvider,useGlobleContext};