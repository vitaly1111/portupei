export function tabs() {
	const tabsHandlerElems=document.querySelectorAll('[data-tabs-handler]');
	const tabsContentElems=document.querySelectorAll('[data-tabs-field]');
	const linksHandlerElems=document.querySelectorAll('[data-links-handler]');

	const handlerElems=[...tabsHandlerElems,...linksHandlerElems]

	//design-list__item_active
	for (let btn of handlerElems) {
		btn.addEventListener('click',() => {
			tabsHandlerElems.forEach((item,i) => {

				item.classList.remove('catalog__handler-active');
				if (item.dataset.tabsHandler==btn.dataset.tabsHandler||item.dataset.tabsHandler==btn.dataset.linksHandler) {
					item.classList.add('catalog__handler-active');
				}

			})


			tabsContentElems.forEach(cont => {
				if (cont.dataset.tabsField===btn.dataset.tabsHandler||cont.dataset.tabsField===btn.dataset.linksHandler) {
					cont.classList.remove('tabs__field-visible')
				} else {
					cont.classList.add('tabs__field-visible')
				} 
			})

		})
	}
}