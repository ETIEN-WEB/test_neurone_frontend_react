import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {useStateContext} from "../contexts/ContextProvider";
import axiosClient from "../axios";
import Swal from "sweetalert2";
import AlertTopDanger from "../core/AlertTopDanger";

const AddPost = () => {

    const { userToken } = useStateContext();

    const navigate = useNavigate();
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [checked, setChecked] = useState(false);


    const [input, setInput] = useState(
        prevState => ({...prevState,
            title : '',
            content : '',
            image_path : '',
        })
    );


    const handleInput = (e) => setInput(prevState => ({...prevState, [e.target.name] : e.target.value}))

    const handleCreatePost = () => {
        //setIsLoading(true)
        console.log(input)
        axiosClient.post('/posts', input).then(({data}) => {
            if (data.retour == 1){

                setIsLoading(false)

                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Post crée avec succès",
                    showConfirmButton: false,
                    toast:true,
                    timer: 1800
                })
                navigate('/post');
            }else {
                AlertTopDanger(data.msg)
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


    return (
        <div className="container-fluid authbg" id={'login'}>
            <div className="row justify-content-center">
                <div className="col-lg-5 col-xl-4 col-md-7 col-sm-12">
                    <div className="card mx-lg-3 mx-xl-3 mx-md-2 mx-sm-16">
                        <div className="card-body">
                            <div className="form-head text-center mb-2">
                            </div>
                            <h4 className={'text-center mb-3'}> Créer un post </h4>

                            <div className={'form-group position-relative mb_22'}>
                                <label className="form-label position-relative">
                                    Le titre du post
                                    <span className="text-danger">*</span>
                                </label>
                                <input
                                    className={ errors.title != undefined ? 'form-control position-relative is-invalid' : 'form-control position-relative' }
                                    type={'text'}
                                    name={'title'}
                                    value={input.title}
                                    onChange={handleInput}
                                />
                                <div className={'login-error-msg'}> <small> {errors.title != undefined ? errors.title[0] : null } </small> </div>
                            </div>
                            <div className={'form-group position-relative mb_22'}>
                                <label className="form-label">
                                    Détail
                                    <span className="text-danger">*</span>
                                </label>
                                <input
                                    className={ errors.content != undefined ? 'form-control is-invalid' : 'form-control' }
                                    type={'text'}
                                    name={'content'}
                                    value={input.content}
                                    onChange={handleInput}
                                />
                                <div className={'login-error-msg'}> <small> {errors.content != undefined ? errors.content[0] : null } </small> </div>
                            </div>
                            <div className="col-sm-6 mb_15">
                                <label className="form-label">Photo</label>
                                <input className={errors.image_path != undefined ? "form-control is-invalid" : "form-control" }
                                       type={'file'} name="image_path"
                                       onChange={handlePhoto}
                                       placeholder="Joindrec une image"
                                />
                                <p className={'login-error-msg'}> <small> {errors.image_path != undefined ? errors.image_path[0] : null } </small> </p>
                                {input.image_path != ''?
                                    <div className="photo-preview mt-3">
                                        <img src={input.image_path} alt={'Photo preview'} className={'img-thumbnail aspect-one'} />
                                    </div> : null
                                }
                            </div>

                            {isLoading ?
                                <button className="btn bg_theme btn-block mt-3 font-18">
                                            <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true">
                                            </span> Chargement...
                                </button>
                                :
                                <button onClick={handleCreatePost} type={'button'} className="btn mt-3 btn-success btn-block"
                                        style={{ backgroundColor: '#fed700', borderColor:'#fed700'}}
                                >
                                    Enregistrer
                                </button>

                            }
                            <Link to={'/post'} className="btn btn-primary mt-3 ml_4">
                                Retour
                            </Link>
                            {/*<div className="d-grid mt-4">*/}
                            {/*    <button onClick={handleCreatePost} className="btn btn-outline-info" dangerouslySetInnerHTML={{__html: isLoading ? ' <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span> Connection... ' : ' Se connecter ' }}/>*/}
                            {/*</div>*/}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddPost;