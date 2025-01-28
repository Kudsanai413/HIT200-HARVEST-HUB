const base_url : string = "http://localhost:3400";

const Request = (url : string, method_objects? : any) : Promise<string | any> =>
{
   const data = fetch(url, method_objects)
                    .then( response =>
                        {
                            if (!response.ok) throw new Error(`Failed To Fetch From ${ url }`);
                            return response.json();
                        }).catch( error => { return error.message });

    return data
};

const createObject = (method: string, contents: any) : any =>
{
    return {
        method: method,
        headers: { "Content-Type" : "application/json" },
        body: JSON.stringify(contents)
    };
}


export { base_url, createObject, Request };