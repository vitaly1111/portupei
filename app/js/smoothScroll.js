export function smoothScroll() {
	const linksHead=document.querySelectorAll('.header__menu-link');
	const linksHero=document.querySelectorAll('.hero__button')

	
	const newArray=[...linksHead, ...linksHero];

	newArray.forEach(link => {
		link.addEventListener('click',(e) => {
			e.preventDefault();
			const ID=e.target.getAttribute('href').substr(1);
			if (ID) {
				document.getElementById(ID).scrollIntoView({
					behavior: 'smooth',
					block: 'start'
				})
			}

			if (e.target.closest('.header__menu').classList.contains('header__menu-active')) {
				document.querySelector('.header__menu').classList.remove('header__menu-active')
				document.querySelector('.header__button').classList.remove('header__button-active')
			}
		})
	})
}