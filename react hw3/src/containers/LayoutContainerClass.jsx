import React from 'react';
import { connect } from 'react-redux';
import { Layout } from '../components/Layout';
import { addMessageTC, deleteMessageTC } from '../actions/addChatAC';

class LayoutContainerClass extends React.Component {
    handleMessageSend = (message, token) => {
        const { chatId, addMessageAction } = this.props;
        addMessageAction(chatId, message, token)
    };

    render() {
        const { messages, deleteMessageAction, isAuthorized, person } = this.props;
        return <Layout deleteMessageAction={deleteMessageAction}
            isAuthorized={isAuthorized}
            toggleIsFetching={this.toggleIsFetching}
            chats={messages}
            person={person}
            handleMessageSend={this.handleMessageSend} />;
    }
}

const mapStateToProps = (state, ownProps) => {
    const chats = state.chats.data;
    const isAuthorized = state.profile.isAuthorized;
    const person = state.profile.person;
    const { match } = ownProps;

    let messages = null;

    if (match && chats[match.params.id]) {
        messages = chats[match.params.id];
    }

    return {
        chats,
        messages,
        isAuthorized,
        person,
        chatId: match ? match.params.id : null
    };
}

const mapDispatchToProps = (dispatch) => ({
    addMessageAction: (chatId, message, token) => dispatch(addMessageTC(chatId, message, token)),
    deleteMessageAction: (chatId, messageId, token) => dispatch(deleteMessageTC(chatId, messageId, token)),
})

export const LayoutContainer = connect(mapStateToProps, mapDispatchToProps)(LayoutContainerClass);