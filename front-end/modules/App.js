import React, {Component} from 'react'
import {render} from 'react-dom';
import { Link, IndexLink, hashHistory } from 'react-router'
import axios from 'axios';


export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            loginFail: 0,
            loginSuccess: 0,
            registerSuccess: 0,
            registerFail: 0,
            url: 'http://10.21.38.20:5000'
        }
        this.handleLogin = this.handleLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
        this.handleEnterMySpace = this.handleEnterMySpace.bind(this);
        this.handleRefreshCleanUp = this.handleRefreshCleanUp.bind(this);
    }

    componentDidMount(){
        window.addEventListener('beforeunload', this.handleRefreshCleanUp());
    }

    componentWillUnmount(){
        this.handleRefreshCleanUp;
        window.removeEventListener('beforeunload', this.handleRefreshCleanUp());
    }

    handleLogin(event){
        event.preventDefault();
        console.log(event);
        let userName = event.target[0].value;
        let pwd = event.target[1].value;
        let url = 'http://10.21.38.20:5000'
        axios.post(url+'/login',
            {
                userName: userName,
                password: pwd
            }).then((response) => {
                if(response.data.data.error){
                    this.setState({
                            loginFail: 1,
                            userName: ''
                        }, ()=>{setTimeout(()=>{
                            this.setState({
                                loginFail: 0
                            })}, 5000)}
                    )
                } else {
                    localStorage.jwtToken = response.data.data.token;
                    localStorage.userName = userName;
                    this.setState({
                        userName: userName,
                        loginSuccess: 1
                    }, ()=>{
                        setTimeout(()=>{
                            this.setState({loginSuccess: 0})
                        }, 5000)
                        document.getElementById("loginModalCloseBtn").click()
                    })
                }
            }).catch((error)=>{
              console.log(error);
            }
        );

    }

    handleLogout(){
        localStorage.jwtToken = 'undefined';
        localStorage.userName = 'undefined';
        this.setState({
            userName: ''
        })
        console.log('Successfully Log out!');
    }

    handleRegister(event){
        event.preventDefault();
        console.log(event);
        let userName = event.target[0].value;
        let pwd = event.target[1].value;
        let email = event.target[2].value;
        let age = event.target[3].value;
        let phone = event.target[4].value;
        let region = event.target[5].value;
        let height = event.target[6].value;
        let weight = event.target[7].value;
        let url = 'http://10.21.38.20:5000';
        axios.post(url+'/user',
        {
            userName: userName,
            password: pwd,
            age: age,
            eMail: email,
            phoneNumber: phone,
            region: region,
            height: height,
            weight: weight
        }).then((response) => {
            console.log(response);
            this.setState({
                registerSuccess: 1
            }, ()=>{
                setTimeout(()=>{
                    this.setState({registerSuccess: 0})
                }, 5000)
                document.getElementById("loginModalCloseBtn").click()
            })
        }).catch((error)=>{
                console.log(error);
            this.setState({
                    registerFail: 1,
                }, ()=>{setTimeout(()=>{
                    this.setState({
                        registerFail: 0
                    })}, 5000)}
            )
            }
        );
    }

    handleEnterMySpace(event){
        event.preventDefault();
        let jwt_token = localStorage.jwtToken;
        let userName = this.state.userName;
        let url = this.state.url;
        if(userName !== ''){
            {/*axios.get(url+'/user/' + userName,
                { headers: {"Authorization" : `JWT `+jwt_token}
            }).then((response) => {
                console.log(response)
            }).catch((error)=>
                {
                    console.log(error);
                }
            );*/}
            hashHistory.push('/MySpace');

        } else {
            window.alert('You need to login before going to your homepage!');
        }

    }

    handleRefreshCleanUp() {
        if(localStorage.userName !== 'undefined') {
            localStorage.userName = 'undefined';
            localStorage.jwtToken = 'undefined';
        }
    }

    render() {
        const userName = this.state.userName;
        const loginFail = this.state.loginFail;
        const handleLogout = this.handleLogout;
        const loginSuccess = this.state.loginSuccess;
        const registerSuccess = this.state.registerSuccess;
        const registerFail = this.state.registerFail;
        const handleRegister = this.handleRegister;
        const handleLogin = this.handleLogin;
        const handleEnterMySpace = this.handleEnterMySpace;

        return (
            <div>
                <header className="header-area header-sticky">
                    <div className="header-container">
                        <div className="row">
                            <div className="col-lg-5 display-none-md display-none-xs">
                                <div className="ht-main-menu">
                                    <nav>
                                        <ul>
                                            <li activeClassName="active">
                                                <IndexLink to="/">Home</IndexLink>
                                            </li>
                                            <li activeClassName="active">
                                                <Link to="/Dishes">Dishes
                                                    <i className="fa fa-angle-down"></i>
                                                </Link>
                                                <ul className="ht-mega-menu">
                                                    <li>
                                                        <ul>
                                                            <li className="mega-menu-title">Ingredients</li>
                                                            <li><Link to="/Dishes/1/1">Cheese</Link></li>
                                                            <li><Link to="/Dishes/1/2">Chicken</Link></li>
                                                            <li><Link to="/Dishes/1/3">Vegetables</Link></li>
                                                            <li><Link to="/Dishes/1/4">Fruits</Link></li>
                                                            <li><a><img src="assets/img/banner/menu-ingredient.jpg" alt=""/></a></li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <ul>
                                                            <li className="mega-menu-title">Type</li>
                                                            <li><Link to="/Dishes/2/1">Main Dish</Link></li>
                                                            <li><Link to="/Dishes/2/2">Desserts</Link></li>
                                                            <li><Link to="/Dishes/2/3">Soup and Stews</Link></li>
                                                            <li><Link to="/Dishes/2/4">Beverages</Link></li>
                                                            <li><a><img src="assets/img/banner/menu-type.jpg" alt=""/></a></li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <ul>
                                                            <li className="mega-menu-title">Region</li>
                                                            <li><Link to="/Dishes/3/1">Asian</Link></li>
                                                            <li><Link to="/Dishes/3/2">Chilean</Link></li>
                                                            <li><Link to="/Dishes/3/3">Italian</Link></li>
                                                            <li><Link to="/Dishes/3/4">Mexican</Link></li>
                                                            <li><a><img src="assets/img/banner/menu-region.jpg" alt=""/></a></li>
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li activeClassName="active"><Link to="/Menu">Menu</Link></li>
                                            <li activeClassName="active"><Link to="/Health">Health</Link></li>
                                            <li activeClassName="active"><Link to="/MySpace" onClick={handleEnterMySpace.bind(this)}>MySpace</Link></li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                            <div className="col-lg-2 col-sm-4">
                                {/*<div className="logo text-center">
                                    <IndexLink to="/"><img src="assets/img/logo/logo.png" alt="NatureCircle"/></IndexLink>
                                </div>*/}
                            </div>
                            <div className="col-lg-5 col-sm-8">
                                <div className="header-content d-flex justify-content-end">
                                    <div className="settings-wrapper">
                                        <a href="#"><i className="icon icon-Settings">
                                            <p className="ml-1 d-inline">{userName}</p></i>
                                        </a>
                                        <div className="settings-content">
                                            <h4>My Account</h4>
                                            <ul>
                                                {this.state.userName === ''? <li><a className="modal-view button" data-toggle="modal" data-target="#register_box">Register</a></li>:''}
                                                {this.state.userName === ''?
                                                    <li><a className="modal-view button" data-toggle="modal" data-target="#login_box">login</a></li>:
                                                    <li onClick={handleLogout.bind(this)}><a className="button" >Logout</a></li>

                                                }
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mobile-menu-area">
                        <div className="mobile-menu container">
                            <nav id="mobile-menu-active">
                                <ul className="menu-overflow">
                                    <li activeClassName="active">
                                        <IndexLink to="/">Home</IndexLink>
                                    </li>
                                    <li activeClassName="active">
                                        <Link to="/Dishes">Dishes
                                        </Link>
                                    </li>
                                    <li activeClassName="active"><Link to="/Menu">Menu</Link></li>
                                    <li activeClassName="active"><Link to="/Health">Health</Link></li>
                                    <li activeClassName="active"><Link to="/MySpace" onClick={handleEnterMySpace.bind(this)}>MySpace</Link></li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </header>

                {this.props.children}
                {/* Footer Area Start */}
                <footer className="footer-area">
                    {/* Footer Bottom Area Start */}
                    <div className="footer-bottom-area pt-15 pb-30">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-6 d-flex col-md-6">
                                    <div className="footer-text-bottom">
                                        <p>Copyright &copy; <a href="#">What 2 Eat</a>. All Rights Reserved</p>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-6">
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Footer Bottom Area End */}
                </footer>
                <div className="modal fade" id="login_box" tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button id="loginModalCloseBtn" type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true"><i className="fa fa-close"></i></span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="form-pop-up-content">
                                    <h2>Login to your account</h2>
                                    {loginSuccess === 0? '':<div className="alert alert-success" role="alert">Welcome, {userName}!</div>}
                                    {loginFail === 0? '':<div className="alert alert-danger" role="alert">Incorrect Username or Password!</div>}
                                    <form onSubmit={handleLogin}>
                                        <div className="form-box">
                                            <input type="text" placeholder="User Name" name="username"/>
                                            <input type="password" placeholder="Password" name="pass"/>
                                        </div>
                                        {/*<div className="checkobx-link">
                                                <div className="left-col">
                                                    <input type="checkbox" id="remember_me"/><label htmlFor="remember_me">Remember Me</label>
                                                </div>
                                                <div className="right-col"><a href="#">Forget Password?</a></div>
                                            </div>*/}
                                        <button type="submit">Sign In</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal fade" id="register_box" tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true"><i className="fa fa-close"></i></span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="form-pop-up-content">
                                    <h2>Sign Up</h2>
                                    {registerSuccess === 0? '':<div className="alert alert-success" role="alert">Register success, please log in!</div>}
                                    {registerFail === 0? '':<div className="alert alert-danger" role="alert">Name repeat, please change a name!</div>}
                                    <form onSubmit={handleRegister}>
                                        <div className="form-box">
                                            <input type="text" placeholder="User Name" name="username"/>
                                            <input type="password" placeholder="Password" name="password"/>
                                            <input type="email" placeholder="Email" name="email"/>
                                            <input type="number" step="1" placeholder="Age" name="age"/>
                                            <input type="text" placeholder="Phone Number" name="phone"/>
                                            <input type="text" placeholder="Region" name="region"/>
                                            <input type="number" step="1" placeholder="Height" name="height"/>
                                            <input type="number" step="1" placeholder="Weight" name="weight"/>
                                        </div>
                                        {/*<div className="checkobx-link">
                                                <div className="left-col">
                                                    <input type="checkbox" id="remember_reg"/><label htmlFor="remember_reg">Remember Me</label>
                                                </div>
                                            </div>*/}
                                        <button type="submit">Register</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                    {/* Footer Area End */}
            </div>
        )
    }
}
