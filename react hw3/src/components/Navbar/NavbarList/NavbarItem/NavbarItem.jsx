import React from 'react';
import { Link } from 'react-router-dom';

export const NavbarItem = ({ _id, image, messages, title, deleteChatAction, isAuthorized }) => {
    const deleteChat = () => {
        deleteChatAction(_id, isAuthorized)
    }

    return (
        <div className="navbar__block">
            <Link to={`/chats/${_id}`} className="navbar__link" >
                <div className="navbar__about">
                    <div className="navbar__img"><img src={image} alt="" /></div>
                    <div className="navbar__info">
                        <p className="navbar__info-name">{title}</p>
                        {messages && <span className="navbar__info-mess">{messages[messages.length - 1] ? messages[messages.length - 1].message : "Пока сообщений нет"}</span>}
                    </div>
                </div>
            </Link >
            <div onClick={() => deleteChat()} className="navbar__delete">+</div>
        </div>
    )
}
