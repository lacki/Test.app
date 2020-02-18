import React from 'react';
import { Switch, Route } from 'react-router-dom'

import Catalog from './components/Products/Catalog';
import Login from './components/Login/Index';
import Logout from './components/Login/Logout';
import Registration from './components/Registration/Index';
import Header from './components/Header/Index'

function App() {
    return (
        <div className="App-1">
            <Header/>
            <main>
                <div className="container">
                    <Switch>
                        <Route exact path="/" component={Catalog} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/logout" component={Logout} />
                        <Route exact path="/registration" component={Registration} />
                    </Switch>
                </div>
            </main>
        </div>
    );
}

export default App;
