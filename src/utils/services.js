export const services = () => {
    const servicesNavPoints = document.querySelectorAll('.services__list-nav > li');
    const serviceDDL = document.querySelector(".contact__select");
    const contactSection = document.querySelector('.contact');
    let lastElementIndex = NaN;

    const observer = new IntersectionObserver(entries => {
        entries.forEach((elem) => {
            if (elem.isIntersecting) {
                /* console.log('Card Number ', index, 'Is Intersecting!')
                servicesNavPoints[index].classList.add('selected'); */
                /* console.log(elem.target.id); */
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

    const onBtnClick = (serviceValue) => {
        event.preventDefault();
        serviceDDL.value = serviceValue;
        const changeEvent = new Event('change');
        serviceDDL.dispatchEvent(changeEvent);
        contactSection.scrollIntoView({behavior: "smooth", block: "center"});
    }
    
    document.querySelectorAll('.services__item-placeholder,.services__card').forEach(elem => observer.observe(elem));
    document.querySelectorAll('.services__card-btn').forEach(card => card.addEventListener("click", () => onBtnClick(card.dataset.value)));
}