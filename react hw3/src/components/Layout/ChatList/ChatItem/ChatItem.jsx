import React from 'react';
import classes from 'classnames';

export const ChatItem = ({ _id, author, message, image, chatsId, deleteMessageAction, isAuthorized, person }) => {
    let style = '';
    if (person.name !== author) {
        style = '--right';
    }

    const deleteMess = () => {
        deleteMessageAction(chatsId, _id, isAuthorized)
    }

    return (
        <div className={classes(`wrapper__data${style}`)}>
            <div className={classes(`wrapper__icon${style}`)}>
                <img src={image} alt="" />
            </div>
            <div className={classes(`wrapper__info${style}`)}>
                <p className='wrapper__name'>{author}</p>
                <div className={classes(`wrapper__message${style}`)}>{message}<div onClick={() => deleteMess()} className={classes(`wrapper__delete${style}`)}>+</div></div>
            </div>
        </div>
    )
}
