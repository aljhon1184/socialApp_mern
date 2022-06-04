import { createContext, useReducer } from "react";
import GetPostReducer from "./GetPostReducer";


const INITIAL_STATE = {
    posts: [],
    isFetching: false,
    error: false,
};

export const GetPostContext = createContext(INITIAL_STATE);

export const GetPostContextProvider = ({ children }) =>{
    const [state, dispatch] = useReducer(GetPostReducer, INITIAL_STATE);


    return(
        <GetPostContext.Provider
        value={{
            posts: state.posts,
            isFetching: state.isFetching,
            error: state.error,
            dispatch,
        }}
        >
            { children }
        </GetPostContext.Provider>
    );
};