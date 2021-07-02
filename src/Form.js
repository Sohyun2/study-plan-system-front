import './Form.css'

import React, {useState} from 'react'

import Login from './component/common/login/Login'
import HeaderForm from './component/common/form/HeaderForm' 
import ContentForm from './component/common/form/ContentForm'
// import FooterForm from './component/common/form/FooterForm'

const Form = () => {
    const [loginInfo, setLoginInfo] = useState({
        user: null,
        status: JSON.parse(localStorage.getItem("loginInfo")) === null ? false : JSON.parse(localStorage.getItem("loginInfo")).status
    });

    const handleLogin = (data) => {
        LogInOut(data.result, data.status);
    }

    const handleLogout = () => {
        LogInOut(null, false);
    }

    const LogInOut = (_user, _status) => {
        // local storage에 login state 저장
        const _loginInfo = {
            user: _user,
            status: _status
        }

        localStorage.setItem("loginInfo", JSON.stringify(_loginInfo));        
        setLoginInfo(_loginInfo);
    }

    if(loginInfo.user === null && !loginInfo.status) {
        return (
            <div>
                <Login onLogin={handleLogin}/>
            </div>
        )
    }

    return (
        <div className="layout">
            <HeaderForm onLogout={handleLogout}/>
            <ContentForm/>
            {/* <FooterForm /> */}
        </div>
    )
}

export default Form;
