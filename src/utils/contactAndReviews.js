export const contactAndReviews = () => {
    const contactSection = document.querySelector('.contact');
    const reviewsSection = document.querySelector('.reviews');

    const sectionObserver = new IntersectionObserver(entries => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                console.log('contactAndReviews is intersecting');
                entry.target.classList.add('contactAndReviews__show');
            }
        });
    });

    sectionObserver.observe(contactSection);
    sectionObserver.observe(reviewsSection);
}