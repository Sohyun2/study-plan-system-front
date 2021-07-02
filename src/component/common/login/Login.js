import React, {useState} from 'react'
import axios from 'axios';

import LoginForm from './LoginForm'

const Login = ({onLogin}) => {
    const [id, setId] = useState('');
    const [pw, setPw] = useState('');

    const handleChange = (e) =>{
        switch(e.target.name) {
            case 'id':
                setId(e.target.value);
                break;
            case 'pw':
                setPw(e.target.value);
                break;
            default:
        }
    }

    const handleLogin = async () => {
        // 로그인 사용자 검증
        await axios.post('/login', null, {
            params: {
                ID_USER: id,
                PW_USER: pw
            }
        })
        .then(async function(response) {
            console.log(response);
            if(!response.data.status) {
                alert(response.data.errMsg);
            } else {
                onLogin(response.data);
            }
        })
        .catch(function(e) {
            console.error(e.response);
        });
    }

    return (        
        <LoginForm id={id}
            pw={pw}
            onChange={handleChange}
            onLogin={handleLogin}/>
    )
}

export default Login;