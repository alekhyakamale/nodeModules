import Axios from 'axios';

export const getSuggestions = () => {
    return Axios({
        method: "GET",
        url: "Result.json"
    })
}

export const getResults = () => {
    return Axios({
        method: "GET",
        url: "Elastic POC Search Response.json"
        // data: 
    })
}

 