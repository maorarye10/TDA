export const hero = () => {
    const titles = document.querySelector(".hero__titles");
    const title = document.querySelector(".hero__title");
    const subtitle = document.querySelector(".hero__subtitle");
    const btn = document.querySelector(".hero__btn");

    const observer = new IntersectionObserver(enteries =>  {
        enteries.forEach((entery) => {
            if (entery.isIntersecting){
                /* entery.target.classList.add("hero__show"); */
                setTimeout(() =>{
                    entery.target.classList.add("hero__show");
                }, 400);
            }
            else {
                entery.target.classList.remove("hero__show");
            }
        });
    });

    observer.observe(titles);
    /* observer.observe(title);
    observer.observe(subtitle); */
    observer.observe(btn);
}