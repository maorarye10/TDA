export const reviews = () => {
    const reviewsNavPoints = document.querySelectorAll('.reviews__list-nav > li');
    const reviwesVidsMobile = document.querySelectorAll('.reviews__video');
    const reviwesVidsDesktop = document.querySelectorAll('.reviews__video-desktop');
    const navBtnLeft = document.querySelector('.reviews__nav-btn#' + CSS.escape('1'));
    const navBtnRight = document.querySelector('.reviews__nav-btn#' + CSS.escape('2'));
    let lastElementIndex = 0;

    const mobileVidsObserver = new IntersectionObserver (enteries => {
        enteries.forEach((element) => {
            if (element.isIntersecting){
                reviwesVidsMobile[lastElementIndex].pause();
                const elemIndex = parseInt(element.target.id);
                reviewsNavPoints[lastElementIndex].classList.remove("selected");
                reviewsNavPoints[elemIndex].classList.add("selected");
                lastElementIndex = elemIndex;
            }
        });
    });

    const onRightBtnClick = () => {
        reviwesVidsDesktop[lastElementIndex].pause();
        reviewsNavPoints[lastElementIndex].classList.remove("selected");
        lastElementIndex = lastElementIndex + 1 === reviwesVidsDesktop.length ? 0 : lastElementIndex + 1;
        reviewsNavPoints[lastElementIndex].classList.add("selected");
        reviwesVidsDesktop[lastElementIndex].scrollIntoView({behavior: "smooth", block: "center"});
    };

    const onLeftBtnClick = () => {
        reviwesVidsDesktop[lastElementIndex].pause();
        reviewsNavPoints[lastElementIndex].classList.remove("selected");
        lastElementIndex = lastElementIndex - 1 === -1 ? reviwesVidsDesktop.length - 1 : lastElementIndex - 1;
        reviewsNavPoints[lastElementIndex].classList.add("selected");
        reviwesVidsDesktop[lastElementIndex].scrollIntoView({behavior: "smooth", block: "center"});
    };

    navBtnRight.addEventListener("click", onRightBtnClick);
    navBtnLeft.addEventListener("click", onLeftBtnClick);
    reviwesVidsMobile.forEach(elem => mobileVidsObserver.observe(elem));
}