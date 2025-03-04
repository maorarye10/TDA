export const hero = () => {
    const svg = document.querySelector(".hero__svg");
    const titles = document.querySelector(".hero__titles");
    const btn = document.querySelector(".hero__btn");
    const contact = document.querySelector(".hero__contact");

    const observer = new IntersectionObserver(enteries =>  {
        enteries.forEach((entery) => {
            if (entery.isIntersecting){
                const delay = entery.target.dataset.delay;
                if (!delay || delay === "" || delay === "0") {
                    entery.target.classList.add("hero__show");
                }
                else {
                    setTimeout(() =>{
                        entery.target.classList.add("hero__show");
                    }, delay);
                }
            }
        });
    });

    observer.observe(svg);
    observer.observe(titles);
    observer.observe(btn);
    observer.observe(contact);
}