export const gallery = () => {
    const overlay = document.querySelector('.overlay');
    const fullscreenSection = document.querySelector('.gallery__fullscreen');
    const fullscreenCloseBtn = document.querySelector('.gallery__fullscreen-close');
    const fullscreenImg = document.querySelector('.gallery__fullscreen-img');
    const fullscreenLoader = document.querySelector('.gallery__fullscreen-loader');
    const gallerySection = document.querySelector('.gallery__content');
    const title = document.querySelector('.gallery__title');
    const displayedPicBlock = document.querySelector('.gallery__photo-selected-content');
    const displayedPicBlockOverlay = document.querySelector('.gallery__photo-info');
    const displayedPic = document.querySelector('.gallery__photo-selected');
    let selectedPic = document.querySelector('.gallery__photo.selected-pic');
    const pics = document.querySelectorAll('.gallery__photo');
    const btnBack = document.querySelector('.gallery__btn-left');
    const btnForward = document.querySelector('.gallery__btn-right');
    const btnOrder = document.querySelector('.gallery__photo-btn');
    const displayedPicTitle = document.querySelector('.gallery__photo-title');
    const contactSection = document.querySelector('.contact');
    const serviceDDL = document.querySelector(".contact__select");
    let pointer = 0;
    let lastBtnPressed = 0; // 0 = backward, 1 = forward

    const onPicClick = (event) => {
        const clickedPic = event.target;
        const clickedPicContainer = clickedPic.parentNode;

        selectedPic.classList.remove("selected-pic");
        clickedPicContainer.classList.add("selected-pic");

        displayedPic.src = clickedPic.src;
        displayedPicTitle.innerText = clickedPicContainer.dataset.service;
        displayedPicBlock.style.backgroundImage = getComputedStyle(clickedPicContainer).backgroundImage;
        if (!displayedPic.complete) { 
            displayedPic.style.opacity = 0;
        }

        selectedPic = clickedPicContainer;
    }

    const onPicIntersecting = () => {
        lastBtnPressed === 0 ? btnBack.disabled = true : btnForward.disabled = true;
        lastBtnPressed === 0 ? btnBack.classList.add('disable') : btnForward.classList.add('disable');
    }

    const onForwardClick = (event) => {
        if (btnBack.disabled){
            btnBack.disabled = false;
            btnBack.classList.remove('disable');
        }
        pointer += 8;
        pics[pointer].scrollIntoView({behavior: "smooth", block: "nearest", inline: "start"});
        lastBtnPressed = 1;
    }

    const onBackwardClick = (event) => {
        if (btnForward.disabled){
            btnForward.disabled = false;
            btnForward.classList.remove('disable');
        }
        pointer -= 8;
        pics[pointer].scrollIntoView({behavior: "smooth", block: "nearest", inline: "start"});
        lastBtnPressed = 0;
    }

    const onOrderBtnClick = (event) => {
        event.preventDefault();
        event.stopPropagation();
        serviceDDL.value = selectedPic.dataset.value;
        const changeEvent = new Event('change');
        serviceDDL.dispatchEvent(changeEvent);
        contactSection.scrollIntoView({behavior: "smooth", block: "center"});
    }

    const onSelectedPicClick = (event) => {
        event.preventDefault();
        document.body.style.overflowY = "hidden";
        fullscreenImg.src = `/Pictures/full/wheel${selectedPic.dataset.index}-full.webp`;

        if (!fullscreenImg.complete) {
            console.log("IS Img Loaded: ", fullscreenImg.complete);
            fullscreenImg.style.visibility = "hidden";
            fullscreenLoader.style.visibility = "visible";
        }
        overlay.style.display = "block";
        fullscreenSection.style.visibility = "visible";
    }

    const onFullscreenCloseClick = (event) => {
        event.preventDefault();
        document.body.style.overflowY = "auto";
        fullscreenSection.style.visibility = "hidden";
        overlay.style.display = "none";
        fullscreenImg.style.visibility = "hidden";
        fullscreenLoader.style.visibility = "visible";
    }

    const onFullscreenImgLoaded = () => { 
        fullscreenImg.style.visibility = "visible";
        fullscreenLoader.style.visibility = "hidden";
    }

    
    pics.forEach((pic, index)  => {
        const photo = pic.querySelector('img');

        // Click event for each pic
        photo.addEventListener('click', (event) => onPicClick(event));

        // Background image loading
        pic.style.backgroundImage = `url(/Pictures/small/wheel${index + 1}-small.webp)`;

        const onImgLoaded = (event) => {
            const photo = event.target;
            photo.style.opacity = 1;
        }

        if (index === 0) { 
            displayedPicBlock.style.backgroundImage = `url(/Pictures/small/wheel${index + 1}-small.webp)`;
            displayedPic.style.opacity = 0;
            
            displayedPic.addEventListener('load', onImgLoaded);
        }

        if (photo.complete) {
            const event = {
                target: photo
            }
            onImgLoaded(event);
        } else {
            photo.addEventListener('load', onImgLoaded);
        }
    });
    btnForward.addEventListener('click', onForwardClick);
    btnBack.addEventListener('click', onBackwardClick);
    btnOrder.addEventListener('click', onOrderBtnClick);
    displayedPicBlockOverlay.addEventListener('click', onSelectedPicClick);
    fullscreenCloseBtn.addEventListener('click', onFullscreenCloseClick);
    fullscreenImg.addEventListener('load', onFullscreenImgLoaded);

    displayedPicTitle.innerText = selectedPic.dataset.service;

    const edgePicsObserver = new IntersectionObserver(enteries =>  {
        enteries.forEach((entery) => entery.isIntersecting && onPicIntersecting());
    });
    edgePicsObserver.observe(pics[0]);
    edgePicsObserver.observe( pics[pics.length - 1]);

    const sectionObserver = new IntersectionObserver(enteries =>  {
        enteries.forEach((entery) => {
            if (entery.isIntersecting) {
                //show title
                title.classList.add("gallery__show");

                //show displayed pic with delay
                const style = window.getComputedStyle(displayedPicBlock);
                const transitionDelay = parseFloat(style.transitionDelay);
                const delayInMs = transitionDelay * 1000;
                displayedPicBlock.style.removeProperty("transition-delay");
                setTimeout(() => {
                    displayedPicBlock.classList.add("gallery__show");
                }, delayInMs);

                //show pics with delay
                pics.forEach((pic, key) => {
                    const picTransitionDelay = delayInMs + (key + 1) * 50;
                    pic.style.transitionDelay = `${picTransitionDelay}ms`;
                    setTimeout(() => {
                        pic.classList.add("gallery__show");
                        setTimeout(() => {
                            pic.style.removeProperty("transition-delay");
                            pic.style.transition = "none";
                        }, picTransitionDelay + 1000);
                    }, picTransitionDelay);
                });
            }
        });
    });
    sectionObserver.observe(gallerySection);
}