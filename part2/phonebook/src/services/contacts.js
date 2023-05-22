import axios from "axios";

const baseUrl = '/api/persons';

function getAll () {
    return(
        axios
            .get(baseUrl)
            .then(res => res.data)
    )
}

function create (obj) {
    return(
        axios
            .post(baseUrl, obj)
            .then(res => res.data)
    )
}

function update (id, obj) {
    const resourceUrl = `${baseUrl}/${id}`;

    return(
        axios
            .put(resourceUrl, obj)
            .then(res => res.data)
    )
}

function remove (id) {
    const resourceUrl = `${baseUrl}/${id}`;
    return (axios.delete(resourceUrl))
}

const services = {getAll, create, update, remove}

export default services;
