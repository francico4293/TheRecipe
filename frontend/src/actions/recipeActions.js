/**
 * Dispatches a user defined request action and makes an HTTP GET request to a user defined URL.
 * @param {string} url - The target url used to send the HTTP GET request to.
 * @param {object} dispatchTypes - An object containing a request action, a success action, and a failure actions,
 *      each of which is an individual attribute in the object.
 * @param {function} request - A function used to make the HTTP GET request.
 * @returns - null.
 */
export const recipeActions = (url, dispatchTypes, request) => {
    return async function(dispatch) {
        try {
            dispatch({ type: dispatchTypes.request });
            await request(url, dispatch);
        } catch (err) {
            dispatch({ type: dispatchTypes.failure });
        }
    }
}
