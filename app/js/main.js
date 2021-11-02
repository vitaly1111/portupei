
import Swiper ,{Autoplay} from 'swiper';
import { smoothScroll } from './smoothScroll';
import {modal} from './modal'
import {tabs} from './tabs'
const menuButton=document.querySelector('.header__button');

const mobileMenu=document.querySelector('.header__menu');

Swiper.use([Autoplay]);

menuButton.addEventListener('click',()=>{
	menuButton.classList.toggle('header__button-active');
	mobileMenu.classList.toggle('header__menu-active');
})


// import Swiper styles



const swiper=new Swiper('.swiper',{
	// Optional parameters
	slidesPerView: 7,
	loop: true,
	centeredSlides: true,
	autoplay: true,
	speed:4000,
	allowTouchMove: false,
	autoplay: {
		delay: 0,
		disableOnInteraction: false,
	},
	breakpoints: {
		// when window width is >= 320px
		320: {
			slidesPerView: 2,
			
		},
		// when window width is >= 480px
		480: {
			slidesPerView: 3,
			
		},
		// when window width is >= 640px
		640: {
			slidesPerView: 4,
			
		},
		988:{
			slidesPerView: 5,
		}
	}

});

smoothScroll();
tabs();
modal();


//# sourceMappingURL=main.js.map
