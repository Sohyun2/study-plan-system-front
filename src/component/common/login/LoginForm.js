import './LoginForm.css';

import React from 'react'

function LoginForm ({ id, pw, onChange, onLogin }) {
    const handleKeyPress = (e) => {
        if(e.key === 'Enter'){
            onLogin();
        }        
    }

    return (
        <div className="login-template">
            <div className="title">
                LOGIN
            </div>
            <div className="login-wrapper">
                <input type="text"
                    name="id"
                    placeholder="아이디를 입력해주세요."
                    value={id||''}
                    onChange={onChange}/>
                <br/>
                <input type="password"
                    name="pw"
                    placeholder="비밀번호를 입력해주세요."
                    value={pw||''}
                    onChange={onChange}
                    onKeyPress={handleKeyPress}/>
                <br/>
                <button className="login-button" onClick={onLogin}>로그인</button>
            </div>
        </div>
    )
}

export default LoginForm;