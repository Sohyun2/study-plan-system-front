import './App.css';

import React from 'react'
import { Switch, Route } from 'react-router-dom';

import Home from './component/pages/Home'
import Management from './component/pages/management/Management'
import Plan from './component/pages/user/Plan'
import PlanList from './component/pages/user/PlanList'

function App() {
  
  return (
    <div className="content">
      <Switch>
        <Route path="/management" component={Management}/>
        <Route path="/plan" component={Plan}/>
        <Route path="/planList" component={PlanList}/>
        <Route path="/" component={Home}/>
      </Switch>
    </div>

  );
} 

export default App;