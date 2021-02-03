import React, { Fragment } from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import NavBar from './components/navbar/NavBar'
import Dashboard from './components/dashboard/Dashboard'
import SignIn from './components/auth/SignIn'
import SignUp from './components/auth/SignUp'

const App = () => {
    return (
        <Router>
            <Fragment>
                <NavBar />
                <Switch>
                    <Route exact path='/' component={Dashboard} />
                    <Route path='/signin' component={SignIn} />
                    <Route path='/signup' component={SignUp} />
                    
                </Switch>
            </Fragment>
        </Router>
    )
}

export default App;
