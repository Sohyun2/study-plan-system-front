import './ContentForm.css';

import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom';

import CategoriList from '../categori/CategoriList'
import App from '../../../App'

function ContentForm () {
    
    return (
        <div className="middle-layout">
            <Router>
                <CategoriList/>
                <div className="content-layout">
                    <App/>
                </div>
            </Router>        
        </div>  
  );
} 

export default ContentForm;