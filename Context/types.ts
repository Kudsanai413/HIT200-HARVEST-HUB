type ActionType =
{
    type: string,
    payload? : string | number | any,
};

interface AlertProps
{
    icon?: string,
    type: string,
    message: string,
    buttons: button[]
};

interface button
{
    text: string,
    onClick: () => void,
};


type ChildrenType =
{
    children : React.JSX.Element,
};

type ContractType =
{
    contractID: string,
    farmerID: string,
    buyerID: string,
    agreement: string,
    status: boolean,
    startDate: string,
    finishDate: string,
};


type ProduceType =
{
    produceID: string,
    farmerID: string,
    produceType: string,
    quantity: number,
    price: number,
    unit_type: string, // Unit of measurement for price eg. $7/kg
};


type UserType =
{
    userID: string, // User's National ID Number
    Name: string,
    date_birth: string,
    contact: string | number
    location: string,
    main_crop: string,
    Additional_crops: string[] | null,
};









































export { ActionType, AlertProps, button, ChildrenType, ContractType, ProduceType, UserType,  };