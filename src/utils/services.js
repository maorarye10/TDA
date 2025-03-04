export const services = () => {
    const servicesNavPoints = document.querySelectorAll('.services__list-nav > li');
    const serviceDDL = document.querySelector(".contact__select");
    const contactSection = document.querySelector('.contact');
    const cardsSection = document.querySelector('.services__list');
    const title = document.querySelector('.services__title');
    const servicesCards =  document.querySelectorAll('.services__card');
    const cardPlaceholders = document.querySelectorAll('.services__item-placeholder');
    let lastElementIndex = NaN;

    const cardsObserver = new IntersectionObserver(entries => {
        entries.forEach((elem) => {
            if (elem.isIntersecting) {
                let currElementIndex = parseInt(elem.target.id);
                if (isNaN(lastElementIndex) && currElementIndex === -1){
                    currElementIndex = 0;
                    servicesNavPoints[currElementIndex].classList.add('selected');
                }
                else if (currElementIndex > lastElementIndex) {
                    currElementIndex--;
                    servicesNavPoints[lastElementIndex].classList.remove('selected');
                    servicesNavPoints[currElementIndex].classList.add('selected');
                }
                else if (currElementIndex < lastElementIndex) {
                    currElementIndex++;
                    servicesNavPoints[lastElementIndex].classList.remove('selected');
                    servicesNavPoints[currElementIndex].classList.add('selected');
                }
                lastElementIndex = currElementIndex;
            }
        });
    });

    const sectionObserver = new IntersectionObserver(entries => {
        entries.forEach((elem) => {
            if (elem.isIntersecting) {
                title.classList.add("services__show");
                servicesCards.forEach((card) => {
                    const style = window.getComputedStyle(card);
                    const transitionDelay = parseFloat(style.transitionDelay);
                    const delayInMs = transitionDelay * 1000;
                    card.style.removeProperty("transition-delay");

                    if (delayInMs === 0){
                        card.classList.add("services__show");
                    }
                    else {
                        setTimeout(() => {
                            card.classList.add("services__show");
                        }, delayInMs);
                    }
                });
            }
        });
    });
                

    const onBtnClick = (serviceValue) => {
        event.preventDefault();
        serviceDDL.value = serviceValue;
        const changeEvent = new Event('change');
        serviceDDL.dispatchEvent(changeEvent);
        contactSection.scrollIntoView({behavior: "smooth", block: "center"});
    }
    
    //document.querySelectorAll('.services__item-placeholder,.services__card').forEach(elem => cardsObserver.observe(elem));
    servicesCards.forEach(card => cardsObserver.observe(card));
    cardPlaceholders.forEach(placeholder => cardsObserver.observe(placeholder));
    document.querySelectorAll('.services__card-btn').forEach(card => card.addEventListener("click", () => onBtnClick(card.dataset.value)));
    sectionObserver.observe(cardsSection);
}