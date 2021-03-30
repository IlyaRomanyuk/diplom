import React, { useRef } from 'react';
import { Button } from '@material-ui/core'

export const ChatForm = ({ onMessageSend, person, isAuthorized }) => {
    const mess = useRef(null);

    const handleClick = () => {
        if (mess.current.value.trim()) {
            let message = mess.current.value;
            let author = person.name;
            let image = person.image;
            onMessageSend({ author, message, image }, isAuthorized)

            mess.current.value = '';
        }
        return
    }

    const pressOnButton = (event) => {
        if (event.keyCode === 13 && event.ctrlKey) handleClick()
    }

    return (
        < div className="content__footer  footer" >
            <div>
                <textarea onKeyDown={pressOnButton} ref={mess} type="text" placeholder="Write a message"></textarea>
            </div>

            <Button variant="contained" color="primary" onClick={handleClick}>send</Button>
        </div >
    )
}
