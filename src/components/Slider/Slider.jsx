import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './Slider.css'

const SliderComponent = () => {
    const settings = {
        dots: false,
        arrows: false,
        infinite: true,
        speed: 1500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
    }

    return (
        <div className="clients" id='about'>
            <Slider {...settings} className='logo'>
                <div className="carousel-slide">
                    <img src='https://www.vestius.com/wp-content/uploads/2019/05/Herengracht-Advocaten-Vestius-Logo-NL-Mobiel-1.png' alt='Client' />
                </div>
                {/* <div className="carousel-slide">
                    <img src='https://cdn-ilbgkin.nitrocdn.com/llLFyYPIOlxcxFglDtNJCqPfskKRdpnS/assets/images/source/rev-1d752b7/axis.lawyer/wp-content/uploads/2024/06/Axis-Solicitors-Logo.svg' alt='Client' />
                </div> */}
                <div className="carousel-slide">
                    <img src='https://www.irwinmitchell.com/images/im-logo.svg' alt='Client' />
                </div>
                <div className="carousel-slide">
                    <img src='https://www.kuits.com/wp-content/themes/inspired-kuits/assets/img/logo/logo.svg' alt='Client' />
                </div>
            </Slider>
        </div>
    )
}

export default SliderComponent;