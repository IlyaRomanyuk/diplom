import React, { useRef } from 'react';
import { Button } from '@material-ui/core';
import { authPersonTC } from './../../actions/personAC';
import { connect } from 'react-redux';
import Swal from 'sweetalert2'


const Auth = ({ authPerson }) => {
    const emailLink = useRef(null);
    const passwordLink = useRef(null);

    const handleClick = async () => {
        if (emailLink.current.value.trim() && passwordLink.current.value.trim()) {
            let email = emailLink.current.value;
            let password = passwordLink.current.value;

            authPerson({ email, password });

            emailLink.current.value = "";
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
            <h2 className="form__title">Авторизация</h2>

            <div className="form__input">
                <input ref={emailLink} type="text" name="email" placeholder="Ваше почта" />
            </div>

            <div className="form__input">
                <input ref={passwordLink} type="password" name="password" placeholder="*******" />
            </div>

            <Button className="form__btn" variant="contained" color="primary" onClick={handleClick}>Войти</Button>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => ({
    authPerson: (data) => dispatch(authPersonTC(data)),
})
const mapStateToProps = (state) => ({})

export const AuthContainer = connect(mapStateToProps, mapDispatchToProps)(Auth); 