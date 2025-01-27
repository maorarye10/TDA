export const nav = () => {
    const navLinks = document.querySelectorAll('.header__link');

    const handleLinkClick = (e) => {
        e.preventDefault();
        const sectionName = e.target.dataset.section;
        const section = document.querySelector(`.${sectionName}`);
        section.scrollIntoView({behavior: "smooth", block: "center"});
    };

    navLinks.forEach((navLink) => (
        navLink.addEventListener("click", handleLinkClick)
    ));
};