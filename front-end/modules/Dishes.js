import React, {Component} from 'react'
import axios from "axios/index";
import { Link } from 'react-router'

export default class Dishes extends Component {

    constructor(props) {
        super(props);

        this.state = {
            type: -1,
            option: -1,
            optionObj: [
                ['cheese', 'chicken', 'vegetables', 'fruit'],
                ['main-dish', 'desserts', 'soups-stews', 'beverages'],
                ['asian', 'chilean', 'italian', 'mexican']
            ],
            filterResult: [],
            step: 10000,
            url: 'http://10.21.38.20:5000',
            showDetailObj: null,
            randomSeed: 12,
            tag: {}
        };

        this.getSearchResult = this.getSearchResult.bind(this);
        this.fetchDishes = this.fetchDishes.bind(this);
        this.handleShowDetail = this.handleShowDetail.bind(this);
        this.addtoFavourite = this.addtoFavourite.bind(this);
        this.handleQuitDetail = this.handleQuitDetail.bind(this);
        this.handleCreateDish = this.handleCreateDish.bind(this);
        this.getTag = this.getTag.bind(this);
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
        this.setState({
            type: this.props.params.type,
            option: this.props.params.option
        });
        this.getSearchResult();
        this.getTag();
    }

    componentWillReceiveProps(nextProps) {
        let type = this.props.params.type;
        let option = this.props.params.option;
        let newType = nextProps.params.type;
        let newOption = nextProps.params.option;
        let resetRandom = this.state.randomSeed - 3;
        if(resetRandom < 0){
            resetRandom = 11
        }
        if (type !== newType || newOption !== option) {
            this.setState({
                type: newType,
                option: newOption,
                randomSeed: resetRandom
            });

            this.getSearchResult();
        }
    }

    getTag(){
        let url = this.state.url;
        axios.get(url+'/tag').
        then((response) => {
            console.log(response);
            this.setState({
                tag: response.data.data
            })
        }).catch((error)=>{
            console.log(error);
        })
    }

    fetchDishes(requireDish, start){
        let getDishes = [];
        let tagDishes = [];
        let url = this.state.url;
        let type = this.state.type;
        let option = this.state.option;
        let step = this.state.step;
        if( (type == -1 && option == -1) || (type == 0 && option == 0)){
            axios.get(url+'/dish/limit',
                {params:{
                        start: 0,
                        end: 200
                    }
                }).then((response) => {
                console.log(response);
                getDishes = response.data.data;
                this.setState({
                    filterResult: getDishes
                }, ()=>{
                    return start
                })
            }).catch((error)=>{
                console.log(error);
            })
        } else {
            let tag = this.state.optionObj[type - 1][option - 1];

            axios.get(url+'/dish/limit',
                {params:{
                        start: start,
                        end: (start + step)
                    }
                }).then((response) => {
                console.log(response);
                getDishes = response.data.data;
                for (let i = 0; i < getDishes.length; i++){
                    let dish = getDishes[i];
                    if (type === "1"){
                        for (let k = 0; k < dish.ingredient.length; k++){
                            if (dish.ingredient[k] === tag){
                                tagDishes.push(dish);
                                break
                            }
                        }
                    } else if(type === "2"){
                        for (let k = 0; k < dish.tag.dishType.length; k++){
                            if (dish.tag.dishType[k] === tag){
                                tagDishes.push(dish);
                                break
                            }
                        }
                    } else if(type === "3"){
                        for (let k = 0; k < dish.tag.region.length; k++){
                            if (dish.tag.region[k] === tag){
                                tagDishes.push(dish);
                                break
                            }
                        }
                    }
                }
                this.setState({
                    filterResult: tagDishes
                }, ()=>{
                    return start
                });
            }).catch((error)=>{
                    console.log(error);
                    start = 1000;
                }
            );
        }

    }

    getSearchResult(){

        let requireDish = 20;
        let start = 0;
        let step = this.state.step;
        while (start < 1000){
            start = this.fetchDishes(20, 0);
            start = start + step;
        }

    }

    addtoFavourite(key, event){
        let url = this.state.url;
        let dishName = this.state.filterResult[key].dishName;
        if(localStorage.userName === "undefined"){
            window.alert('You need to login for adding dish to favourite!');
        } else {
            let jwt_token = localStorage.jwtToken;
            axios.put(url+'/favorite_dish',{
                    dishName: dishName,
                    userName: userName
                },
                {
                    /*headers: {"Authorization" : `JWT `+jwt_token},*/
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

    handleShowDetail(key){
        this.setState({
            showDetailObj: this.state.filterResult[key]
        })
    }

    handleQuitDetail() {
        this.setState({
            showDetailObj: null
        })

    }

    handleCreateDish(event){
        event.preventDefault();
        let url = this.state.url;

        let dishName = event.target[0].value;
        let cookingTime = event.target[1].value;
        let easy = event.target[2].value === 'true'? true: false;
        let lst4 = [];
        let dishType = lst4.push(event.target[3].value);
        let lst3 = [];
        let festival = lst3.push(event.target[4].value);
        let targetPeople = event.target[5].value;
        let lst1 = [];
        let taste = lst1.push(event.target[6].value);
        let lst2 = [];
        let region = lst2.push(event.target[7].value);

        let ingredients = event.target[8].value.split('###');

        let sugar = event.target[9].value;
        let cholesterol = event.target[10].value;
        let fat = event.target[11].value;
        let protein = event.target[12].value;
        let satFat = event.target[13].value;
        let sodium = event.target[14].value;
        let calorie = event.target[15].value;

        let description = event.target[16].value;
        let steps = event.target[17].value.split('###');
        let nutritionLimitation  = [];
        nutritionLimitation.push(sugar);
        nutritionLimitation.push(cholesterol);
        nutritionLimitation.push(fat);
        nutritionLimitation.push(protein);
        nutritionLimitation.push(satFat);
        nutritionLimitation.push(sodium);
        nutritionLimitation.push(calorie);
        let tag = {
            easy: easy,
            taste: taste,
            region: region,
            dishType: dishType,
            targetPeople: targetPeople,
            nutritionLimitation: [],
            festival: festival
        };

        axios.post(url+'/upload_dish', {
            dish:{
                dishName: dishName,
                cookingTime: cookingTime,
                steps: steps,
                submitTime: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
                visitTimes: 1,
                description: description,
                ingredient: ingredients,
                nutrition: nutritionLimitation,
                tag: tag,
                tagSummary: []
            }
        }).then((response)=>{
            console.log(response);
        }).catch((error)=>{
            console.log(error);
        })

    }

    render() {
        let filterResult = this.state.filterResult;
        let num_research_result = this.state.filterResult.length;
        const addtoFavourite = this.addtoFavourite;
        const handleShowDetail = this.handleShowDetail;
        let type = this.state.type;
        let option = this.state.option;
        let showDetailObj = this.state.showDetailObj;
        const handleQuitDetail = this.handleQuitDetail;
        let randomSeed = this.state.randomSeed;
        const handleCreateDish = this.handleCreateDish;
        const tag = this.state.tag;

        return (
            <div>
                {/*<!-- Breadcrumb Area Start -->*/}
                <div className="breadcrumb-area bg-dishes text-center">
                    <div className="container">
                        <h1>Dishes</h1>
                        <nav aria-label="breadcrumb">
                            <ul className="breadcrumb">
                                <li className="breadcrumb-item active">Dishes</li>
                            </ul>
                        </nav>
                    </div>
                </div>
                {/*<!-- Breadcrumb Area End -->*/}
                {/*<!-- Shop Area Start -->*/}
                <div value={type} className="shop-area pt-110 pb-100 bg-gray mb-95">
                    <div className="container">
                        <div className="row">
                            <div className="order-xl-2 order-lg-2 col-xl-9 col-lg-8">
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
                                                    <span>Showing {num_research_result} dishes </span>
                                                </div>
                                            </div>
                                            <div className="col-4 text-right">
                                                <button type="button" className="modal-view btn btn-sm nav-post-btn"
                                                        data-toggle="modal" data-target="#createDish"
                                                >Post Dishes</button>
                                            </div>
                                        </div>


                                    </div>
                                    {/*<div className="shop-results-wrapper">
                                        <div className="shop-results"><span>Show:</span>
                                            <div className="shop-select">
                                                <select name="number" id="number">
                                                    <option value="9">9</option>
                                                    <option value="25">25</option>
                                                    <option value="50">50</option>
                                                    <option value="75">75</option>
                                                    <option value="100">100</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="shop-results"><span>Sort By:</span>
                                            <div className="shop-select">
                                                <select name="sort" id="sort">
                                                    <option value="position">Default sorting</option>
                                                    <option value="p-name">Sort Popularity</option>
                                                    <option value="p-price">Sort Price</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>*/}
                                </div>
                                <div className="ht-product-shop tab-content text-center">
                                    <div className="tab-pane active show fade" id="grid" role="tabpanel">
                                        <div className="custom-row">
                                            {filterResult.map((object, i)=>{
                                                return(
                                                <div className="custom-col" key={i}>
                                                    <div className="single-product-item">
                                                        <div className="product-image">
                                                            <a>
                                                                <img src={'../assets/img/product/d'+(i % 12 + randomSeed)+'.jpg'} alt=""/>
                                                            </a>
                                                            <div className="product-hover">
                                                                <ul className="hover-icon-list">
                                                                    <li>
                                                                        <a id="addFavBtn" onClick={addtoFavourite.bind(this, i)} key={i}><i className="icon icon-Heart"></i></a>
                                                                    </li>
                                                                </ul>
                                                                <button type="button" className="p-cart-btn">
                                                                    <a onClick={handleShowDetail.bind(this, i)} key={i} className="modal-view button" data-toggle="modal" data-target="#showDishDetail">View Detail</a>
                                                                </button>
                                                            </div>
                                                        </div>
                                                        <div className="product-text">
                                                            <div className="pro-price">
                                                                <h5 className="my-3 new-price">{object.dishName}</h5>
                                                            </div>
                                                            <p className="">Cooking Time:{object.cookingTime} <br/> Submit Time:{object.submitTime}</p>
                                                        </div>
                                                    </div>
                                                </div>)
                                            })}
                                        </div>
                                    </div>
                                    {/*<div className="tab-pane fade text-left" id="list" role="tabpanel">
                                        <div className="single-product-item">
                                            <div className="product-image">
                                                <a href="product-details.html">
                                                    <img src="assets/img/product/1.jpg" alt=""/>
                                                </a>
                                                <div className="product-hover">
                                                    <ul className="hover-icon-list">
                                                        <li>
                                                            <a href="wishlist.html"><i className="icon icon-Heart"/></a>
                                                        </li>
                                                        <li>
                                                            <a href="#"><i className="icon icon-Restart"/></a>
                                                        </li>
                                                        <li><a href="assets/img/product/1.jpg" data-toggle="modal" data-target="#productModal"><i className="icon icon-Search"/></a></li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="product-text">
                                                <h5><a href="product-details.html">Farm Fresh Black Grape</a></h5>
                                                <div className="product-rating">
                                                    <i className="fa fa-star-o color"/>
                                                    <i className="fa fa-star-o color"/>
                                                    <i className="fa fa-star-o color"/>
                                                    <i className="fa fa-star-o"/>
                                                    <i className="fa fa-star-o"/>
                                                </div>
                                                <div className="pro-price">
                                                    <span className="new-price">$110.00</span>
                                                    <span className="old-price">$122.00</span>
                                                </div>
                                                <p>Go for bananas with very small patches of black and used to make banana bread or served with single cream and sugar.</p>
                                                <button type="button" className="p-cart-btn default-btn">Add to cart</button>
                                            </div>
                                        </div>
                                        <div className="single-product-item">
                                            <div className="product-image">
                                                <a href="product-details.html">
                                                    <img src="assets/img/product/2.jpg" alt=""/>
                                                </a>
                                                <div className="product-hover">
                                                    <ul className="hover-icon-list">
                                                        <li>
                                                            <a href="wishlist.html"><i className="icon icon-Heart"/></a>
                                                        </li>
                                                        <li>
                                                            <a href="#"><i className="icon icon-Restart"/></a>
                                                        </li>
                                                        <li><a href="assets/img/product/2.jpg" data-toggle="modal" data-target="#productModal"><i className="icon icon-Search"/></a></li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="product-text">
                                                <h5><a href="product-details.html">Wonderfully Sweet Banana</a></h5>
                                                <div className="product-rating">
                                                    <i className="fa fa-star-o color"/>
                                                    <i className="fa fa-star-o color"/>
                                                    <i className="fa fa-star-o color"/>
                                                    <i className="fa fa-star-o"/>
                                                    <i className="fa fa-star-o"/>
                                                </div>
                                                <div className="pro-price">
                                                    <span className="new-price">$90.00</span>
                                                    <span className="old-price">$99.00</span>
                                                </div>
                                                <p>To eat straight away, go for bananas with very small patches of black on the ... Mashed and used to make banana bread.</p>
                                                <button type="button" className="p-cart-btn default-btn">Add to cart</button>
                                            </div>
                                        </div>
                                        <div className="single-product-item">
                                            <div className="product-image">
                                                <a href="product-details.html">
                                                    <img src="assets/img/product/3.jpg" alt=""/>
                                                </a>
                                                <div className="product-hover">
                                                    <ul className="hover-icon-list">
                                                        <li>
                                                            <a href="wishlist.html"><i className="icon icon-Heart"/></a>
                                                        </li>
                                                        <li>
                                                            <a href="#"><i className="icon icon-Restart"/></a>
                                                        </li>
                                                        <li><a href="assets/img/product/3.jpg" data-toggle="modal" data-target="#productModal"><i className="icon icon-Search"/></a></li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="product-text">
                                                <h5><a href="product-details.html">Fresh Red Capcicum</a></h5>
                                                <div className="product-rating">
                                                    <i className="fa fa-star-o color"/>
                                                    <i className="fa fa-star-o color"/>
                                                    <i className="fa fa-star-o color"/>
                                                    <i className="fa fa-star-o"/>
                                                    <i className="fa fa-star-o"/>
                                                </div>
                                                <div className="pro-price">
                                                    <span className="new-price">$190.00</span>
                                                    <span className="old-price">$120.00</span>
                                                </div>
                                                <p>The 30-inch Apple Cinema HD Display delivers an amazing 2560 x 1600 pixel resolution. Designed specifically fo..</p>
                                                <button type="button" className="p-cart-btn default-btn">Add to cart</button>
                                            </div>
                                        </div>
                                        <div className="single-product-item">
                                            <div className="product-image">
                                                <a href="product-details.html">
                                                    <img src="assets/img/product/4.jpg" alt=""/>
                                                </a>
                                                <div className="product-hover">
                                                    <ul className="hover-icon-list">
                                                        <li>
                                                            <a href="wishlist.html"><i className="icon icon-Heart"/></a>
                                                        </li>
                                                        <li>
                                                            <a href="#"><i className="icon icon-Restart"/></a>
                                                        </li>
                                                        <li><a href="assets/img/product/4.jpg" data-toggle="modal" data-target="#productModal"><i className="icon icon-Search"/></a></li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="product-text">
                                                <h5><a href="product-details.html">Healthy Juicy Mango</a></h5>
                                                <div className="product-rating">
                                                    <i className="fa fa-star-o color"/>
                                                    <i className="fa fa-star-o color"/>
                                                    <i className="fa fa-star-o color"/>
                                                    <i className="fa fa-star-o"/>
                                                    <i className="fa fa-star-o"/>
                                                </div>
                                                <div className="pro-price">
                                                    <span className="new-price">$80.00</span>
                                                    <span className="old-price">$70.00</span>
                                                </div>
                                                <p>The 30-inch Apple Cinema HD Display delivers an amazing 2560 x 1600 pixel resolution. Designed specifically fo..</p>
                                                <button type="button" className="p-cart-btn default-btn">Add to cart</button>
                                            </div>
                                        </div>
                                        <div className="single-product-item">
                                            <div className="product-image">
                                                <a href="product-details.html">
                                                    <img src="assets/img/product/6.jpg" alt=""/>
                                                </a>
                                                <div className="product-hover">
                                                    <ul className="hover-icon-list">
                                                        <li>
                                                            <a href="wishlist.html"><i className="icon icon-Heart"/></a>
                                                        </li>
                                                        <li>
                                                            <a href="#"><i className="icon icon-Restart"/></a>
                                                        </li>
                                                        <li><a href="assets/img/product/6.jpg" data-toggle="modal" data-target="#productModal"><i className="icon icon-Search"/></a></li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="product-text">
                                                <h5><a href="product-details.html">Fresh Large Coconut</a></h5>
                                                <div className="product-rating">
                                                    <i className="fa fa-star-o color"/>
                                                    <i className="fa fa-star-o color"/>
                                                    <i className="fa fa-star-o color"/>
                                                    <i className="fa fa-star-o"/>
                                                    <i className="fa fa-star-o"/>
                                                </div>
                                                <div className="pro-price">
                                                    <span className="new-price">$70.00</span>
                                                    <span className="old-price">$50.00</span>
                                                </div>
                                                <p>The 30-inch Apple Cinema HD Display delivers an amazing 2560 x 1600 pixel resolution. Designed specifically fo..</p>
                                                <button type="button" className="p-cart-btn default-btn">Add to cart</button>
                                            </div>
                                        </div>
                                        <div className="single-product-item">
                                            <div className="product-image">
                                                <a href="product-details.html">
                                                    <img src="assets/img/product/7.jpg" alt=""/>
                                                </a>
                                                <div className="product-hover">
                                                    <ul className="hover-icon-list">
                                                        <li>
                                                            <a href="wishlist.html"><i className="icon icon-Heart"/></a>
                                                        </li>
                                                        <li>
                                                            <a href="#"><i className="icon icon-Restart"/></a>
                                                        </li>
                                                        <li><a href="assets/img/product/7.jpg" data-toggle="modal" data-target="#productModal"><i className="icon icon-Search"/></a></li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="product-text">
                                                <h5><a href="product-details.html">Chemical Free Fresh Juice</a></h5>
                                                <div className="product-rating">
                                                    <i className="fa fa-star-o color"/>
                                                    <i className="fa fa-star-o color"/>
                                                    <i className="fa fa-star-o color"/>
                                                    <i className="fa fa-star-o"/>
                                                    <i className="fa fa-star-o"/>
                                                </div>
                                                <div className="pro-price">
                                                    <span className="new-price">$200.00</span>
                                                    <span className="old-price">$100.00</span>
                                                </div>
                                                <p>The 30-inch Apple Cinema HD Display delivers an amazing 2560 x 1600 pixel resolution. Designed specifically fo..</p>
                                                <button type="button" className="p-cart-btn default-btn">Add to cart</button>
                                            </div>
                                        </div>
                                        <div className="single-product-item">
                                            <div className="product-image">
                                                <a href="product-details.html">
                                                    <img src="assets/img/product/8.jpg" alt=""/>
                                                </a>
                                                <div className="product-hover">
                                                    <ul className="hover-icon-list">
                                                        <li>
                                                            <a href="wishlist.html"><i className="icon icon-Heart"/></a>
                                                        </li>
                                                        <li>
                                                            <a href="#"><i className="icon icon-Restart"/></a>
                                                        </li>
                                                        <li><a href="assets/img/product/8.jpg" data-toggle="modal" data-target="#productModal"><i className="icon icon-Search"/></a></li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="product-text">
                                                <h5><a href="product-details.html">Fresh Pineapple</a></h5>
                                                <div className="product-rating">
                                                    <i className="fa fa-star-o color"/>
                                                    <i className="fa fa-star-o color"/>
                                                    <i className="fa fa-star-o color"/>
                                                    <i className="fa fa-star-o"/>
                                                    <i className="fa fa-star-o"/>
                                                </div>
                                                <div className="pro-price">
                                                    <span className="new-price">$190.00</span>
                                                    <span className="old-price">$120.00</span>
                                                </div>
                                                <p>The 30-inch Apple Cinema HD Display delivers an amazing 2560 x 1600 pixel resolution. Designed specifically fo..</p>
                                                <button type="button" className="p-cart-btn default-btn">Add to cart</button>
                                            </div>
                                        </div>
                                        <div className="single-product-item">
                                            <div className="product-image">
                                                <a href="product-details.html">
                                                    <img src="assets/img/product/9.jpg" alt=""/>
                                                </a>
                                                <div className="product-hover">
                                                    <ul className="hover-icon-list">
                                                        <li>
                                                            <a href="wishlist.html"><i className="icon icon-Heart"/></a>
                                                        </li>
                                                        <li>
                                                            <a href="#"><i className="icon icon-Restart"/></a>
                                                        </li>
                                                        <li><a href="assets/img/product/9.jpg" data-toggle="modal" data-target="#productModal"><i className="icon icon-Search"/></a></li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="product-text">
                                                <h5><a href="product-details.html">Farm's Fresh Cucumber</a></h5>
                                                <div className="product-rating">
                                                    <i className="fa fa-star-o color"/>
                                                    <i className="fa fa-star-o color"/>
                                                    <i className="fa fa-star-o color"/>
                                                    <i className="fa fa-star-o"/>
                                                    <i className="fa fa-star-o"/>
                                                </div>
                                                <div className="pro-price">
                                                    <span className="new-price">$190.00</span>
                                                    <span className="old-price">$120.00</span>
                                                </div>
                                                <p>The 30-inch Apple Cinema HD Display delivers an amazing 2560 x 1600 pixel resolution. Designed specifically fo..</p>
                                                <button type="button" className="p-cart-btn default-btn">Add to cart</button>
                                            </div>
                                        </div>
                                    </div>*/}
                                </div>

                                {/*<div className="pagination-wrapper">
                                    <p>Showing 1 to 9 of 11 (2 Pages)</p>
                                    <nav aria-label="navigation">
                                        <ul className="pagination">
                                            <li className="page-item active"><a className="page-link" href="#">1</a></li>
                                            <li className="page-item"><a className="page-link" href="#">2</a></li>
                                            <li className="page-item"><a className="page-link" href="#">></a></li>
                                            <li className="page-item"><a className="page-link" href="#">>|</a></li>
                                        </ul>
                                    </nav>
                                </div>*/}
                            </div>
                            <div className="col-xl-3 col-lg-4">
                                <div className="sidebar-wrapper custom-side-nav">
                                    <h3>Layered Navigation</h3>
                                    <ul>
                                        <li>
                                            <ul className="mb-3">
                                                <li><h5 className="mb-3">Ingredients</h5></li>
                                                <li><Link to="/Dishes/1/1">Cheese</Link></li>
                                                <li><Link to="/Dishes/1/2">Chicken</Link></li>
                                                <li><Link to="/Dishes/1/3">Vegetables</Link></li>
                                                <li><Link to="/Dishes/1/4">Fruits</Link></li>
                                            </ul>
                                        </li>
                                        <li>
                                            <ul className="mb-3">
                                                <li><h5 className="mb-3">Type</h5></li>
                                                <li><Link to="/Dishes/2/1">Main Dish</Link></li>
                                                <li><Link to="/Dishes/2/2">Desserts</Link></li>
                                                <li><Link to="/Dishes/2/3">Soup and Stews</Link></li>
                                                <li><Link to="/Dishes/2/4">Beverages</Link></li>
                                            </ul>
                                        </li>
                                        <li>
                                            <ul className="mb-3">
                                                <li><h5 className="mb-3">Region</h5></li>
                                                <li><Link to="/Dishes/3/1">Asian</Link></li>
                                                <li><Link to="/Dishes/3/2">Chilean</Link></li>
                                                <li><Link to="/Dishes/3/3">Italian</Link></li>
                                                <li><Link to="/Dishes/3/4">Mexican</Link></li>
                                            </ul>
                                        </li>
                                    </ul>
                                    {/*<div className="sidebar-widget price-widget">
                                        <h3>Price Filter</h3>
                                        <div className="price-slider-container">
                                            <div id="slider-range"></div>
                                            <div className="price_slider_amount">
                                                <div className="slider-values">
                                                    <input type="text" id="amount" name="price"  placeholder="Add Your Price" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="sidebar-widget">
                                        <h3>Color</h3>
                                        <div className="sidebar-widget-option-wrapper">
                                            <div className="sidebar-widget-option">
                                                <input type="checkbox" id="black"/>
                                                <label htmlFor="black">Black <span>(4)</span></label>
                                            </div>
                                            <div className="sidebar-widget-option">
                                                <input type="checkbox" id="blue"/>
                                                    <label htmlFor="blue">Blue <span>(3)</span></label>
                                            </div>
                                            <div className="sidebar-widget-option">
                                                <input type="checkbox" id="brown"/>
                                                    <label htmlFor="brown">Brown <span>(3)</span></label>
                                            </div>
                                            <div className="sidebar-widget-option">
                                                <input type="checkbox" id="white"/>
                                                    <label htmlFor="white">White <span>(3)</span></label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="sidebar-widget">
                                        <h3>Manufacturer</h3>
                                        <div className="sidebar-widget-option-wrapper">
                                            <div className="sidebar-widget-option">
                                                <input type="checkbox" id="dior"/>
                                                    <label htmlFor="dior">Christian Dior <span>(6)</span></label>
                                            </div>
                                            <div className="sidebar-widget-option">
                                                <input type="checkbox" id="ferragamo"/>
                                                    <label htmlFor="ferragamo">ferragamo <span>(7)</span></label>
                                            </div>
                                            <div className="sidebar-widget-option">
                                                <input type="checkbox" id="hermes"/>
                                                    <label htmlFor="hermes">hermes <span>(8)</span></label>
                                            </div>
                                            <div className="sidebar-widget-option">
                                                <input type="checkbox" id="louis"/>
                                                <label htmlFor="louis">louis vuitton <span>(6)</span></label>
                                            </div>
                                        </div>
                                    </div>*/}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/*<!-- Shop Area End -->*/}

                {/*<!-- QUICKVIEW PRODUCT -->*/}
                <div className="modal fade" id="showDishDetail" tabIndex="-1" role="dialog">
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
                <div className="modal fade" id="createDish" tabIndex="-1" role="dialog">
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
                                            <h2>Create Dish</h2>
                                        </div>
                                        <div className="dishDetailTextBlock">
                                            <form onSubmit={handleCreateDish}>
                                                <div className="form-box">
                                                    <h4 className="mt-3">Basic Information</h4>
                                                    <div className="form-row">
                                                        <div className="col">
                                                            <input type="text" className="form-control" placeholder="Dish Name" name="dishName"/>
                                                        </div>
                                                        <div className="col">
                                                            <input type="number" steps="1" className="form-control" placeholder="Cooking Time" name="cookingTime"/>
                                                        </div>
                                                    </div>
                                                    <h4 className="mt-3">Tags</h4>
                                                    <div className="row">
                                                        <div className="form-group col-md-6">
                                                            <label htmlFor="createDishEasy">Easy or not</label>
                                                            <select id="createDishEasy"
                                                                    className="form-control">
                                                                <option>true</option>
                                                                <option>false</option>
                                                            </select>
                                                        </div>
                                                        <div className="form-group col-md-6">
                                                            <label htmlFor="createDishType">Dish Type</label>
                                                            <select id="createDishType"
                                                                    className="form-control">
                                                                {tag['dishType']?tag['dishType'].map((object, i)=>{
                                                                    return(<option key={i}>{object}</option>)
                                                                    }) : ''
                                                                }
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="form-group col-md-6">
                                                            <label htmlFor="createDishFestival">Festival</label>
                                                            <select id="createDishFestival"
                                                                    className="form-control">
                                                                {tag['festival']? tag['festival'].map((object, i)=>{
                                                                    return(<option key={i}>{object}</option>)
                                                                }) : ''}
                                                            </select>
                                                        </div>
                                                        <div className="form-group col-md-6">
                                                            <label htmlFor="createDishTarget">Target People</label>
                                                            <select id="createDishTarget"
                                                                    className="form-control">
                                                                {tag['targetPeople']? tag['targetPeople'].map((object, i)=>{
                                                                    return(<option key={i}>{object}</option>)
                                                                }) : ''}
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="form-group col-md-6">
                                                            <label htmlFor="createDishTaste">Taste</label>
                                                            <select id="createDishTaste"
                                                                    className="form-control">
                                                                {tag['taste']? tag['taste'].map((object, i)=>{
                                                                    return(<option key={i}>{object}</option>)
                                                                }) : ''}
                                                            </select>
                                                        </div>
                                                        <div className="form-group col-md-6">
                                                            <label htmlFor="createDishRegion">Region</label>
                                                            <select id="createDishRegion"
                                                                    className="form-control">
                                                                {tag['region']? tag['region'].map((object, i)=>{
                                                                    return(<option key={i}>{object}</option>)
                                                                }) : ''}
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <h4 className="mt-3">Ingredients</h4>
                                                    <p>Please divide each ingredient using '###' symbol</p>
                                                    <div className="form-group">
                                                        <label className="sr-only" htmlFor="sugar-input">Ingredients</label>
                                                        <input type="text" className="form-control" placeholder="Ingredients" name="ingredients"/>
                                                    </div>
                                                    <h4 className="mt-3">Nutrition</h4>
                                                    <div className="form-row align-items-center">
                                                        <div className="col-sm-6 my-1">
                                                            <label className="sr-only" htmlFor="sugar-input">Sugar</label>
                                                            <div className="input-group">
                                                                <input type="number" step="1" className="form-control" id="sugar-input" placeholder="Sugar"/>
                                                            </div>
                                                        </div>
                                                        <div className="col-sm-6 my-1">
                                                            <label className="sr-only" htmlFor="cholesterol-input">Cholesterol</label>
                                                            <div className="input-group">
                                                                <input type="number" step="1" className="form-control" id="cholesterol-input" placeholder="Cholesterol(unit)"/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="form-row align-items-center">
                                                        <div className="col-sm-6 my-1">
                                                            <label className="sr-only" htmlFor="fat-input">Fat</label>
                                                            <div className="input-group">
                                                                <input type="number" step="1" className="form-control" id="fat-input" placeholder="Fat(unit)"/>
                                                            </div>
                                                        </div>
                                                        <div className="col-sm-6 my-1">
                                                            <label className="sr-only" htmlFor="protein-input">Protein</label>
                                                            <div className="input-group">
                                                                <input type="number" step="1" className="form-control" id="protein-input" placeholder="Protein(unit)"/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="form-row align-items-center">
                                                        <div className="col-sm-6 my-1">
                                                            <label className="sr-only" htmlFor="safat-input">Saturated Fat</label>
                                                            <div className="input-group">
                                                                <input type="number" step="1" className="form-control" id="safat-input" placeholder="Saturated Fat(unit)"/>
                                                            </div>
                                                        </div>
                                                        <div className="col-sm-6 my-1">
                                                            <label className="sr-only" htmlFor="sodium-input">Sodium</label>
                                                            <div className="input-group">
                                                                <input type="number" step="1" className="form-control" id="sodium-input" placeholder="Sodium(unit)"/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="form-row align-items-center">
                                                        <div className="col-sm-6 my-1">
                                                            <label className="sr-only" htmlFor="calories-input">Calories</label>
                                                            <div className="input-group">
                                                                <input type="number" step="1" className="form-control" id="calories-input" placeholder="Calories(unit)"/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <h4 className="mt-3">Description</h4>
                                                <div className="form-group">
                                                    <textarea className="form-control" id="createDishDescription" rows="3"/>
                                                </div>
                                                <h4 className="mt-3">Steps</h4>
                                                <p>Please divide each steps using '###' symbol</p>
                                                <div className="form-group">
                                                    <textarea className="form-control" id="createDishSteps" rows="3"/>
                                                </div>
                                                <button type="submit" className="btn btn-sm nav-post-btn">Create</button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal fade" id="productModal" tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">
                                <i className="fa fa-times"/>
                                </span>
                            </button>
                            <div className="quick-view-container">
                                <div className="column-left">
                                    <div className="tab-content product-details-large" id="myTabContent">
                                        <div className="tab-pane fade show active" id="single-slide1" role="tabpanel" aria-labelledby="single-slide-tab-1">
                                            <div className="single-product-img">
                                                <img src="../assets/img/product/1.jpg" alt=""/>
                                            </div>
                                        </div>
                                        <div className="tab-pane fade" id="single-slide2" role="tabpanel" aria-labelledby="single-slide-tab-2">
                                            <div className="single-product-img">
                                                <img src="../assets/img/product/2.jpg" alt=""/>
                                            </div>
                                        </div>
                                        <div className="tab-pane fade" id="single-slide3" role="tabpanel" aria-labelledby="single-slide-tab-3">
                                            <div className="single-product-img">
                                                <img src="../assets/img/product/3.jpg" alt=""/>
                                            </div>
                                        </div>
                                        <div className="tab-pane fade" id="single-slide4" role="tabpanel" aria-labelledby="single-slide-tab-4">
                                            <div className="single-product-img">
                                                <img src="../assets/img/product/4.jpg" alt=""/>
                                            </div>
                                        </div>
                                        <div className="tab-pane fade" id="single-slide5" role="tabpanel" aria-labelledby="single-slide-tab-5">
                                            <div className="single-product-img">
                                                <img src="../assets/img/product/5.jpg" alt=""/>
                                            </div>
                                        </div>
                                        <div className="tab-pane fade" id="single-slide6" role="tabpanel" aria-labelledby="single-slide-tab-6">
                                            <div className="single-product-img" />
                                                <img src="../assets/img/product/6.jpg" alt=""/>
                                            </div>
                                    </div>
                                    <div className="single-product-menu">
                                        <div className="nav single-slide-menu" role="tablist">
                                            <div className="single-tab-menu">
                                                <a className="active" data-toggle="tab" id="single-slide-tab-1" href="#single-slide1">
                                                    <img src="../assets/img/product/1.jpg" alt=""/>
                                                </a>
                                            </div>
                                            <div className="single-tab-menu">
                                                <a data-toggle="tab" id="single-slide-tab-2" href="#single-slide2">
                                                    <img src="../assets/img/product/2.jpg" alt=""/>
                                                </a>
                                            </div>
                                            <div className="single-tab-menu">
                                                <a data-toggle="tab" id="single-slide-tab-3" href="#single-slide3">
                                                    <img src="../assets/img/product/3.jpg" alt=""/>
                                                </a>
                                            </div>
                                            <div className="single-tab-menu">
                                                <a data-toggle="tab" id="single-slide-tab-4" href="#single-slide4">
                                                    <img src="../assets/img/product/4.jpg" alt=""/>
                                                </a>
                                            </div>
                                            <div className="single-tab-menu">
                                                <a data-toggle="tab" id="single-slide-tab-5" href="#single-slide5">
                                                    <img src="../assets/img/product/5.jpg" alt=""/>
                                                </a>
                                            </div>
                                            <div className="single-tab-menu">
                                                <a data-toggle="tab" id="single-slide-tab-6" href="#single-slide6">
                                                    <img src="../assets/img/product/6.jpg" alt=""/>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="column-right">
                                    <div className="quick-view-text">
                                        <h2>Curabitur a purus</h2>
                                        <h3 className="q-product-price">$34.00<span className="old-price">$37.00</span></h3>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco,Proin lectus ipsum, gravida et mattis vulputate, tristique ut lectus</p>
                                        <div className="input-cart">
                                            <input value="1" type="number"/>
                                            <button className="default-btn">Add to cart</button>
                                        </div>
                                        <div className="share-product">
                                            <h4>Share this product</h4>
                                            <div className="social-link">
                                                <a href="#" target="_blank" className="facebook">
                                                    <i className="fa fa-facebook"/>
                                                </a>
                                                <a href="#" target="_blank" className="twitter">
                                                    <i className="fa fa-twitter"/>
                                                </a>
                                                <a href="#" target="_blank" className="pinterest">
                                                    <i className="fa fa-pinterest"/>
                                                </a>
                                                <a href="#" target="_blank" className="google">
                                                    <i className="fa fa-google-plus"/>
                                                </a>
                                                <a href="#" target="_blank" className="linkedin">
                                                    <i className="fa fa-linkedin"/>
                                                </a>
                                            </div>
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