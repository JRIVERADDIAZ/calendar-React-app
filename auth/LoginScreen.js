import React from 'react';

import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import '../styles.css';
import { useForm } from '../components/hooks/UseForm';
import { startLogin, startResgister } from  '../actions/auth';

export const LoginScreen = () => {

    const dispatch = useDispatch()

    const [formLoginValues, handleLoginInputChange] = useForm({
        lEmail: 'fernando@gmnail.com',
        lPasword: '123456'
    })

    const [formRegisterValues, handleRegisterInputChange] = useForm({

        rName: 'nando',
        rEmail: 'nando@gmail.com',
        rPasword: '123456',
        rPasword2: '123456'
    })

    const { rName, rEmail, rPasword, rPasword2 } = formRegisterValues;

    const { lEmail, lPasword } = formLoginValues

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(startLogin(lEmail, lPasword))
    }

    const handleRegister = (e) => {

        e.preventDefault()

        if (rPasword !== rPasword2) {
            Swal.fire('Error', 'Las contraseñas no coinciden', 'error')
        }
        dispatch(startResgister(rEmail, rPasword, rName))
    }

    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Ingreso</h3>

                    <form onSubmit={handleLogin} >
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Correo"
                                name='lEmail'
                                value={lEmail}
                                onChange={handleLoginInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name='lPasword'
                                value={lPasword}
                                onChange={handleLoginInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="submit"
                                className="btn-Submit"
                                value="Login"
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Registro</h3>

                    <form onSubmit={handleRegister} >
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                                name='rName'
                                value={rName}
                                onChange={handleRegisterInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                                name='rEmail'
                                value={rEmail}
                                onChange={handleRegisterInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name='rPasword'
                                value={rPasword}
                                onChange={handleRegisterInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repita la contraseña"
                                name='rPasword2'
                                value={rPasword2}
                                onChange={handleRegisterInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="submit"
                                className="btnSubmit"
                                value="Crear cuenta" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}