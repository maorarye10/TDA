export const reviews = () => {
    const reviewsNavPoints = document.querySelectorAll('.reviews__list-nav > li');
    const reviesVids = document.querySelectorAll('.reviews__video');
    let lastElementIndex = 0;

    const mobileVidsObserver = new IntersectionObserver (enteries => {
        enteries.forEach((element) => {
            if (element.isIntersecting){
                reviesVids[lastElementIndex].pause();
                const elemIndex = parseInt(element.target.id);
                reviewsNavPoints[lastElementIndex].classList.remove("selected");
                reviewsNavPoints[elemIndex].classList.add("selected");
                lastElementIndex = elemIndex;
            }
        });
    });

    reviesVids.forEach(elem => mobileVidsObserver.observe(elem));
}