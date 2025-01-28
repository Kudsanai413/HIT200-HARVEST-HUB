import { Alert } from "react-native";
import { ActionType, ChildrenType, UserType } from "./types";
import React, { createContext, useContext, useEffect, useReducer, useRef, useState } from "react";
import { base_url } from "@/assets/reusable/api";
import useGetLoginContext from "./LoginContext";
import { useRouter } from "expo-router";
import useGetProduceContext from "./ProductContext";


const initUserState : UserType =
{
    userID: "",
    Name: "",
    date_birth: "",
    contact: "",
    location: "",
    main_crop: "",
    Additional_crops: null
};


const initReducerState =
{
    // For Updating Text-Fields When Typing
    user_id: "",
    name: "",
    date_of_birth: "",
    contact: "",
    base_location: "",
    prefered_crop: "",
    additional_crops: "",
    type: "unset",

    // Actual Current User
    user: initUserState
};


const actions =
{
    typing: ["id", "name", "date", "contact", "base", "p-crop", "a-crops"],
    reset: "reset",
    login: "login",
    user: "user"
};


const useContextReducer = (state : typeof initReducerState, action : ActionType) : typeof initReducerState | any =>
{
    switch( action.type )
    {
        case actions.typing[0]:
            return { ...state, user_id: action.payload };

        case actions.typing[1]:
            return { ...state, name: action.payload };

        case actions.typing[2]:
            return { ...state, date_of_birth: action.payload };

        case actions.typing[3]:
            return { ...state, contact: action.payload };

        case actions.typing[4]:
            return { ...state, base_location: action.payload };

        case actions.typing[5]:
            return { ...state, prefered_crop: action.payload };

        case actions.typing[6]:
            return { ...state, additional_crop: action.payload };

        case "type":
            return { ...state, type: action.payload };

        case actions.reset:
            return initReducerState;

        case "location":
            return { ...state, base_location: action.payload}

        case actions.login:
            fetchData();

        case actions.user:
            return { ...state, user: action.payload }

        default:
            Alert.alert("Update Error", "An Error Occurred");
            break;
    }
}


type UserContextType =
{
    state: typeof initReducerState,
    dispatch: React.Dispatch<ActionType>,
}


const UserContext = createContext<UserContextType>({
    state: initReducerState,
    dispatch: () => {}
});

let fetchData : () => void;

export function UserContextProvider({ children } : ChildrenType ) : React.JSX.Element
{
    const [ state, dispatch ] = useReducer(useContextReducer, initReducerState);
    const { dispatch: prod_dispatch} = useGetProduceContext();

    fetchData = () =>
    {
        try
        {
            fetch(`${ base_url }/${ state.type }s?userID=${ state.user_id }`)
                .then(response =>
                    {
                        if (!response.ok) throw new Error("Things Just Got Out Of Hand 1");

                        return response.json();

                    }).then(data =>
                        {

                            if (data.length !== 1) throw new Error("Things Just Got Out Of Hand 2");

                            return data[0];

                        }).then((user : UserType) =>
                            {
                                dispatch({ type: actions.user, payload: user});

                            }).catch(error =>
                                {
                                    alert("User Context Error: \n" + error);
                                    // fetch all the produce from database
                                }).finally( () => (prod_dispatch({ type: "getAll" })))

        }

        catch (exc : any)
        {
            alert(exc.message)
        }
    }

    useEffect(() => {

        if (state.type !== "unset" ) dispatch({ type: actions.login })

    }, [state.type])


    return(

        <UserContext.Provider
            value={{
                state: state,
                dispatch: dispatch
            }}
        >
            { children}
        </UserContext.Provider>
    )
}


// Application UserContext
export default function useGetUserContext() : UserContextType { return useContext(UserContext) };