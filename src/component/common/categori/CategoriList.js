import './CategoriList.css'
import "antd/dist/antd.css"

import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Menu } from 'antd'

// import CategoriItem from './CategoriItem';

function CategoriList () {
    const [menuList, setMenuList] = useState([]);

    useEffect(() => {
        const userId = JSON.parse(localStorage.getItem("loginInfo")).user.USER_ID;

        // 메뉴리스트
        axios.post('/menu', null, {
            params: {
                ID_USER: userId
            }
        })
        .then(async function(response) {
            if(response.data.status) {
                setMenuList(response.data.result);
            }
        })
        .catch(function(e) {
            console.error(e);
        });
    }, []);

    const onMenuClick = () => {
        
    }

    return(
        <div className="navbar">       
            <Menu className="antd-menu-custom" onClick={onMenuClick} defaultSelectedKeys={['0']}>    
                {menuList.map((menu, index) => {
                    return (
                        <Menu.Item key={menu.NAME}>
                            <Link to={menu.PATH}>{menu.NAME}</Link>
                        </Menu.Item>
                    )
                })}            
            </Menu>

        </div>
    )
}

export default CategoriList;