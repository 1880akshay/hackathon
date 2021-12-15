import React, { Component } from 'react';
import Navbar from '../components/navbar';
import SectionHeading from '../components/sectionHeading';
import $ from 'jquery';

class HomePage extends Component {

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
  
    render() {
      return (
        <div>
            {/*  Navigation */}
            <Navbar />
            {/*  Masthead */}
            <header className="masthead">
                <div className="container px-4 px-lg-5 h-100">
                    <div className="row h-100 align-items-center justify-content-center text-center">
                        <div className="col-lg-8 align-self-center">
                            <h1 className="text-white font-weight-800">IIT Kharagpur</h1>
                        </div>
                    </div>
                </div>
            </header>
            {/*  About */}
            <section className="py-4 bg-light">
                <div className="px-4 container-fluid">
                    <div className="row">
                        <div className="col-md-8">
                            <SectionHeading heading="News Bulletin" />
                        </div>
                        <div className="col-md-4">
                            <SectionHeading heading="Recent Events" />
                        </div>
                    </div>
                </div>
            </section>
        </div>
      );
    }
  }
  
  export default HomePage;