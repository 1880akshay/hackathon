import React, { Component } from 'react';
import Navbar from '../components/navbar';
import SectionHeading from '../components/sectionHeading';
import $ from 'jquery';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import Carousel from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';

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
                            <div className="row">
                                <OwlCarousel className='owl-theme' loop={true} margin={10} autoPlay={true} autoplayTimeout={1000} nav>
                                    <div className='item'><h4>News 1</h4></div>
                                    <div className='item'><h4>News 2</h4></div>
                                    <div className='item'><h4>News 3</h4></div>
                                    <div className='item'><h4>News 4</h4></div>
                                    <div className='item'><h4>News 5</h4></div>
                                    <div className='item'><h4>News 6</h4></div>
                                </OwlCarousel>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <SectionHeading heading="Recent Events" />
                            <marquee direction="up">
                                <div className="vertical-carousel-wrapper px-2">
                                    <div className='event-card mb-2' style={{width: '100%', height: '100px', backgroundColor: 'grey'}}>

                                    </div>
                                    <div className='event-card mb-2' style={{width: '100%', height: '100px', backgroundColor: 'grey'}}>

                                    </div>
                                    <div className='event-card mb-2' style={{width: '100%', height: '100px', backgroundColor: 'grey'}}>

                                    </div>
                                </div>
                            </marquee>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md"><div className='numbers font-weight-800'>1951</div>Established</div>
                        <div className="col-md"><div className='numbers font-weight-800'>x k+</div>Students</div>
                        <div className="col-md"><div className='numbers font-weight-800'>y k+</div>Faculty</div>
                    </div>
                    
                </div>
            </section>
            <div className="" id="footer">Contact Us</div>
        </div>
      );
    }
  }
  
  export default HomePage;