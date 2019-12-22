import React, {Component} from 'react'
import { Link, IndexLink } from 'react-router'
import axios from "axios/index";

export default class Home extends Component {

    constructor(props) {
        super(props);
        let url = 'http://10.21.38.20:5000';

        this.state = {
            selectedDishes: [],
            url: 'http://10.21.38.20:5000',
            addFavSign: '0',
            showDetailObj: null,
            recommendDish: [],
        }

        this.addtoFavourite = this.addtoFavourite.bind(this);
        this.getSelectedDishes = this.getSelectedDishes.bind(this);
        this.validHero = this.validHero.bind(this);
        this.handleShowSelectedDetail = this.handleShowSelectedDetail.bind(this);
        this.handleQuitDetail = this.handleQuitDetail.bind(this);
        this.getRecommendDishes = this.getRecommendDishes.bind(this);
        this.handleShowRecommendDetail = this.handleShowRecommendDetail.bind(this);

    }

    componentDidMount() {
        // this.getSelectedDishes();
        /*const scriptJQuery = document.createElement("script");
        scriptJQuery.async = true;
        scriptJQuery.src = "assets/js/vendor/jquery-3.2.1.min.js";
        document.body.appendChild(scriptJQuery);*/


        /*const scriptPoper = document.createElement("script");
        scriptPoper.async = true;
        scriptPoper.src = "assets/js/popper.min.js";
        document.body.appendChild(scriptPoper);

        const scriptBootstrap = document.createElement("script");
        scriptBootstrap.async = true;
        scriptBootstrap.src = "assets/js/bootstrap.min.js";
        document.body.appendChild(scriptBootstrap);*/

        /*const scriptPlugin = document.createElement("script");
        scriptPlugin.async = true;
        scriptPlugin.src = "assets/js/plugins.js";
        document.body.appendChild(scriptPlugin);*/

        /*const scriptAjaxMail = document.createElement("script");
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

        // this.validHero();
        this.getSelectedDishes();
        this.getRecommendDishes();
    }

    getRecommendDishes(){
        let userName = localStorage.userName;
        if(userName !== "undefined") {

            let url = 'http://10.21.38.20:5000';
            let selectedDishes = [];
            axios.get(url + '/'+userName+'/recommend').then((response) => {
                console.log(response);
                recommendDish = response.data.data
                this.setState({
                    recommendDish: recommendDish
                })
            }).catch((error) => {
                    console.log(error);
                }
            );
        }
    }

    validHero(){
        var heroSlider = document.getElementById('ht-hero-slider');
        // var heroSlider = $('.ht-hero-slider');
        heroSlider.slick({
            arrows: true,
            prevArrow:"<button type='button' class='slick-prev'><i class='fa fa-angle-left'></i></button>",
            nextArrow:"<button type='button' class='slick-next'><i class='fa fa-angle-right'></i></button>",
            autoplay: true,
            autoplaySpeed: 50000,
            dots: true,
            pauseOnFocus: false,
            pauseOnHover: false,
            fade: true,
            infinite: true,
            slidesToShow: 1,
            responsive: [
                {
                    breakpoint: 767,
                    settings: {
                        arrows: false
                    }
                },
                {
                    breakpoint: 479,
                    settings: {
                        arrows: false
                    }
                }
            ]
        });
        heroSlider.on('beforeChange', function(event, slick, currentSlide, nextSlide){
            var sliderTitle = document.querySelector('.ht-hero-slider h1');
            var currentTitle = document.querySelector('.slick-current h1');
            sliderTitle.removeClass('cssanimation leDoorCloseLeft sequence');
            currentTitle.addClass('cssanimation leDoorCloseLeft sequence');
        });
        heroSlider.on('afterChange', function(event, slick, currentSlide, nextSlide){
            var sliderTitle = document.querySelector('.ht-hero-slider h1');
            var currentTitle = document.querySelector('.slick-current h1');
            sliderTitle.removeClass('cssanimation leDoorCloseLeft sequence');
            currentTitle.addClass('cssanimation leDoorCloseLeft sequence');
        });

    }

    getSelectedDishes(){
        let url = 'http://10.21.38.20:5000';
        let selectedDishes = [];
        axios.get(url+'/dish/param',
            {
                params:{limit: 20}
            }).then((response) => {
            console.log(response);
            selectedDishes = response.data.data
            this.setState({
                selectedDishes: selectedDishes
            })
        }).catch((error)=>{
                console.log(error);
            }
        );

    }

    componentWillMount(){
        console.log('1');
        if (document.querySelector("script[src*='"+"assets/js/main.js"+"']")) {
            let elem = document.querySelector("script[src*='assets/js/main.js']");
            document.body.removeChild(elem);
            const scriptMain = document.createElement("script");
            scriptMain.async = true;
            scriptMain.src = "assets/js/main.js";
            document.body.appendChild(scriptMain);
        }
    }

    addtoFavourite(key, event){
        let url = this.state.url;
        let userName = localStorage.userName;
        let dishName = this.state.selectedDishes[key].dishName;
        if(userName === "undefined"){
            window.alert('You need to login for adding dish to favourite!');
        } else {
            let jwt_token = localStorage.jwtToken;
            console.log(dishName);
            console.log(userName);
            axios.put(url+'/favorite_dish',{
                dishName: dishName,
                userName: userName
            },
            {
                headers:{
                    'Content-Type': "application/json",
                }
            }).then((response) => {
                console.log(response);
                this.setState({
                    addFavSign: '1'
                }, ()=>{
                    setTimeout(()=>{
                        this.setState({
                            addFavSign: '0'
                        })
                    },5000)
                })
            }).catch((error)=>{
                    console.log(error);
                }
            );
        }
    }

    handleShowSelectedDetail(key){
        this.setState({
            showDetailObj: this.state.selectedDishes[key]
        })
    }

    handleShowRecommendDetail(key){
        this.setState({
            showDetailObj: this.state.recommendDish[key]
        })
    }

    handleQuitDetail() {
        this.setState({
            showDetailObj: null
        })
    }

    addRecommendtoFavourite(key, event){
        let url = this.state.url;
        let userName = localStorage.userName;
        let dishName = this.state.recommendDish[key].dishName;
        if(userName === "undefined"){
            window.alert('You need to login for adding dish to favourite!');
        } else {
            let jwt_token = localStorage.jwtToken;
            axios.put(url+'/favorite_dish',{
                    dishName: dishName,
                    userName: userName
                },
                {
                    headers:{
                        'Content-Type': "application/json",
                    }
                }).then((response) => {
                console.log(response);
                this.setState({
                    addFavSign: '1'
                }, ()=>{
                    setTimeout(()=>{
                        this.setState({
                            addFavSign: '0'
                        })
                    },5000)
                })
            }).catch((error)=>{
                    console.log(error);
                }
            );
        }
    }

    render() {
        const addtoFavourite = this.addtoFavourite;
        let selectedDishes = this.state.selectedDishes;
        let addFavSign = this.state.addFavSign;
        let showDetailObj = this.state.showDetailObj;
        const handleQuitDetail = this.handleQuitDetail;
        const handleShowSelectedDetail = this.handleShowSelectedDetail;
        let recommendDish = this.state.recommendDish;
        const handleShowRecommendDetail = this.handleShowRecommendDetail;

        return (
            <div>
                {addFavSign === '1'?
                    <div id="favBlock" className="alert alert-danger" role="alert">
                        Add to favourite success!
                    </div> : ''
                }
                <div>
                    {/* Hero Area Start */}
                    <div className="ht-hero-section fix">
                        <div className="ht-hero-slider" id="ht-hero-slider">
                            {/* Single Slide Start */}
                            <div className="ht-single-slide bg-home-1">
                                <div className="ht-hero-content-one container">
                                    <h3>Don't know what to eat today?</h3>
                                    <h1 className="cssanimation leDoorCloseLeft sequence">Discover More</h1>
                                    <p>We will recommend healthy recipes according to your need everyday.</p>
                                </div>
                            </div>
                            {/* Single Slide End */}
                            {/* Single Slide Start */}
                            <div className="ht-single-slide bg-home-2">
                                <div className="ht-hero-content-one container">
                                    <h3>Want to eat healthy?</h3>
                                    <h1 className="cssanimation leDoorCloseLeft sequence">Discover More</h1>
                                    <p>Healthy menues will can be viewed in our website.</p>
                                    {/*<Link to="/Discover" className="default-btn">Discover More</Link>*/}
                                </div>
                            </div>
                            {/* Single Slide End */}
                        </div>
                    </div>
                    {/* Hero Area End */}
                </div>
                {/* Food Categry Area Start */}
                {/* Protuct Area Start */}
                <div className="product-area pt-110 pb-80">
                    <div className="container">
                        <div className="section-title text-center">
                            <div className="section-img d-flex justify-content-center">
                                <img src="assets/img/icon/title.png" alt=""/>
                            </div>
                            <h2><span>Recommend </span>Dishes</h2>
                            <p>Hit Dishes in the community</p>
                        </div>
                    </div>
                    <div className="container">
                        <div className="tab-content text-center">
                            <div className="tab-pane active show fade" id="tab1" role="tabpanel">
                                <div className="product-carousel">
                                    {recommendDish.map(
                                        (object, i)=>{
                                            return(
                                                <div className="custom-col custom-item" key={i}>
                                                    <div className="single-product-item">
                                                        <div className="product-image">
                                                            <a className="modal-view button" data-toggle="modal" data-target="#showDishDetail">
                                                                <img src={'assets/img/product/d'+(i % 7)+'.jpg'} alt=""/>
                                                            </a>
                                                            <div className="product-hover">
                                                                <ul className="hover-icon-list">
                                                                    <li>
                                                                        <a><i onClick={addRecommendtoFavourite.bind(this, i)} key={i} className="icon icon-Heart"></i></a>
                                                                    </li>
                                                                </ul>
                                                                <button type="button" className="p-cart-btn">
                                                                    <a onClick={handleShowRecommendDetail.bind(this, i)} key={i} className="modal-view button" data-toggle="modal" data-target="#showDishDetail">View Detail</a>
                                                                </button>
                                                            </div>
                                                        </div>
                                                        <div className="product-text">
                                                            <div className="pro-price">
                                                                <h5 className="my-3 new-price">{object.dishName.slice(0,)}</h5>
                                                            </div>
                                                            <p className="">Cooking Time: {object.cookingTime} <br/> Submit Time: {object.submitTime}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Protuct Area End */}
                {/* Protuct Area Start */}
                <div className="product-area pt-110 pb-80">
                    <div className="container">
                        <div className="section-title text-center">
                            <div className="section-img d-flex justify-content-center">
                                <img src="assets/img/icon/title.png" alt=""/>
                            </div>
                            <h2><span>Selected </span>Dishes</h2>
                            <p>Hit Dishes in the community</p>
                        </div>
                    </div>
                    <div className="container">
                        <div className="tab-content text-center">
                            <div className="tab-pane active show fade" id="tab1" role="tabpanel">
                                <div className="product-carousel">
                                    {selectedDishes.map(
                                        (object, i)=>{
                                            return(
                                                <div className="custom-col custom-item" key={i}>
                                                    <div className="single-product-item">
                                                        <div className="product-image">
                                                            <a className="modal-view button" data-toggle="modal" data-target="#showDishDetail">
                                                                <img src={'assets/img/product/d'+(i % 7)+'.jpg'} alt=""/>
                                                            </a>
                                                            <div className="product-hover">
                                                                <ul className="hover-icon-list">
                                                                    <li>
                                                                        <a><i onClick={addtoFavourite.bind(this, i)} key={i} className="icon icon-Heart"></i></a>
                                                                    </li>
                                                                </ul>
                                                                <button type="button" className="p-cart-btn">
                                                                    <a onClick={handleShowSelectedDetail.bind(this, i)} key={i} className="modal-view button" data-toggle="modal" data-target="#showDishDetail">View Detail</a>
                                                                </button>
                                                            </div>
                                                        </div>
                                                        <div className="product-text">
                                                            <div className="pro-price">
                                                                <h5 className="my-3 new-price">{object.dishName.slice(0,)}</h5>
                                                            </div>
                                                            <p className="">Cooking Time: {object.cookingTime} <br/> Submit Time: {object.submitTime}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="modal fade" id="showDishDetail" tabIndex="-1" role="dialog">
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <button type="button" onClick={this.handleQuitDetail} className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true"><i className="fa fa-close"></i></span></button>
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
                                                            {/*/<h4 className="my-3">Tags</h4>*/}
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
                        </div>
                    </div>
                </div>
                {/* Protuct Area End */}

            </div>
        )
    }
}