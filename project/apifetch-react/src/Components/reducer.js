const reducer = (state, action) => {

    switch (action.type) {
        case "SET_LOADAING":
            return {
                ...state,
                isLoading: true
            }
        case "GET_BLOGS":
            return {
                ...state,
                hits: action.payload.hits,
                nbPages: action.payload.nbPages,
                isLoading: false
            }
        case "REMOVE_BLOG":
            return {
                ...state,
                hits: state.hits.filter(
                    (curBlog) => curBlog.objectID != action.payload
                ),
            }
        case "SEARCH_QUERY":
            return {
                ...state,
                query: action.payload
            }
        case "NEXT_PAGE":
            let pageNumInc = state.page + 1;
            if(pageNumInc >= state.nbPages){
                pageNumInc = 0
            }
            return {
                ...state,
                page: state.page + 1
            }

        case "PREV_PAGE":
            let pageNum = state.page
            if(pageNum <= 0){
                pageNum = 0;
            }
            else{
                pageNum = pageNum-1
            }
        return {
                ...state,
                page: pageNum
            }

        case "UPDATE_BLOG":
            return{
                ...state,
                
            }

    }

    return state;
}

export default reducer