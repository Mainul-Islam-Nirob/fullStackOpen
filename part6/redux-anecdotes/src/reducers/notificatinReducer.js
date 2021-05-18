const initialState = ""

const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_MESSAGE":
            clearTimeout(state.delay)
            return action.data
        case "REMOVE_MESSAGE":
            return initialState
        default:
            return state
    }
}

export const setNotificationMessage = (message, delay) => {
    return async (dispatch) => {
        dispatch({
            type: "SET_MESSAGE",
            data: {
                 message, 
                 delay: setTimeout(() => {
                     dispatch(clearNotification(""))
                 }, delay * 1000),
                },
        })
        
    }
}

 export const clearNotification = () => {
    return {
        type: "REMOVE_MESSAGE",
    }
}

export default notificationReducer