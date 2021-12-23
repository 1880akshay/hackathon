import React, { Component } from 'react';
import Navbar from '../components/navbar';
import SectionHeading from '../components/sectionHeading';
import $ from 'jquery';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import CountUp from 'react-countup';

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
                                <OwlCarousel className='owl-theme vertical-carousel' loop={true} margin={10} autoPlay={true} autoplayTimeout={1000} dots={false} nav>
                                    <div className='item'><h4>News 1</h4></div>
                                    <div className='item'><h4>News 2</h4></div>
                                    <div className='item'><h4>News 3</h4></div>
                                    <div className='item'><h4>News 4</h4></div>
                                    <div className='item'><h4>News 5</h4></div>
                                    <div className='item'><h4>News 6</h4></div>
                                </OwlCarousel>
                        </div>
                        <div className="col-md-4">
                            <SectionHeading heading="Recent Events" />
                            {/* <marquee direction="up" scrollamount={2}> */}
                                <div className="vertical-carousel-wrapper">
                                    <div className='event-card mb-2' style={{width: '100%', height: '100px', backgroundColor: 'grey'}}>
                                        <div className="date-holder">
                                            <div className="num font-weight-700" style={{fontSize: 'xx-large'}}>8</div>Dec
                                        </div>
                                    </div>
                                    <div className='event-card mb-2' style={{width: '100%', height: '100px', backgroundColor: 'grey'}}>
                                        <div className="date-holder">
                                            <div className="num font-weight-700" style={{fontSize: 'xx-large'}}>7</div>Dec
                                        </div>
                                    </div>
                                    <div className='event-card mb-2' style={{width: '100%', height: '100px', backgroundColor: 'grey'}}>
                                        <div className="date-holder">
                                            <div className="num font-weight-700" style={{fontSize: 'xx-large'}}>6</div>Dec
                                        </div>
                                    </div>
                                </div>
                            {/* </marquee> */}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md"><div className='numbers font-weight-800'>1951</div>Established</div>
                        <div className="col-md"><div className='numbers font-weight-800'><CountUp end={15000} duration={2} />+</div>Students</div>
                        <div className="col-md"><div className='numbers font-weight-800'><CountUp end={2000} duration={2} />+</div>Faculty</div>
                    </div>
                    
                </div>
            </section>
            <div className="w-100">
                <div className="container-fluid">
                    <div className="row" id="footer">
                        <div className="col-md-4 font-weight-800">Quick Links</div> 
                        <div className="col-md-4 font-weight-800">Contact Us</div> 
                        <div className="col-md-4 font-weight-800">Social Handles</div> 
                    </div>
                </div>
            </div>
            <div className="copyright" style={{textAlign: 'center', fontSize: 'medium'}}>
                &copy; 2021, Indian Institute of Technology Kharagpur
            </div>
        </div>
      );
    }
  }
  
  export default HomePage;