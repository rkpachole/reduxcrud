import { userConstants } from "../constants";
import { userService } from "../services";

export const userActions = {
    addUser,
    getUsersList,
    getById,
    updateUser,
    delete: _delete,
    searchUserName,
    
};
function addUser(userInfo) {
    return dispatch => {
        dispatch(request());
        userService.addUser(userInfo)
            .then(
                userInfo => dispatch(success(userInfo)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: userConstants.USERADD_REQUEST }; }
    function success(userInfo) { return { type: userConstants.USERADD_SUCCESS, userInfo }; }
    function failure(error) { return { type: userConstants.USERADD_FAILURE, error }; }
}
function getUsersList() {
    return dispatch => {
        dispatch(request());
        userService.getUsersList()
            .then(
                usersList => dispatch(success(usersList)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: userConstants.GETALLUSERS_REQUEST }; }
    function success(usersList) { return { type: userConstants.GETALLUSERS_SUCCESS, usersList }; }
    function failure(error) { return { type: userConstants.GETALLUSERS_FAILURE, error }; }
}

function getById(id) {
    return dispatch => {
        dispatch(request(id));
        userService.getById(id)
            .then(
                userInfo => dispatch(success(userInfo)),
                error => dispatch(failure(error))
            );
    };

    function request(id) { return { type: userConstants.USEREDIT_REQUEST, id }; }
    function success(user) { return { type: userConstants.USEREDIT_SUCCESS, user }; }
    function failure(error) { return { type: userConstants.USEREDIT_FAILURE, error }; }
}

function updateUser(id,userInfo) {
    return dispatch => {
        dispatch(request(id,userInfo));

        userService.update(id,userInfo)
            .then(
                userInfo => dispatch(success(id,userInfo)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: userConstants.USERUPDATE_REQUEST }; }
    function success(userInfo) { return { type: userConstants.USERUPDATE_SUCCESS, userInfo }; }
    function failure(error) { return { type: userConstants.USERUPDATE_FAILURE, error }; }
}


function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        userService.deleteUser(id)
            .then(
                user => { 
                    dispatch(success(user));
                },
                error => {
                    dispatch(failure(error));
                }
            );
    };

    function request(id) { return { type: userConstants.DELETE_REQUEST, id }; }
    function success(id, user) { return { type: userConstants.DELETE_SUCCESS, id, user }; }
    function failure(id, error) { return { type: userConstants.DELETE_FAILURE, id, error }; }
}
function searchUserName(se) {
    return dispatch => {
        dispatch(request(se));
        userService.searchUserName(se)
            .then(
                usersList => dispatch(success(usersList)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: userConstants.USERSEARCH_REQUEST }; }
    function success(usersList) { return { type: userConstants.USERSEARCH_SUCCESS, usersList }; }
    function failure(error) { return { type: userConstants.USERSEARCH_FAILURE, error }; }
}

