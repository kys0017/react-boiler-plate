import React, {useState} from 'react';
import axios from "axios";
import {useDispatch} from "react-redux";
import {loginUser} from "../../../_actions/user_action";
import {withRouter} from "react-router-dom";

function LoginPage(props) {
    const dispatch = useDispatch()

    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');

    const onEmailHandler = (e) => {
        setEmail(e.currentTarget.value)
    }
    const onPasswordHandler = (e) => {
        setPassword(e.currentTarget.value)
    }

    const onSubmitHandler = (e) => {
        e.preventDefault(); // page refresh 방지

        let body ={
            email: Email,
            password: Password
        };

        dispatch(loginUser(body))
            .then(res => {
                if (res.payload.loginSuccess) {
                    props.history.push('/');
                } else {
                    alert('Error')
                }
            })
   }

    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            width: '100%', height: '100vh'
        }}
            onSubmit={onSubmitHandler}
        >
            <form style={{
                display: 'flex', flexDirection: 'column'
            }}>
                <label>Email</label>
                <input type='email' value={Email} onChange={onEmailHandler}/>
                <label>Password</label>
                <input type='password' value={Password} onChange={onPasswordHandler}/>
                <br />
                <button>
                    Login
                </button>
            </form>
        </div>
    );
}

export default withRouter(LoginPage);