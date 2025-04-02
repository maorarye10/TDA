export const iconBar = () => {
    const icons = document.querySelectorAll(".icon-bar__item");
    const iconsContainer = document.querySelector(".icon-bar__items");

    const observer = new IntersectionObserver(enteries =>  {
        enteries.forEach((entery) => {
            if (entery.isIntersecting){
                icons.forEach((icon) => {
                    const style = window.getComputedStyle(icon);
                    const transitionDelay = parseFloat(style.transitionDelay);
                    const delayInMs = transitionDelay * 1000;
                    icon.style.removeProperty("transition-delay");

                    if (delayInMs === 0){
                        icon.classList.add("icon-bar__show");
                    } else {
                        setTimeout(() =>{
                            icon.classList.add("icon-bar__show");
                        }, delayInMs);
                    }
                });
            }
        });
    });

    observer.observe(iconsContainer);
}