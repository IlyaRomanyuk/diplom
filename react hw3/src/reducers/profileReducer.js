import { AUTH_PERSON, EXIT_TOKEN } from "../actions/personAC";

const initialState = { person: {}, isAuthorized: false };

export const profileReducer = (state = initialState, action) => {
    switch (action.type) {

        case AUTH_PERSON:
            return {
                ...state,
                person: action.data,
                isAuthorized: action.data.token
            }

        case EXIT_TOKEN:
            return {
                ...state,
                isAuthorized: false
            }

        default: return state
    }
}