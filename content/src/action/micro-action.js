import axios from "axios"
export const microsharedActionCounter = ({ movie }) => (dispatch, getState) => {
    const { collection } = getState().microfrontendState
    collection.push(movie)
    const movieSetUnique = new Set(collection);
    dispatch({
        type: "MICRO_SHARED_COUNTER",
        payload: [...movieSetUnique]
    })
}

export const micromovieFrontend = (listId = 1, page) => async dispatch => {
    const { data } = await axios.get(`https://api.themoviedb.org/4/list/${listId}`, {
        params: {
            "api_key": "b5a77a9b68e943dc0140d7598e45a7b2",
            page
        }
    })
    dispatch({
        type: "REQUEST_API_MOVIE",
        payload: data,
        request: micromovieFrontend
    })
}