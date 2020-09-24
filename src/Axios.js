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
    })
}

export const postSearchRequest = (searchQuery) => {
    return Axios({
        method: "POST",
        url: "",
        data: searchQuery
    })
}
 