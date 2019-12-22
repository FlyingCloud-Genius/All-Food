import React, {Component} from 'react'
import axios from "axios/index";

export default class Menu extends Component {

    constructor(props) {
        super(props);

        this.state = {
            menu: [],
            url: 'http://10.21.38.20:5000',
            addFavSign: '0',
            showDetailObj: null,
            dishesArr: [0],
            changeColumnAlertSign: '',
            numOfMenu: -1
        };

        this.fetchMenu = this.fetchMenu.bind(this);
        this.handleCreateMenu = this.handleCreateMenu.bind(this);
        this.addColumn = this.addColumn.bind(this);
        this.deleteColumn = this.deleteColumn.bind(this);
        this.handleMenuDetail = this.handleMenuDetail.bind(this);
        this.handleDishDetail = this.handleDishDetail.bind(this);

    }

    componentDidMount() {

        /*const scriptJQuery = document.createElement("script");
        scriptJQuery.async = true;
        scriptJQuery.src = "assets/js/vendor/jquery-3.2.1.min.js";
        document.body.appendChild(scriptJQuery);

        const scriptPoper = document.createElement("script");
        scriptPoper.async = true;
        scriptPoper.src = "assets/js/popper.min.js";
        document.body.appendChild(scriptPoper);

        const scriptBootstrap = document.createElement("script");
        scriptBootstrap.async = true;
        scriptBootstrap.src = "assets/js/bootstrap.min.js";
        document.body.appendChild(scriptBootstrap);

        const scriptPlugin = document.createElement("script");
        scriptPlugin.async = true;
        scriptPlugin.src = "assets/js/plugins.js";
        document.body.appendChild(scriptPlugin);

        const scriptAjaxMail = document.createElement("script");
        scriptAjaxMail.async = true;
        scriptAjaxMail.src = "assets/js/plugins.js";
        document.body.appendChild(scriptAjaxMail);

        const scriptMain = document.createElement("script");
        scriptMain.async = true;
        scriptMain.src = "assets/js/main.js";
        document.body.appendChild(scriptMain);

        const scriptModernizer = document.createElement("script");
        scriptModernizer.async = true;
        scriptModernizer.src = "assets/js/vendor/modernizr-3.5.0.min.js";
        document.body.appendChild(scriptModernizer);*/
        this.fetchMenu();
    }

    fetchMenu(){
        let url = this.state.url;
        axios.get(url+'/menu/param',
            {
                params: {
                    start: 0,
                    limit: 20
                }
            }).then((response)=>{
            console.log(response);

            /*
            menu = response.data.menu
            this.setState({
                numOfMenu: menu.length
                menu: menu
            })
            */
        }).catch((error)=>{
            console.log(error);
        })
    }

    handleCreateMenu(event){
        event.preventDefault();

        if(localStorage.userName === 'undefined'){
            this.setState({
                changeColumnAlertSign: 'Please Login before create menu!'
            }, ()=>{
                setTimeout(()=> {
                    this.setState({
                        changeColumnAlertSign: ''
                    })
                }, 5000);
            });
            return
        } else {
            let userName = localStorage.userName;
            let url = this.state.url;
            let jwt_token = localStorage.jwtToken;

            let menuName = event.target[0].value;
            let description = event.target[1].value;
            if (menuName === ''){
                this.setState({
                    changeColumnAlertSign: 'Menu Name cannot be empty'
                }, ()=>{
                    setTimeout(()=> {
                        this.setState({
                            changeColumnAlertSign: ''
                        })
                    }, 5000);
                });
                return
            }

            if (description === ''){
                this.setState({
                    changeColumnAlertSign: 'Menu Description cannot be empty'
                }, ()=>{
                    setTimeout(()=> {
                        this.setState({
                            changeColumnAlertSign: ''
                        })
                    }, 5000);
                });
                return
            }

            let dishNum = this.state.dishesArr.length;
            let hasEmpty = 0;
            for (let i = 0; i < dishNum; i++){
                if (event.target[4+i].value === ''){
                    hasEmpty = 1
                }
            }
            if(hasEmpty !== 1){
                let dishList = event.target;
                axios.post(url + '/upload_menu',{
                    userName: userName,
                    menu: {
                        menuName: menuName,
                        description: description
                    }
                },
                {
                    /*headers: {"Authorization" : `JWT `+jwt_token},*/
                    headers:{
                        'Content-Type': "application/json",
                    }
                }).
                then((response)=>{
                    console.log(response);
                    for (let i = 0; i < dishNum; i++){
                        let dishName = dishList[4 + i].value;
                        console.log(menuName, dishName);
                        axios.put(url + '/menu/addDish',{
                            menuName: menuName,
                            dishName: dishName
                        }).
                        then((response)=>{
                            console.log(response);
                        }).catch((error)=>{
                            console.log(error);
                        })
                    }
                }).catch((error)=>{
                    console.log(error);
                });
            } else {
                this.setState({
                    changeColumnAlertSign: 'Dish Name cannot be empty'
                }, ()=>{
                    setTimeout(()=> {
                        this.setState({
                            changeColumnAlertSign: ''
                        })
                    }, 5000);
                });
            }
        }
    }

    addColumn(){
        let dishesArr = this.state.dishesArr;
        if(dishesArr.length < 5){
            dishesArr.push(dishesArr.length);
            this.setState({
                dishesArr: dishesArr
            })
        } else {
            this.setState({
                changeColumnAlertSign: 'Maximum support quantity of dishes is 5!'
            }, ()=>{
                setTimeout(()=> {
                    this.setState({
                        changeColumnAlertSign: ''
                    })
                }, 5000);
            })
        }
    }

    deleteColumn(){
        let dishesArr = this.state.dishesArr;
        if(dishesArr.length > 1){
            dishesArr.pop();
            this.setState({
                dishesArr: dishesArr
            })
        } else {
            this.setState({
                changeColumnAlertSign: 'Minimum support quantity of dishes is 1!'
            }, ()=>{
                setTimeout(()=> {
                    this.setState({
                        changeColumnAlertSign: ''
                    })
                }, 5000);
            })
        }
    }

    handleDishDetail() {
            console.log('111');
    }

    handleMenuDetail(){
        console.log('111');
    }



    render() {
        const handleCreateMenu = this.handleCreateMenu;
        let dishesArr = this.state.dishesArr;
        const addColumn = this.addColumn;
        const deleteColumn = this.deleteColumn;
        const changeColumnAlertSign = this.state.changeColumnAlertSign;
        let numOfMenu = this.state.numOfMenu;
        let menu = this.state.menu;
        const handleDishDetail = this.handleDishDetail;
        const handleMenuDetail = this.handleMenuDetail;

        return (
            <div>
                {/*<!-- Breadcrumb Area Start -->*/}
                <div className="breadcrumb-area bg-menu text-center">
                    <div className="container">
                        <h1>Menu</h1>
                        <nav aria-label="breadcrumb">
                            <ul className="breadcrumb">
                                <li className="breadcrumb-item active">Menu</li>
                            </ul>
                        </nav>
                    </div>
                </div>
                {/*<!-- Breadcrumb Area End -->*/}
                {/*<!-- Shop Area Start -->*/}
                <div className="shop-area pt-110 pb-100 bg-gray mb-95">
                    <div className="container">
                        <div className="row">
                            <div className="order-xl-2 order-lg-2 col-lg-12">
                                <div className="ht-product-tab">
                                    <div className="ht-tab-content width-100-percent">
                                        <div className="nav" role="tablist">
                                            <a className="active grid" href="#grid" data-toggle="tab" role="tab" aria-selected="true" aria-controls="grid">
                                                <i className="fa fa-th"/>
                                            </a>
                                            {/*<a className="list" href="#list" data-toggle="tab" role="tab" aria-selected="false" aria-controls="list">
                                                <i className="fa fa-list"/>
                                            </a>*/}
                                        </div>
                                        <div className="row width-100-percent">
                                            <div className="col-8">
                                                <div className="shop-items">
                                                    {/*<span>Showing {num_research_result} dishes </span>*/}
                                                    <span>Showing {menu.length} menus </span>
                                                </div>
                                            </div>
                                            <div className="col-4 text-right">
                                                <button type="button" className="modal-view btn btn-sm nav-post-btn"
                                                        data-toggle="modal" data-target="#createMenu"
                                                >Post Menu</button>
                                            </div>
                                        </div>


                                    </div>
                                </div>
                                <div className="ht-product-shop tab-content text-center">
                                    <div className="tab-pane active show fade" id="grid" role="tabpanel">
                                        <div className="custom-row">
                                            {menu.map((object, i)=>{
                                                return(
                                                    <div className="custom-col" key={i}>
                                                        <div className="single-product-item">
                                                            <div className="product-image">
                                                                {/*<a>
                                                                    <img src={'../assets/img/product/d'+(i % 12 + randomSeed)+'.jpg'} alt=""/>
                                                                </a>*/}
                                                                <div className="product-hover">
                                                                    <ul className="hover-icon-list">
                                                                        <li>
                                                                            <a id="showDishBtn"
                                                                               className="modal-view button" data-toggle="modal" data-target="#showDishDetail"
                                                                               onClick={handleDishDetail.bind(this, i)} key={i}>Dish {i}</a>
                                                                        </li>
                                                                    </ul>
                                                                    <button type="button" className="p-cart-btn">
                                                                        <a className="modal-view button" data-toggle="modal" data-target="#showMenuDetail"
                                                                            onClick={handleMenuDetail.bind(this, i)} key={i} >View Menu</a>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                            <div className="product-text">
                                                                <div className="pro-price">
                                                                    <h5 className="my-3 new-price">{object.menuName}</h5>
                                                                </div>
                                                                <p className="">{object.description}</p>
                                                            </div>
                                                        </div>
                                                    </div>)
                                            })}
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                {/*<!-- Shop Area End -->*/}

                {/*<!-- QUICKVIEW PRODUCT -->*/}
                {/*<div className="modal fade" id="showDishDetail" tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button onClick={this.handleQuitDetail} type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">
                                        <i className="fa fa-close"></i>
                                    </span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="quick-view-container">
                                    <div className="quick-view-text">
                                        {showDetailObj !== null?
                                            (<div>
                                                <div className="form-pop-up-content">
                                                    <h2>Basic Info</h2>
                                                </div>
                                                <div className="dishDetailTextBlock">
                                                    <h4 className="my-2">{showDetailObj.dishName}</h4>
                                                    <p>Dish ID: {showDetailObj.dishId}</p>
                                                    <p>Submit Time: {showDetailObj.submitTime}</p>
                                                    <p>Cooking Time: {showDetailObj.cookingTime}</p>
                                                </div>
                                                <div className="form-pop-up-content">
                                                    <h2>Tags</h2>
                                                </div>
                                                <div className="dishDetailTextBlock">
                                                    <p>Easy or not: {showDetailObj.tag.easy}</p>
                                                    <p>Dish Type:
                                                        {
                                                            showDetailObj.tag.dishType.map((object, i)=> <span key={i}>{object} </span>)
                                                        }
                                                    </p>
                                                    <p>Festival:
                                                        {
                                                            showDetailObj.tag.festival.map((object, i)=> <span key={i}>{object} </span>)
                                                        }
                                                    </p>
                                                    <p>Target People:
                                                        {
                                                            showDetailObj.tag.targetPeople.map((object, i)=> <span key={i}>{object} </span>)
                                                        }
                                                    </p>
                                                    <p>Taste:
                                                        {
                                                            showDetailObj.tag.taste.map((object, i)=> <span key={i}>{object} </span>)
                                                        }
                                                    </p>
                                                    <p>Region:
                                                        {
                                                            showDetailObj.tag.region.map((object, i)=> <span key={i}>{object} </span>)
                                                        }
                                                    </p>
                                                </div>
                                                <div className="form-pop-up-content">
                                                    <h2>Ingredients</h2>
                                                </div>
                                                <div className="dishDetailTextBlock">
                                                    <p className="tags">
                                                        {
                                                            showDetailObj.ingredient.map((object, i)=>
                                                                <span className="badge badge-info mx-1" key={i}>{object} </span>)
                                                        }
                                                    </p>
                                                </div>
                                                <div className="form-pop-up-content">
                                                    <h2>Nutrition</h2>
                                                </div>
                                                <div className="dishDetailTextBlock">
                                                    <div className="row">
                                                        <div className="col-lg-6">
                                                            <p className="">Sugar: {showDetailObj.nutrition["sugar"]}</p>
                                                            <p className="">Cholesterol: {showDetailObj.nutrition["cholesterol"]}</p>
                                                            <p className="">Fat: {showDetailObj.nutrition["fat"]}</p>
                                                            <p className="">Protein: {showDetailObj.nutrition["protein"]}</p>
                                                        </div>
                                                        <div className="col-lg-6">
                                                            <p className="">Saturated Fat: {showDetailObj.nutrition["saturatedFat"]}</p>
                                                            <p className="">Sodium: {showDetailObj.nutrition["sodium"]}</p>
                                                            <p className="">Calories: {showDetailObj.nutrition["calories"]}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-pop-up-content">
                                                    <h2>Description</h2>
                                                </div>
                                                <div className="dishDetailTextBlock">
                                                    <p>{showDetailObj.description}</p>
                                                </div>
                                                <div className="form-pop-up-content">
                                                    <h2>Steps</h2>
                                                </div>
                                                <div className="dishDetailTextBlock">
                                                    <ul>
                                                        {showDetailObj.steps.map((object, i)=>{
                                                            <li key={i}>{object}</li>
                                                        })
                                                        }
                                                    </ul>
                                                </div>
                                            </div>):''
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>*/}
                <div className="modal fade" id="createMenu" tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">
                                        <i className="fa fa-close"></i>
                                    </span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="quick-view-container">
                                    <div className="quick-view-text">
                                        <div className="form-pop-up-content">
                                            <h2>Create Menu</h2>
                                        </div>
                                        <div className="dishDetailTextBlock">
                                            <form onSubmit={handleCreateMenu}>
                                                <div className="form-box">
                                                    <h4 className="mt-3">Menu Name</h4>
                                                    <div className="col">
                                                        <input type="text" className="form-control" placeholder="Menu Name" name="menuName"/>
                                                    </div>
                                                    <h4 className="mt-3">Description</h4>
                                                    <div className="col">
                                                        <div className="form-group">
                                                            <textarea className="form-control" id="createDishDescription" rows="3"/>
                                                        </div>
                                                    </div>
                                                    <div className="row mt-3">
                                                        <div className="col-6">
                                                            <h4>Add Dishes</h4>
                                                        </div>
                                                        <div className="col-6 text-right">
                                                            <button type="button" className="btn btn-sm btn-outline-success mr-2" onClick={addColumn.bind(this)}>+</button>
                                                            <button type="button" className="btn btn-sm btn-outline-danger" onClick={deleteColumn.bind(this)}>-</button>
                                                        </div>
                                                    </div>
                                                    {changeColumnAlertSign === ''? '':<div className="alert alert-danger" role="alert">{changeColumnAlertSign}</div>}
                                                    {dishesArr.map((object, i)=>{
                                                        return(
                                                            <div className="col mt-3" key={i}>
                                                                <input type="text" className="form-control" placeholder="Dish Name" name="dishName"/>
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                                <button type="submit" className="btn btn-sm nav-post-btn my-4">Create</button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/*<!-- END QUICKVIEW PRODUCT -->*/}
            </div>
        )
    }
}