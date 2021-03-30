import * as axios from 'axios';
import { push } from 'connected-react-router';
import { chatsLoadTC } from './addChatAC';

//Constants
export const AUTH_PERSON = 'AUTH_PERSON';
export const EXIT_TOKEN = 'EXIT_TOKEN';

//AC
export const authPersonAction = (data) => ({ type: AUTH_PERSON, data })
export const exitTokenAction = () => ({ type: EXIT_TOKEN })

//TC
export const authPersonTC = (data) => async (dispatch) => {
    const response = await axios.post(`http://localhost:3030/auth`, { ...data });
    if (response.data) {
        dispatch(authPersonAction({ ...response.data }));
        dispatch(chatsLoadTC(response.data.token))
        dispatch(push('/'))
    }
}

export const exitTokenTC = () => async (dispatch) => {
    dispatch(exitTokenAction())
    dispatch(push('/'))
}