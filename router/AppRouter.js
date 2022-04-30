import React, {useEffect} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Redirect
  } from 'react-router-dom';
import { useSelector, useDispatch} from 'react-redux';

import { LoginScreen } from '../auth/LoginScreen';
import { CalendarScreen } from '../components/calendar/CalendarScreen';
import { startChecking } from '../actions/auth';

import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

export const AppRouter = () => {

    const dispatch = useDispatch()
    const { checking, uid } = useSelector( state => state.auth )

    useEffect(() => {

        dispatch( startChecking() )
    
    }, [dispatch])

 if( checking ) {  
    return( <div>Cargando...</div>)
 }

    return (
        <Router>
            <div>
                <Switch>

                    <PublicRoute
                      exact
                      path="/login" 
                      component={ LoginScreen }
                      isAuthenticated={ !!uid }
                       />      
                    
                    <PrivateRoute 
                    exact 
                    path="/" 
                    component={ CalendarScreen } 
                    isAuthenticated={ !!uid }
                    />

                    <Redirect to="/" />   
                </Switch>
            </div>
        </Router>
    )
}
