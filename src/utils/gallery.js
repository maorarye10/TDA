export const gallery = () => {
    const selectedPic = document.querySelector('.gallery__photo-selected');
    const pics = document.querySelectorAll('.gallery__photo');
    const btnBack = document.querySelector('.gallery__btn-left');
    const btnForward = document.querySelector('.gallery__btn-right');
    let pointer = 0;
    let lastBtnPressed = 0; // 0 = backward, 1 = forward

    const onPicClick = (event, index, arrLength) => {
        const clickedPic = event.target;
        selectedPic.src = clickedPic.src;

        /* if (index > 0 && index < arrLength - 1) {
            clickedPic.scrollIntoView({behavior: "smooth", block: "nearest", inline: "center"});
        } else {
            clickedPic.scrollIntoView({behavior: "smooth", block: "nearest", inline: "end"});
        } */
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
        pointer += 2;
        pics[pointer].scrollIntoView({behavior: "smooth", block: "nearest", inline: "start"});
        lastBtnPressed = 1;
    }

    const onBackwardClick = (event) => {
        if (btnForward.disabled){
            btnForward.disabled = false;
            btnForward.classList.remove('disable');
        }
        pointer -= 2;
        pics[pointer].scrollIntoView({behavior: "smooth", block: "nearest", inline: "start"});
        lastBtnPressed = 0;
    }

    pics.forEach((photo, index, photos)  => photo.addEventListener('click', (event) => onPicClick(event, index, photos.length)));
    btnForward.addEventListener('click', onForwardClick);
    btnBack.addEventListener('click', onBackwardClick);

    const observer = new IntersectionObserver(enteries =>  {
        enteries.forEach((entery) => entery.isIntersecting && onPicIntersecting());
    });
    observer.observe(pics[0]);
    observer.observe( pics[pics.length - 1]);
}