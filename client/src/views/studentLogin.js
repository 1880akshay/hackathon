import React, { Component } from "react";
import Navbar from "../components/navbar";
import $ from 'jquery';
import SectionHeading from "../components/sectionHeading";
import EmailValidityTooltip from "../components/emailValidityTooltip";
import { toast } from "react-toastify";
import OtpInput from 'react-otp-input';
import { Navigate } from "react-router";

class StudentLogin extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tooltipType: '',
            emailInput: '',
            email: '',
            hash: {},
            otp: '',
            otpSent: false,

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
            emailInput: e.target.value
        });
        const regex = new RegExp('^([a-z\\d\\._-]+)@(kgpian\\.)?(iitkgp\\.ac\\.in)$');
        regex.test(e.target.value) ? this.setState({tooltipType: 'success'}) : this.setState({tooltipType: 'error'});
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        if(this.state.tooltipType !== 'success') {
            toast.error('Invalid institute email id');
            return;
        }
        this.setState((prevState) => ({email: prevState.emailInput}));
        $('.login-submit-btn').html(`<span class="fa fa-spinner fa-pulse fa-lg"></span>`);
        $('.login-submit-btn').prop('disabled', true);
        // API call
        try {
            const response = await fetch(
                '/api/auth/sendOTP',
                {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        role: 'student',
                        email: this.state.emailInput
                    })
                } 
            );
            const data = await response.json();
            // console.log(response);
            // console.log(data);
            $('.login-submit-btn').prop('disabled', false);
            if(response.status === 200) {
                this.setState({otpSent: true, hash: data.hash});
                toast.success(data.message);
            }
            else {
                $('.login-submit-btn').html('Send OTP');
                this.setState({email: ''});
                toast.error(data.message);
            }
        } catch(err) {
            console.log(err);
            $('.login-submit-btn').prop('disabled', false);
            $('.login-submit-btn').html('Send OTP');
            this.setState({email: ''});
            toast.error('An error occurred');
        }
        this.setState({
            tooltipType: '',
            emailInput: ''
        });
    }

    handleFinalSubmit = async (e) => {
        e.preventDefault();
        if(this.state.otp.length !== 6) {
            toast.error('OTP must contain 6 digits');
            return;
        }
        $('.login-submit-btn').html(`<span class="fa fa-spinner fa-pulse fa-lg"></span>`);
        $('.login-submit-btn').prop('disabled', true);
        // API call
        try {
            const response = await fetch(
                '/api/auth/studentLogin',
                {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        role: 'student',
                        email: this.state.email,
                        otp: this.state.otp,
                        hash: this.state.hash
                    })
                }
            );
            const data = await response.json();
            this.setState({email: '', hash: {}, otp: ''});
            if(response.status === 200) {
                // console.log(data.accessToken);
                // this.props.history.push({
                //     pathname: '/student-profile',
                //     state: {accessToken: data.accessToken}
                // });
                this.setState({loggedIn: true});
                toast.success(data.message);
            }
            else {
                this.setState({otpSent: false});
                toast.error(data.message);
            }
        } catch(err) {
            console.log(err);
            this.setState({email: '', hash: {}, otp: '', otpSent: false});
            toast.error('An error occurred');
        }
    }

    render() {
        return(
            (this.state.loggedIn) ? <Navigate to="/student-profile" replace /> :
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
                                            <SectionHeading heading="Student Login" />
                                        </div>
                                        {(!this.state.otpSent) ?
                                        <form noValidate autoComplete="off" onSubmit={this.handleSubmit}>                                            
                                            <div style={{position: 'relative'}}>
                                                <input placeholder="Enter your email" className="login-input-field mb-3" value={this.state.emailInput} onChange={this.handleEmailChange} />                                            
                                                <span className="fa fa-envelope login-prefix-icon"></span>
                                                <EmailValidityTooltip type={this.state.tooltipType} />
                                            </div>
                                            <button type="submit" className="login-submit-btn mt-1">Send OTP</button>
                                        </form> :
                                        <>
                                            <div className="otp-helper-text">
                                                Enter the OTP sent to <b>{this.state.email}</b> below:
                                            </div>
                                            <form noValidate autoComplete="off" onSubmit={this.handleFinalSubmit}>
                                                <OtpInput
                                                    numInputs={6}
                                                    isInputNum
                                                    inputStyle="otp-input-box"
                                                    containerStyle="otp-input-container mb-3"
                                                    value={this.state.otp}
                                                    onChange={(otp) => {this.setState({otp});}}
                                                />
                                                <button type="submit" className="login-submit-btn mt-1">Login</button>
                                            </form>
                                        </>}
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

export default StudentLogin;