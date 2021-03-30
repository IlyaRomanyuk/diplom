import React from 'react';
import { connect } from 'react-redux';
import { addChatTC, chatsLoadTC, deleteChatTC } from '../actions/addChatAC';
import { exitTokenTC } from '../actions/personAC';
import { Navbar } from '../components/Navbar/Navbar';
import { push } from 'connected-react-router';
import { Link } from "react-router-dom";

class NavbarContainerClass extends React.Component {
    componentDidMount = () => {
        this.props.chatsLoadAction();
    }

    addNewChat = (title, token) => {
        const { addChatAction } = this.props;
        addChatAction(title, token);
    }

    render() {
        const { person, chats, loading, loadingData, deleteChatAction, isAuthorized, exitToken } = this.props;
        return isAuthorized ?
            <Navbar
                exitToken={exitToken}
                isAuthorized={isAuthorized}
                loadingData={loadingData}
                loading={loading}
                deleteChatAction={deleteChatAction}
                person={person}
                addNewChat={this.addNewChat}
                chats={chats} /> :
            <div>
                <div>
                    <Link className="navbar__myLink" to="/auth" >Войти</Link>
                </div>
                <div>
                    <Link className="navbar__myLink" to="/register" >Регистрация</Link>
                </div>
            </div>
    }
}

const mapStateToProps = (state) => ({
    chats: state.chats.data,
    loadingData: state.chats.loadingData,
    person: state.profile.person,
    loading: state.profile.loading,
    isAuthorized: state.profile.isAuthorized,
    push: state.router.push,
})

const mapDispatchToProps = (dispatch) => ({
    chatsLoadAction: () => dispatch(chatsLoadTC()),
    addChatAction: (title, token) => dispatch(addChatTC(title, token)),
    deleteChatAction: (chatId, isAuthorized) => dispatch(deleteChatTC(chatId, isAuthorized)),
    redirect: (chatId) => dispatch(push(`/chats/${chatId}`)),
    exitToken: () => dispatch(exitTokenTC())
})

export const NavbarContainer = connect(mapStateToProps, mapDispatchToProps)(NavbarContainerClass);