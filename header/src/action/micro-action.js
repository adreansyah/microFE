export const microSearchAction = ({ query }) => (dispatch, getState) => {
    const { data, callback } = getState().microfrontendState
    const x = data.filter(item => item.original_title === query)
    console.log(x, data);
    if (query === "" || data.length === 0) {
        dispatch(callback())
    }
    else {
        dispatch({
            type: "REQUEST_API_MOVIE",
            payload: {
                results: data.filter(item => item.original_title === query),
                total_pages: 0
            },
            request: callback
        })
    }
}