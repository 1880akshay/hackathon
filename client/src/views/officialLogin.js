import React, { Component } from "react";
import Navbar from "../components/navbar";
import $ from 'jquery';
import SectionHeading from "../components/sectionHeading";
import EmailValidityTooltip from "../components/emailValidityTooltip";
import { toast } from "react-toastify";
import { Navigate } from "react-router";

class OfficialLogin extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tooltipType: '',
            email: '',
            password: '',
            role: '',

            loggedIn: false
        }
    }

    componentDidMount() {
        if(window.innerWidth < 768) {
            $('nav.navbar.fixed-top').addClass('solid-nav');
            $('nav.navbar.fixed-top').removeClass('transparent-nav');
        }
        else window.addEventListener('scroll', this.navScroll);
    }
  
    componentWillUnmount() {
        window.removeEventListener('scroll', this.navScroll);
    }
  
    navScroll = () => {
      var scroll = $(window).scrollTop();
        if (scroll > 50) {
            $('nav.navbar.fixed-top').addClass('solid-nav');
            $('nav.navbar.fixed-top').removeClass('transparent-nav');
        }
        else{
            $('nav.navbar.fixed-top').removeClass('solid-nav');	
            $('nav.navbar.fixed-top').addClass('transparent-nav');
        }
    }

    handleEmailChange = (e) => {
        this.setState({
            email: e.target.value
        });
        const regex = new RegExp('^([a-z\\d\\._-]+)@(kgpian\\.)?(iitkgp\\.ac\\.in)$');
        regex.test(e.target.value) ? this.setState({tooltipType: 'success'}) : this.setState({tooltipType: 'error'});
    }

    handlePasswordChange = (e) => {
        this.setState({
            password: e.target.value
        });
    }

    handleRoleChange = (e) => {
        this.setState({
            role: e.target.value
        });
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        // valid email
        if(this.state.tooltipType !== 'success') {
            toast.error('Invalid institute email id');
            return;
        }
        // non empty password
        if(this.state.password === '') {
            toast.error('Password cannot be empty');
            return;
        }
        // non empty role
        if(this.state.role === '') {
            toast.error('Please select a role');
            return;
        }

        $('.login-submit-btn').html(`<span class="fa fa-spinner fa-pulse fa-lg"></span>`);
        $('.login-submit-btn').prop('disabled', true);
        try {
            const response = await fetch(
                '/api/auth/officialLogin',
                {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        email: this.state.email,
                        role: this.state.role,
                        password: this.state.password
                    })
                } 
            );
            const data = await response.json();
            this.setState({email: '', tooltipType: '', password: '', role: ''});
            $('.login-submit-btn').prop('disabled', false);
            $('.login-submit-btn').html('Login');
            if(response.status === 200) {
                this.setState({loggedIn: true});
                toast.success(data.message);
            }
            else {
                toast.error(data.message);
            }
        } catch(err) {
            console.log(err);
            $('.login-submit-btn').prop('disabled', false);
            $('.login-submit-btn').html('Login');
            this.setState({email: '', tooltipType: '', password: '', role: ''});
            toast.error('An error occurred');
        }
        
    }

    togglePasswordVisibility = () => {
        if($('#password-toggler').hasClass('fa-eye')) {
            $('#password-toggler').removeClass('fa-eye');
            $('#password-toggler').addClass('fa-eye-slash');
            $('#password-input').prop('type', 'text');
        }
        else {
            $('#password-toggler').removeClass('fa-eye-slash');
            $('#password-toggler').addClass('fa-eye');
            $('#password-input').prop('type', 'password');
        }
    }

    render() {
        return(
            (this.state.loggedIn) ? <Navigate to="/official-profile" replace /> :
            <div>
                {/*  Navigation */}
                <Navbar />
                {/*  Masthead */}
                <header className="masthead">
                    <div className="d-flex flex-column justify-content-center align-items-center pt-5">
                        <div className="container pt-5">
                            <div className="row justify-content-center pt-5 mt-md-5">
                                <div className="col-lg-5 col-md-7 col-sm-10">
                                    <div className="login-wrapper">
                                        <div className="text-center">
                                            <span className="fa fa-user-circle-o text-primary-color mb-2" style={{fontSize: '3rem'}}></span>
                                        </div>
                                        <div className="d-flex justify-content-center mb-2">
                                            <SectionHeading heading="Official Login" />
                                        </div>
                                        <form noValidate autoComplete="off" onSubmit={this.handleSubmit}>                                            
                                            <div style={{position: 'relative'}}>
                                                <input placeholder="Enter your email" className="login-input-field mb-3" value={this.state.email} onChange={this.handleEmailChange} />                                            
                                                <span className="fa fa-envelope login-prefix-icon"></span>
                                                <EmailValidityTooltip type={this.state.tooltipType} />
                                            </div>
                                            <div style={{position: 'relative'}}>
                                                <input placeholder="Enter your password" className="login-input-field mb-3" id="password-input" type="password" value={this.state.password} onChange={this.handlePasswordChange} />
                                                <span className="fa fa-lock login-prefix-icon"></span>
                                                <span className="fa fa-eye login-suffix-icon" id="password-toggler" onClick={this.togglePasswordVisibility}></span>
                                            </div>
                                            <div style={{position: 'relative'}}>
                                                <select className="login-input-field mb-3" value={this.state.role} onChange={this.handleRoleChange}>
                                                    <option disabled value="">Select Role</option>
                                                    <option value="admin">Admin</option>
                                                    <option value="tsg_office_bearer">TSG Office Bearer</option>
                                                    <option value="governor">Society Governor</option>
                                                </select>
                                                <span className="fa fa-user login-prefix-icon"></span>
                                                <span className="fa fa-caret-down login-suffix-icon"></span>
                                            </div>
                                            <button type="submit" className="login-submit-btn mt-1">Login</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
            </div>
        );
    }
}

export default OfficialLogin;