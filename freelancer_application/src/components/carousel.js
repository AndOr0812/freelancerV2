/*
// https://www.npmjs.com/package/react-responsive-carousel
/!*
var ReactDOM = require('react-dom');
*!/
var Carousel = require('react-responsive-carousel').Carousel;
import React, { Component } from 'react';
//import {Carousel} from 'react-responsive-carousel';

/!*var DemoCarousel = React.createClass({*!/
class DemoCarousel extends Component{
    render() {
        return (
            <Carousel showArrows={true} onChange={onChange} onClickItem={onClickItem} onClickThumb={onClickThumb}>
                <div>
                    <img src="../../style/freelancer.png" />
                    <p className="legend">Legend 1</p>
                </div>
                <div>
                    <img src="../../style/freelancer1.png" />
                    <p className="legend">Legend 2</p>
                </div>
                <div>
                    <img src="../../style/freelancer2.png" />
                    <p className="legend">Legend 3</p>
                </div>
            </Carousel>
        );
    }
}
/!*ReactDOM.render(<DemoCarousel />, document.querySelector('.demo-carousel'));*!/
export default DemoCarousel;
// Don't forget to include the css in your page
// <link rel="stylesheet" href="carousel.css"/>
// Begin DemoSliderControls*/


import React,{Component} from 'react';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';

export default class extends Component {
    render() {
        return (
            <CarouselProvider
                naturalSlideWidth={100}
                naturalSlideHeight={125}
                totalSlides={3}
            >
                <Slider>
                    <Slide index={0}>I am the first Slide.</Slide>
                    <Slide index={1}>I am the second Slide.</Slide>
                    <Slide index={2}>I am the third Slide.</Slide>
                </Slider>
                <ButtonBack>Back</ButtonBack>
                <ButtonNext>Next</ButtonNext>
            </CarouselProvider>
        );
    }
}