
import Swiper from 'swiper';
const menuButton=document.querySelector('.header__button');
const mobileMenu=document.querySelector('.header__menu');

menuButton.addEventListener('click',()=>{
	menuButton.classList.toggle('header__button-active');
	mobileMenu.classList.toggle('header__menu-active');
})


// import Swiper styles



const swiper=new Swiper('.swiper',{
	// Optional parameters
	slidesPerView: 7,
	loop: true,


});


//# sourceMappingURL=main.js.map
