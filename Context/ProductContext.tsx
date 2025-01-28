import React, { createContext, useContext, useReducer } from "react";
import { ActionType, ChildrenType, ProduceType } from "./types";
import { base_url } from "@/assets/reusable/api";

const initcrop : ProduceType = {
    produceID: "",
    farmerID: "",
    produceType: "",
    quantity: 0,
    price: 0,
    unit_type: ""
}
const initReducerState  =
{
    produces: [
    ],
    farmer_produce: [],
    search_results: [],
    currFarmer: {

    }

}

const actions = {
    getAllProduce : "getAll",
    getIndividualFarmerProduce :  "get1",
    deleteFarmerProduce: "delete",
    editFarmerProduce: "edit",
    searchProuce: "search",
}

const ProductContextReducer = (state : typeof initReducerState, action : ActionType ) : typeof initReducerState | any =>
{
    switch(action.type)
    {
        case actions.getAllProduce:
            return { ...state, produces: action.payload }
            ;

        case actions.getIndividualFarmerProduce:
            return state;

        case actions.searchProuce:
            return { ...state, search_results: action.payload };

        default:
            throw new Error("Action Out Of Scope")
    }

}

type ProductContextType =
{
    state: typeof initReducerState,
    dispatch: React.Dispatch<ActionType>,
    search: (text : string) => void,
}

const ProductContext = createContext<ProductContextType>({
    state: initReducerState,
    dispatch: () => { },
    search: () => {},
});

export const ProductContextProvider = ({ children } : ChildrenType) : React.JSX.Element =>
{
    const [state, dispatch] = useReducer(ProductContextReducer, initReducerState);






    (() =>
    {
        try
        {
            fetch(`${ base_url }/produce`)
                .then(response =>
                    {
                        if (!response.ok) throw new Error("An Error Occured While Fetching Produce");
                        return response.json();
                    }).then((produce : ProduceType[]) =>
                        {
                            dispatch({ type: "getAll" , payload: produce });
                        }).catch(error => console.log(error.message));

        }

        catch(exc : any)
        {
            alert(exc.message);
        }
    })()


    const search = ( text : string) : void =>
    {
        const produces : ProduceType[] = state.produces
        const searchResults = produces.filter((produce : ProduceType ) => produce.produceType.toLowerCase().includes(text.toLowerCase()))
        dispatch({ type: "search", payload: searchResults })
    }


    return(
        <ProductContext.Provider
            value={{
                state: state,
                dispatch: dispatch,
                search: search
            }}
        >
            { children }
        </ProductContext.Provider>
    )
}

export default function useGetProduceContext() : ProductContextType { return useContext(ProductContext) }