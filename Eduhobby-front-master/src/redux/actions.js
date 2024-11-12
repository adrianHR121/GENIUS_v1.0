// actions.js

export const SET_RESPONSE_TYPE = 'SET_RESPONSE_TYPE';

export const setResponseType = (type) => ({
    type: SET_RESPONSE_TYPE,
    payload: type,
});
