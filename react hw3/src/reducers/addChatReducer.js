import {
    ADD_NEW_CHAT, ADD_NEW_MESSAGE, IS_FETCHING, CHAT_FIRE, CHAT_UNFIRE, DELETE_CHAT,
    CLEAN_ALL_MESSAGES, DELETE_MESSAGE, CHATS_LOAD_REQUEST, CHATS_LOAD_SUCCESS, CHATS_LOAD_FAILURE
} from "../actions/addChatAC";

const initialState = {
    data: [],
    isFetching: false,
    loadingData: false,
    error: false,
};

export const addChatReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHATS_LOAD_REQUEST:
            return {
                ...state,
                loadingData: true,
                error: false,
            };

        case CHATS_LOAD_SUCCESS:
            return {
                ...state,
                loadingData: false,
                data: action.payload
            };

        case CHATS_LOAD_FAILURE:
            return {
                ...state,
                loadingData: false,
                error: true,
            };

        case IS_FETCHING:
            return {
                ...state,
                isFetching: action.bool
            }

        case ADD_NEW_CHAT:
            return {
                ...state,
                data: { ...state.data, [action.chat._id]: { ...action.chat } }
            }

        case DELETE_CHAT:
            let data = {};
            Object.values(state.data).filter(item => item._id != action.chatId).map(item => {
                data = { ...data, [item._id]: { ...item } }
            })
            return {
                ...state,
                data: data
            }

        case DELETE_MESSAGE:
            let chat = state.data[action.chatId]
            let newMessages = chat.messages.filter(el => el._id.toString() != action.messageId);
            return {
                ...state,
                data: {
                    ...state.data,
                    [action.chatId]: {
                        ...state.data[action.chatId],
                        messages: [...newMessages]
                    }
                }
            }

        case CLEAN_ALL_MESSAGES:
            return {
                ...state,
                data: {
                    ...state.data,
                    [action.chatId]: {
                        ...state.data[action.chatId],
                        messages: []
                    }
                }
            }

        case ADD_NEW_MESSAGE:
            return {
                ...state,
                data: {
                    ...state.data,
                    [action.payload.chatId]: {
                        ...state.data[action.payload.chatId],
                        messages: [
                            ...state.data[action.payload.chatId].messages,
                            { _id: action.payload._id, message: action.payload.message, author: action.payload.author, image: action.payload.image },
                        ],
                    }
                }
            };

        default: return state
    }
}