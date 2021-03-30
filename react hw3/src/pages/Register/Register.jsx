import React, { useRef } from 'react';
import { Button } from '@material-ui/core';
import * as axios from 'axios';
import Swal from 'sweetalert2'


export const Register = () => {
    const emailLink = useRef(null);
    const nameLink = useRef(null);
    const passwordLink = useRef(null);

    const handleClick = async () => {
        if (emailLink.current.value.trim() && nameLink.current.value.trim() && passwordLink.current.value.trim()) {
            let email = emailLink.current.value;
            let name = nameLink.current.value;
            let password = passwordLink.current.value;

            let response = await axios.post('http://localhost:3030/register', { email, name, password });

            if (response.data) {
                Swal.fire('Вы успешно зарегистрировались!')
            }

            emailLink.current.value = "";
            nameLink.current.value = "";
            passwordLink.current.value = "";
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Ошибка...',
                text: 'Обязательно заплните все поля!',
            })
        }
    }

    return (
        <div className="form">
            <h2 className="form__title">Регистрация</h2>

            <div className="form__input">
                <input ref={emailLink} type="text" name="email" placeholder="Ваше почта" />
            </div>

            <div className="form__input">
                <input ref={nameLink} type="text" name="name" placeholder="Ваше имя" />
            </div>

            <div className="form__input">
                <input ref={passwordLink} type="password" name="password" placeholder="*******" />
            </div>

            <Button className="form__btn" variant="contained" color="primary" onClick={handleClick}>Заренистрироваться</Button>
        </div>
    )
}
