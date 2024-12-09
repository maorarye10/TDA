export const header = () => {
    let lastScrollTop = 0;
    let isLastScrollUp = false;
    let isHeaderIntersecting = true;
    const header = document.querySelector(".header");

    const observer = new IntersectionObserver(enteries => {
        enteries.forEach((elem) => {
            if(!elem.isIntersecting){
                header.classList.add("sticky");
            }
            isHeaderIntersecting = elem.isIntersecting;
            //console.log(`is header intersecting: ${isHeaderIntersecting}`);
        });
    });
    observer.observe(header);
    
    // element should be replaced with the actual target element on which you have applied scroll, use window in case of no target element.
    window.addEventListener("scroll", function(){ // or window.addEventListener("scroll"....
        let st = window.pageYOffset || document.documentElement.scrollTop; // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"
        if (!isLastScrollUp && st < lastScrollTop) {
            // upscroll code
            isLastScrollUp = true;
            header.classList.remove("hide-from-view");
            header.classList.add("bring-to-view");
        }
        else if( st > lastScrollTop) {
            isLastScrollUp = false
            if (st > header.offsetHeight + 5){
                header.classList.add("hide-from-view");
            }
            header.classList.remove("bring-to-view");
        }
            
        if (st <= header.offsetHeight){
            header.classList.remove("sticky");
            header.classList.remove("bring-to-view");
            header.classList.remove("hide-from-view");
        }
        lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
    }, false);
}