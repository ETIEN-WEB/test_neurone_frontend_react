import React, {useEffect, useState} from 'react';
import {useNavigate, Link} from "react-router-dom";

import Swal from "sweetalert2";

import AlertTopDanger from "../core/AlertTopDanger";
import axiosClient from "../axios";
import {useStateContext} from "../contexts/ContextProvider";


const Signup = () => {

    const navigate = useNavigate();
    const { userToken } = useStateContext();


    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [checked, setChecked] = useState(false);

    const [type, setType] = useState('password');
    const [icon, setIcon] = useState('fa-eye-slash');


    const [input, setInput] = useState(
        prevState => ({...prevState,
            first_name : '',
            last_name : '',
            email : '',
            age : '',
            picture_path : '',
            password : '',


        })
    );

    const handleChange = (e) => {
        setChecked(!checked);
        let remember = (!checked == true) ? 'on': '';
        setInput(prevState => ({...prevState, remember : remember}))
    };


    const handleInput = (e) => setInput(prevState => ({...prevState, [e.target.name] : e.target.value}))

    const handleSignup = () => {
        //setIsLoading(true)
        console.log(input)
        axiosClient.post('/auth/register', input).then(({data}) => {
            if (data.retour == 1){

                setIsLoading(false)

                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Compte crée avec succès",
                    showConfirmButton: false,
                    toast:true,
                    timer: 1800
                })
                navigate('/login');
            }else {
                AlertTopDanger("Quelque chose s'est mal passée")
                setIsLoading(false)
            }

        }).catch(errors => {
            console.log(errors)
            setIsLoading(false)
            if (errors.response.status == 422) {
                setErrors(errors.response.data.errors)
            }
        })
    }

    const handlePhoto = (e) =>{
        let file = e.target.files[0]
        let reader = new FileReader()
        reader.onloadend = () =>{
            setInput(prevState => ({...prevState, [e.target.name] : reader.result}))
        }
        reader.readAsDataURL(file)
    }


    useEffect( () => {
        if(userToken) {
            navigate(`/post`)
            window.location.reload();
        }
    }, [userToken])

    return (
        <div className="container-fluid authbg" id={'login'}>
            <div className="row justify-content-center">
                <div className="col-lg-5 col-xl-4 col-md-7 col-sm-12">
                    <div className="card mx-lg-3 mx-xl-3 mx-md-2 mx-sm-16">
                        <div className="card-body">
                            <div className="form-head text-center mb-2">
                            </div>
                            <h4 className={'text-center mb-3'}> S'inscrire </h4>

                            <div className={'form-group position-relative mb_22'}>
                                <label className="form-label position-relative">
                                    Nom
                                    <span className="text-danger">*</span>
                                </label>
                                <input
                                    className={ errors.first_name != undefined ? 'form-control position-relative is-invalid' : 'form-control position-relative' }
                                    type={'text'}
                                    name={'first_name'}
                                    value={input.first_name}
                                    onChange={handleInput}
                                />
                                <div className={'login-error-msg'}> <small> {errors.first_name != undefined ? errors.first_name[0] : null } </small> </div>
                            </div>
                            <div className={'form-group position-relative mb_22'}>
                                <label className="form-label position-relative">
                                    Prénoms
                                    <span className="text-danger">*</span>
                                </label>
                                <input
                                    className={ errors.last_name != undefined ? 'form-control position-relative is-invalid' : 'form-control position-relative' }
                                    type={'text'}
                                    name={'last_name'}
                                    value={input.last_name}
                                    onChange={handleInput}
                                />
                                <div className={'login-error-msg'}> <small> {errors.last_name != undefined ? errors.last_name[0] : null } </small> </div>
                            </div>
                            <div className={'form-group position-relative mb_22'}>
                                <label className="form-label">
                                    Adresse mail
                                    <span className="text-danger">*</span>
                                </label>
                                <input
                                    className={ errors.email != undefined ? 'form-control is-invalid' : 'form-control' }
                                    type={'email'}
                                    name={'email'}
                                    value={input.email}
                                    onChange={handleInput}
                                />
                                <div className={'login-error-msg'}> <small> {errors.email != undefined ? errors.email[0] : null } </small> </div>
                            </div>
                            <div className={'form-group position-relative mb_22'}>
                                <label className="form-label">
                                    Votre âge
                                    <span className="text-danger">*</span>
                                </label>
                                <input
                                    className={ errors.age != undefined ? 'form-control is-invalid' : 'form-control' }
                                    type={'number'}
                                    name={'age'}
                                    value={input.age}
                                    onChange={handleInput}
                                />
                                <div className={'login-error-msg'}> <small> {errors.age != undefined ? errors.age[0] : null } </small> </div>
                            </div>
                            <div className={'form-group position-relative mt-3 mb-3 mb_22'}>
                                <label className="form-label ">
                                    Mot de passe
                                    <span className="text-danger">*</span>
                                </label>
                                <input
                                    className={errors.password != undefined ? 'form-control is-invalid' : 'form-control' }
                                    type={type}
                                    name={'password'}
                                    value={input.password}
                                    onChange={handleInput}
                                    placeholder={"Votre mot de passe"}
                                />
                                <div className={'login-error-msg'}> <small> {errors.password != undefined ? errors.password[0] : null } </small> </div>
                            </div>

                            <div className="col-sm-6 mb_15">
                                <label className="form-label">Photo</label>
                                <input className={errors.picture_path != undefined ? "form-control is-invalid" : "form-control" }
                                       type={'file'} name="picture_path"
                                       onChange={handlePhoto}
                                       placeholder="Joindrec une picture_path"
                                />
                                <p className={'login-error-msg'}> <small> {errors.picture_path != undefined ? errors.picture_path[0] : null } </small> </p>
                                {input.picture_path != ''?
                                    <div className="photo-preview mt-3">
                                        <img src={input.picture_path} alt={'Photo preview'} className={'img-thumbnail aspect-one'} />
                                    </div> : null
                                }
                            </div>

                            {isLoading ?
                                <button className="btn bg_theme btn-block mt-3 font-18">
                                            <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true">
                                            </span> Chargement...
                                </button>
                                :
                                <button onClick={handleSignup} type={'button'} className="btn mt-3 btn-success btn-block"
                                        style={{ backgroundColor: '#fed700', borderColor:'#fed700'}}
                                >
                                    S'inscrire
                                </button>

                            }

                            <p className="mb-0 mt-3 text-center"> Vous déjà un compte <Link
                                to={'/login'}> connectez-vous</Link></p>
                            {/*<div className="d-grid mt-4">*/}
                            {/*    <button onClick={handleSignup} className="btn btn-outline-info" dangerouslySetInnerHTML={{__html: isLoading ? ' <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span> Connection... ' : ' Se connecter ' }}/>*/}
                            {/*</div>*/}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;