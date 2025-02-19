export const nav = () => {
    const navLinks = document.querySelectorAll('.header__link');

    const handleLinkClick = (e) => {
        e.preventDefault();
        const sectionName = e.target.dataset.section;

        if (sectionName === "info") {
            const section = document.querySelector(`.icon-bar`);
            section.scrollIntoView({behavior: "smooth", block: "start"});
            return;
        }
        
        const section = document.querySelector(`.${sectionName}`);
        section.scrollIntoView({behavior: "smooth", block: "center"});
    };

    navLinks.forEach((navLink) => (
        navLink.addEventListener("click", handleLinkClick)
    ));
};