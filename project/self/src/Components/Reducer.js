const reducer = (state,action) => {
    switch (action.type) {
        case "GET_BLOGS":
            return{
                ...state,
                data: action.payload.data
            }
        case "REMOVE_BLOG":
            return{
                ...state,
                data: state.data.filter(
                    (result) => result.id != action.payload
                )
            }
    }
}

export default reducer