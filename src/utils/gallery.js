export const galleryMobile = () => {
    const selectedPic = document.querySelector('.gallery__photo-selected');

    const onPicClick = (event, index, arrLength) => {
        const clickedPic = event.target;
        selectedPic.src = clickedPic.src;

        if (index > 0 && index < arrLength - 1) {
            clickedPic.scrollIntoView({behavior: "smooth", block: "nearest", inline: "center"});
        } else {
            clickedPic.scrollIntoView({behavior: "smooth", block: "nearest", inline: "end"});
        }
    }

    document.querySelectorAll('.gallery__photo').forEach((photo, index, photos)  => photo.addEventListener('click', (event) => onPicClick(event, index, photos.length)));
}