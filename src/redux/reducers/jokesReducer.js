const initialState = {
    jokes: []
}

const UPDATE_JOKES = 'UPDATE_JOKES';

export function updateJokes(jokeObjArr) {
    return {
        type: UPDATE_JOKES,
        payload: jokeObjArr
    }
}

export default function reducer(state = initialState, action) {
    switch(action.type) {
        case UPDATE_JOKES:
            return {
                ...state,
                jokes: action.payload
            }
        default: return state;
    }
}