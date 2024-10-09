import React, {useEffect, useState} from 'react';
import Swal from "sweetalert2";
import {Link, Navigate, useNavigate} from "react-router-dom";
import axiosClient from "../axios";
import {useStateContext} from "../contexts/ContextProvider";

const Login = () => {
    const navigate = useNavigate();
    const { userToken, setAuthUser, setUserToken } = useStateContext();

    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [checked, setChecked] = useState(false);

    const [input, setInput] = useState(
        prevState => ({...prevState,
            email : '',
            password : '',
        })
    );

    const handleChange = (e) => {
        setChecked(!checked);

        setInput(prevState => ({...prevState, remember : !checked}))
    };

    const handleInput = (e) => setInput(prevState => ({...prevState, [e.target.name] : e.target.value}))

    const handleLogin = () => {
        setIsLoading(true)
        axiosClient.post('/auth/login', input).then(({data}) => {
            setAuthUser(data.user)
            setUserToken(data.token)

            navigate(`/post`)
            window.location.reload();

            // debugger
            setIsLoading(false)
        }).catch(errors => {
            setIsLoading(false)
            if (errors.response.status == 422) {
                setErrors(errors.response.data.errors)
                if (errors.response.data.errors.erreur != undefined){
                    Swal.fire({
                        position: "top-end",
                        showCloseButton: true,
                        icon: "warning",
                        title: errors.response.data.errors.erreur,
                        showConfirmButton: false,
                        toast:true,
                        timer: 8000
                    })
                }
            }
        })
    }

    useEffect( () => {
        if(userToken) {
            navigate(`/post`)
           window.location.reload();
        }
    }, [userToken])

    return (
        <>
            <div className="container-fluid authbg" id={'login'}>
                <div className="row justify-content-center">
                    <div className="col-lg-5 col-xl-4 col-md-7 col-sm-12 ">
                        <div className="card mx-lg-3 mx-xl-3 mx-md-2 mx-sm-16">
                            <div className="card-body">
                                <div className="form-head text-center mb-2">
                                </div>

                                <h4 className={'text-center mb-3'}> Se connecter </h4>

                                <div className={'form-group'}>
                                    <label className="form-label">
                                        Email
                                        <span className="text-danger">*</span>
                                    </label>
                                    <input
                                        className={ errors.email != undefined ? 'form-control is-invalid' : 'form-control' }
                                        type={'email'}
                                        name={'email'}
                                        value={input.email}
                                        onChange={handleInput}
                                        placeholder={"Votre adresse mail"}
                                    />
                                    <div className={'login-error-msg'}> <small> {errors.email != undefined ? errors.email[0] : null } </small> </div>
                                </div>
                                <div className="form-group position-relative mb-3 mt-3">
                                    <label className="form-label">
                                        Mot de passe
                                        <span className="text-danger">*</span>
                                    </label>
                                    <input
                                        className={errors.password != undefined ? 'form-control is-invalid' : 'form-control' }
                                        type={'password'}
                                        name={'password'}
                                        value={input.password}
                                        onChange={handleInput}
                                        placeholder={"Votre mot de passe"}
                                    />
                                    <div className={'login-error-msg'}> <small> {errors.password != undefined ? errors.password[0] : null } </small> </div>
                                </div>

                                {isLoading ?
                                    <button className="btn bg_theme btn-block font-18">
                                            <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true">
                                            </span> Chargement...
                                    </button>
                                    :
                                    <button onClick={handleLogin} type={'button'} className="btn btn-primary btn-block"
                                    >
                                        Se connecter
                                    </button>

                                }
                                <p className="mb-0 mt-3">Vous n'avez pas de compte! <Link
                                    to={'/signup'}>Créer un compte</Link></p>
                                {/*<div className="d-grid mt-4">*/}
                                {/*    <button onClick={handleLogin} className="btn btn-outline-info" dangerouslySetInnerHTML={{__html: isLoading ? ' <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span> Connection... ' : ' Se connecter ' }}/>*/}
                                {/*</div>*/}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;