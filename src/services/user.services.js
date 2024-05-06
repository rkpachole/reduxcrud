import { APIURL } from "../constants/config";

export const userService = {
    addUser,
    getUsersList,
    getById,
    update,
    deleteUser,
    searchUserName
};



function getUsersList() {
    const requestOptions = {
        method: "GET",
        
    };

    return fetch(APIURL+"posts", requestOptions).then(handleResponse)
        .then(usersList => {
            return usersList;
        });
}

function getById(id) {
    const requestOptions = {
        method: "GET",
    };
  return fetch(APIURL+`posts/${id}`, requestOptions).then(handleResponse);
}

function addUser(userInfo) {
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userInfo)
    };
 return fetch(APIURL+"posts", requestOptions).then(handleResponse);
}

function update(id) {
    const requestOptions = {
        method:"PUT",
        headers: {"Content-Type": "application/json" },
        body: JSON.stringify(id),
        
    };

    return fetch(APIURL+`posts/${id.id}`, requestOptions).then(handleResponse);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function deleteUser(id) {
    const requestOptions = {
        method: "DELETE",
    };

    return fetch(APIURL+`posts/${id}`, requestOptions).then(handleResponse);
}

function searchUserName(se) {
 return fetch(`http://localhost:3000/posts/?firstName_like=${se.trim()}`)
    .then(handleResponse)
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        //const data = text;
        if (!response.ok) {
            if (response.status === 400) {
                // auto logout if 401 response returned from api
                // logout();
                // location.reload(true);
                const error = (data && data.data.errors) || response.statusText;
                return Promise.reject(error);
            }

            // const error = (data && data.message) || response.statusText;
            // return Promise.reject(error);
        }

        return data;
    });
}