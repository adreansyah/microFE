const initialState = {
    data: [],
    counter: 0,
    page: 1,
    collection: [],
    callback: null,
    genres: []
}

export const microfrontendState = (state = initialState, action) => {
    switch (action.type) {
        case "MICRO_SHARED_COUNTER":
            return {
                ...state,
                collection: action.payload,
            }
        case "MICRO_SHARED_GENRES":
            return {
                ...state,
                genres: action.payload.genres,
            }
        case "REQUEST_API_MOVIE":
            return {
                ...state,
                data: action.payload.results,
                page: action.payload.total_pages,
                callback: action.request
            }
        default:
            return {
                ...state
            }
    }
}