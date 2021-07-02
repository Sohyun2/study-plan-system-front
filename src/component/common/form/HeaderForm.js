import './HeaderForm.css'
import "antd/dist/antd.css"

import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom';
import { Button } from 'antd'
import { Link } from 'react-router-dom';

function HeaderForm ({ onLogout }) {
    const userInfo = JSON.parse(localStorage.getItem("loginInfo")).user;

    return(
        <div className="header">
            <h1 className="header-title">Study Planner</h1>
            <div>
                {userInfo.NM_KOR}님 안녕하세요
                <Router>
                    <Button className='header-button' name='btnAdd' onClick={onLogout}>
                        <Link to={'/'}>로그아웃</Link>    
                    </Button>
                </Router>
            </div>
        </div>
    )

}

export default HeaderForm