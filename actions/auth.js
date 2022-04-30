import Swal from 'sweetalert2';
import { fetchSinToken, fetchConToken } from '../helpers/fetch';
import { types } from '../types/types';
import { eventLogout } from './events';

export const startLogin = (email, pasword) => {
    return async (dispatch) => {

        const resp = await fetchSinToken('/auth/log', { email, pasword }, 'POST');
        const body = await resp.json();

        if (body.ok) {
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch(
                login({
                    uid: body.uid,
                    name: body.name,
                })
            )

        } else {

            Swal.fire('Error', body.msg, 'error');
        }

    }
}

export const startResgister = (email, pasword, name) => {

    return async (dispatch) => {

        const resp = await fetchSinToken('auth/new', { email, pasword, name }, 'POST');
        const body = await resp.json();

        if (body.ok) {
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch(
                login({
                    uid: body.uid,
                    name: body.name,
                })
            )

        } else {

            Swal.fire('Error', body.msg, 'error');
        }

    }

}

export const startChecking = () => {

    return async (dispatch) => {

        const resp = await fetchConToken('auth/renew');
        const body = await resp.json();
       
        if (body.ok) {
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch(
                login({
                    uid: body.uid,
                    name: body.name,
                })
            )

        } else {

         dispatch(checkingFinish())
        }

    }

}

const checkingFinish = () => ({
    type: types.authCheckingFinish
})

const login = (user) => ({
    type: types.authLogin,
    payload: user
})

export const startLogout = () => {
    return( dispatch ) => {


       localStorage.clear();
        dispatch( eventLogout())
        dispatch(logout())
        

    }
}

export const logout = () => ({ 
   type: types.authLogout  
})

