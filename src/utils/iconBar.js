export const iconBar = () => {
    const icons = document.querySelectorAll(".icon-bar__item");
    const iconsContainer = document.querySelector(".icon-bar__items");
    console.log(iconsContainer);

    const observer = new IntersectionObserver(enteries =>  {
        enteries.forEach((entery) => {
            if (entery.isIntersecting){
                console.log("intersecting");
                icons.forEach((icon) => {
                    const delay = icon.dataset.delay;
                    if (!delay || delay === "" || delay === "0") {
                        icon.classList.add("icon-bar__show");
                    } else {
                        icon.classList.add(`delay-${delay}`);
                        setTimeout(() =>{
                            icon.classList.add("icon-bar__show");
                        }, delay);
                    }
                });
            }
        });
    });

    observer.observe(iconsContainer);
}