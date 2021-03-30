import React from 'react'
import { LayoutHeader } from './LayoutHeader';
import { ChatList } from './ChatList';
import { ChatForm } from './ChatForm';

export const Layout = ({ chats, handleMessageSend, deleteMessageAction, isAuthorized, person, exitToken }) => {
    return (
        <>
            <LayoutHeader chat={chats} exitToken={exitToken} />
            <ChatList chats={chats} deleteMessageAction={deleteMessageAction} isAuthorized={isAuthorized} person={person} />
            <ChatForm onMessageSend={handleMessageSend} person={person} isAuthorized={isAuthorized} />
        </>
    )
}
