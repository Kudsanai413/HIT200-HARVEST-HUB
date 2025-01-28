import { Alert } from "react-native"
import { ActionType, ChildrenType } from "./types"
import React, { createContext, useContext, useEffect, useReducer, useRef, useState } from "react"
import { base_url } from "@/assets/reusable/api"
import { useRouter } from "expo-router"
import useGetUserContext from "./UserContext"

const initReducerState =
{
    user_id : "",
    password: "",
    logging: false,
}

type LoginContextType =
{
    state: typeof initReducerState,
    dispatch: React.Dispatch<ActionType>,
}

const actions =
{
    typing: ["user-id", "password"],
    find: "find",
    login: "login",
    reset: "clear",
}

const LoginContextReducer = (state: typeof initReducerState, action: ActionType) : typeof initReducerState | any =>
{

    switch(action.type)
    {
        case actions.typing[0]:
            return { ...state, user_id: action.payload };

        case actions.typing[1]:
            return { ...state, password: action.payload };

        case actions.login:
            Authenticate()

        case actions.reset:
            return initReducerState;

        default:
            Alert.alert("Login Error System", "Thing Just Got Out Of Hand In The Login System");
            break;
    }

}

let Authenticate : () => void;

const LoginContext = createContext<LoginContextType>({
    state: initReducerState,
    dispatch: () => { },
})

export const LoginContextProvider = ( { children } : ChildrenType ) : React.JSX.Element =>
{
    const [state, dispatch] = useReducer(LoginContextReducer, initReducerState);
	const { dispatch: user_dispatch } = useGetUserContext();
    const navigator = useRouter();

        Authenticate = () =>
        {
            fetch(`${ base_url }/credentials?User_ID=${ state.user_id }&password=${ state.password }`)
                .then( response =>
                    {
                        if (!response.ok) throw new Error("Things Keep Getting Out Of Hand")
                        return response.json();

                    }).then( data =>
                        {
                            if ( data.length == 1) return data[0]
                            throw new Error("Failed To Find User")
                        }).then( user  =>
                            {
                                user_dispatch({ type: "type", payload: user.user_type});
                                user_dispatch({ type: "user", payload: user })
                                user_dispatch({ type: "id", payload: user.User_ID})

                                return user
                            }).then( user =>
                                {
                                    user.user_type === "farmer" ? navigator.push("/(farmer)/Home")
                                    : user.user_type === "buyers-contractor" ? navigator.push("/(buyer-contractor)/Home")
                                        : alert("Page Not Found")
                                }).catch( error => alert("Error Occurred: " + error))
        }

    return(
        <LoginContext.Provider
            value={{
                state: state,
                dispatch: dispatch,
            }}
        >
            { children }
        </LoginContext.Provider>

    );
}



export default function useGetLoginContext() : LoginContextType { return useContext(LoginContext) };
