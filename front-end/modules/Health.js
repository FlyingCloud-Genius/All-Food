import React, {Component} from 'react'
import axios from "axios/index";

export default class Health extends Component {

    constructor(props) {
        super(props);

        this.state = {
            tag: {},
            url: 'http://10.21.38.20:5000',
            str: ''
        };

        this.fetchData = this.fetchData.bind(this);

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
        this.fetchData()
    }

    fetchData(){
        let url = this.state.url;
        axios.get(url+'/tag').then((response) => {
            console.log(response);
            this.setState({
                tag: response.data.data
            }, ()=>{
                let tag = this.state.tag;
                if(Object.keys(tag).length !== 0){
                    let str = '';
                    Object.keys(tag).map((key, j)=>{
                        tag[key].map((object, i)=> {
                            str = str +
                                `<div>
                                    <h3>`+key+`</h3>
                                    <ul class="sidebar-widget-tag">
                                        <li><a>`+object+`</a></li>
                                    </ul>
                                </div>`
                        })
                    });
                    this.setState({
                        str: str
                    })
                }
            })
        }).catch((error)=>{
            console.log(error);
        })
    }

    render() {
        const tag = this.state.tag;
        let str = this.state.str;

        return (
            <div>
                {/*<!-- Breadcrumb Area Start -->*/}
                <div className="breadcrumb-area bg-health text-center">
                    <div className="container">
                        <h1>Health</h1>
                        <nav aria-label="breadcrumb">
                            <ul className="breadcrumb">
                                <li className="breadcrumb-item active">Health</li>
                            </ul>
                        </nav>
                    </div>
                </div>
                {/*<!-- Breadcrumb Area End -->*/}
                {/*<!-- Post Area Start -->*/}
                <div className="post-area blog-area pt-110 pb-95 post-details">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="single-post-item text-center pb-70">
                                    <h3 className="single-post-title"><a>All tags</a>
                                    </h3>
                                    <div className="single-post-meta">
                                        <span> Posts by : admin</span>
                                        <span>December 21, 2019</span>
                                    </div>
                                    <div className="single-post-info-text text-left">
                                        <div className="sidebar-wrapper">
                                            <div className="sidebar-widget">
                                                {Object.keys(tag).map((key, j)=>{
                                                    return(
                                                        <div className="mt-3" key={j}>
                                                            <h3>{key}</h3>
                                                            <ul className="sidebar-widget-tag">
                                                            {tag[key].map((object, i)=> {
                                                                return(<li key={i}><a>{object}</a></li>)
                                                            })}
                                                            </ul>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/*<!-- Post Area End -->*/}
            </div>
        )
    }
}
