import React, {useEffect, useState} from 'react';
import NoDataFound from "../core/NoDataFound";
import axiosClient from "../axios";
import Pagination from "react-js-pagination";
import {Link, useNavigate} from "react-router-dom";
import Swal from "sweetalert2";
import {useStateContext} from "../contexts/ContextProvider";


const Home = () => {
    const [input, setInput] = useState({
        order_by : 'created_at',
        per_page : 2,
        direction : 'DESC',
        search : '',
    });

    const { userToken, setAuthUser, setUserToken } = useStateContext();
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const [post, setPost] = useState([]);

    const [itemsCountPerPage, setItemsCountPerPage] = useState(0)
    const [totalItemsCount, setTotalItemsCount] = useState(1)
    const [startFrom, setStartFrom] = useState(1)
    const [activePage, setActivePage] = useState(1)
    const [firstPage, setFirstPage] = useState(1)
    const [lastPage, setLastPage] = useState(1)

    const [modalShow, setModalShow] = React.useState(false);
    const [modalPhotoShow, setModalPhotoShow] = React.useState(false);
    const [posts, setPosts] = useState([]);
    const [modalPhoto, setModalPhoto] = useState('')

    const handleInput = (e) => {
        setInput(prevState => ({...prevState, [e.target.name] : e.target.value}))
    }

    const getPosts = (pageNumber=1) => {
        setIsLoading(true)
        axiosClient.get(`/posts?page=${pageNumber}&search=${input.search}&order_by=${input.order_by}&per_page=${input.per_page}&direction=${input.direction}`).then( res => {

            setPosts(res.data.data)

            setItemsCountPerPage(res.data.meta.per_page)
            setTotalItemsCount(res.data.meta.total)
            setStartFrom(res.data.meta.from)
            setLastPage(res.data.meta.last_page)
            setActivePage(res.data.meta.current_page)

            setIsLoading(false)
        }).catch(errors => {
            console.log(errors)
        })
    }

    const handleLogout = () => {
        console.log('ok')
        Swal .fire({
            title: "Êtes-vous sure?",
            text: "Vous serez déconnecter",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Oui, je me déconnecte!",
            cancelButtonText: "Annuler",
        }).then((result) => {
            if (result.isConfirmed) {
                axiosClient.post('/auth-logout').then(res=>{
                    setAuthUser('')
                    setUserToken('')
                    navigate('/login')
                    window.location.reload();
                })
            }
        });
    }


    const handlePostDelete = (id) => {
        Swal.fire({
            title: "Êtes-vous sure?",
            text: "Vous allez supprimer cet post",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Oui, je supprime!",
            cancelButtonText: "Annuler",
        }).then((result) => {
            if (result.isConfirmed) {
                axiosClient.delete(`/posts/${id}`).then(res=>{
                    getPosts()
                    Swal.fire({
                        position: "top-end",
                        icon: res.data.cls,
                        title: res.data.msg,
                        showConfirmButton: false,
                        toast:true,
                        timer: 1500
                    })
                })
            }
        });
    }


    useEffect( () => {
        getPosts()
    }, [])

    return (
        <>
            <div className="row ">
                 {/*<pre> {JSON.stringify(lastPage, undefined, 2)} </pre>*/}
                <div className="col-xl-12 col-lg-12 col-md-12">
                    <div className="card mb-4">
                        <div className="card-header">
                            <div className="d-flex justify-content-between align-items-center">
                                <h4 className="text-theme"> Liste des posts </h4>
                                <div className="ml-auto" >
                                    <Link to={'/create/post'} className="btn btn-primary mr_4">
                                        Ajouter un post
                                    </Link>

                                    <button className={'btn theme-button'} onClick={()=>handleLogout()}>
                                        Se déconnecter
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="search-area mb-4">
                                <div className="row">
                                    <div className="col-md-3">
                                        <label className={'w-100'}>
                                            <p>Recherche</p>
                                            <input
                                                className="form-control form-control-sm"
                                                name={'search'}
                                                value={input.search}
                                                onChange={handleInput}
                                                placeholder={'Recherche...'}
                                            />
                                        </label>
                                    </div>
                                    <div className="col-md-3">
                                        <label className={'w-100 search-label'}>
                                            <p>Ordre par </p>
                                            <select
                                                className="form-select form-select-sm"
                                                name={'order_by'}
                                                value={input.order_by}
                                                onChange={handleInput}
                                            >
                                                <option value={'name'}>titre</option>
                                                <option value={'created_at'}> Date création </option>                                            <option value={'name'}>Libellé</option>
                                            </select>
                                        </label>
                                    </div>
                                    <div className="col-md-2">
                                        <label className={'w-100'}>
                                            <p>Ordre direction </p>
                                            <select
                                                className="form-select form-select-sm"
                                                name={'direction'}
                                                value={input.direction}
                                                onChange={handleInput}
                                            >
                                                <option value={'desc'}>DESC </option>
                                                <option value={'asc'}>ASC </option>


                                            </select>
                                        </label>
                                    </div>
                                    <div className="col-md-2">
                                        <label className={'w-100'}>
                                            <p>Par page </p>
                                            <select
                                                className="form-select form-select-sm"
                                                name={'per_page'}
                                                value={input.per_page}
                                                onChange={handleInput}
                                            >
                                                <option value={2}>2 </option>
                                                <option value={25}>25 </option>
                                                <option value={50}>50 </option>
                                                <option value={100}>100 </option>

                                            </select>
                                        </label>
                                    </div>
                                    <div className="col-md-2">
                                        <div className={'d-grid mt-4'}>
                                            <button className={'btn btn-sm theme-button'} onClick={()=> getPosts(1)} >
                                                <i className="fa-solid fa-magnifying-glass"/> Rechercher
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                                <div className="table-responsive soft-landing">
                                    <table className={'my-table table table-hover table-striped table-bordered'}>
                                        <thead>
                                        <tr>
                                            <th>SL</th>
                                            <th>Titre </th>
                                            <th>Slug </th>
                                            <th>Photo</th>
                                            {/*<th>Date</th>*/}
                                            <th>Action</th>
                                        </tr>
                                        </thead>

                                        <tbody>
                                        {Object.keys(posts).length > 0 ? posts?.map((post, index) => (
                                            <tr key={index} >
                                                <td>{startFrom + index}</td>
                                                <td>
                                                    <p className={'text-theme'}> {post.title} </p>
                                                </td>
                                                <td>
                                                    <p className={'text-success'}> {post.slug} </p>
                                                </td>
                                                <td>
                                                    <img
                                                        src={post.display_photo} alt={post.title}
                                                        className={'img-thumbnail table-image'}
                                                    />
                                                </td>
                                                {/*<td>
                                                    <p className={'text-theme'}> <small>  Created: {post.created_at} </small></p>
                                                </td>*/}
                                                <td>
                                                    <button onClick={() => handlePostDelete(post.id) } className={'btn btn-sm btn-danger mx-1 my-1'}> <i className="fa-solid fa-trash"/> </button>
                                                    <Link to={`/post/edit/${post.id}`} > <button className={'btn btn-sm btn-warning my-1'}> <i className="fa-solid fa-edit"/> </button></Link>

                                                    {/*<button onClick={()=> handleDetailsModal(post)} className={'btn btn-sm btn-info my-1'}><i className="fa-solid fa-eye"/></button>
                                                    */}
                                                </td>
                                            </tr>
                                        )) : <NoDataFound/>}
                                        </tbody>

                                    </table>
                                </div>

                        </div>
                        <div className="card-footer">
                            <nav className={'pagination-sm'}>
                                <Pagination
                                    activePage={activePage}
                                    itemsCountPerPage={itemsCountPerPage}
                                    totalItemsCount={totalItemsCount}
                                    pageRangeDisplayed={2}
                                    onChange={getPosts}
                                    nextPageText={<i className='fa-solid fa-arrow-right'/>}
                                    firstPageText={firstPage}
                                    prevPageText={<i className='fa-solid fa-arrow-left'/>}
                                    lastPageText={lastPage}
                                    itemClass={'page-item'}
                                    linkClass={'page-link'}
                                />
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;