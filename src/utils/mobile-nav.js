export const mobileNav = () => {
  const headerBarsBtn = document.querySelector(".header__bars");
  const closeMobileNavBtn = document.querySelector(".mobile-nav__close");
  const mobileNav = document.querySelector(".mobile-nav");
  const mobileMenuContainer = document.querySelector(".mobile-nav__container");
  const mobileLinks = document.querySelectorAll(".mobile-nav__link");

  let isMobileNavOpen = false;

  const handleOpenMobileNav = () => {
    if (!isMobileNavOpen) {
      /* mobileNav.classList.add("mobile-nav-shown");
      mobileMenuContainer.classList.add("mobile-nav__container-shown"); */

      mobileNav.style.visibility = "visible";
      mobileNav.style.backgroundColor = "rgba(0, 0, 0, 0.9)";
      mobileMenuContainer.style.left = "calc(15% / 2)";

      document.body.style.overflowY = "hidden";
      isMobileNavOpen = true;
    }
  };

  const handleHideMobileNav = () => {
    if (isMobileNavOpen) {
      /* mobileNav.classList.remove("mobile-nav-shown");
      mobileMenuContainer.classList.remove("mobile-nav__container-shown"); */

      //mobileNav.style.visibility = "collapse";
      mobileNav.style.backgroundColor = "transparent";
      mobileMenuContainer.style.left = "-100%";

      setTimeout(() => (mobileNav.style.visibility = "collapse"), 300);
      document.body.style.overflowY = "auto";
      isMobileNavOpen = false;
    }
  };

  const handleLinkClick = (e) => {
    e.preventDefault();
    const linkElement = e.target;
    const sectionName = linkElement.dataset.section;
    const section = document.querySelector(`.${sectionName}`);
    section.scrollIntoView({behavior: "smooth", block: "center"});
    handleHideMobileNav();
  };

  headerBarsBtn.addEventListener("click", handleOpenMobileNav);
  closeMobileNavBtn.addEventListener("click", handleHideMobileNav);
  mobileLinks.forEach((link) =>
    link.addEventListener("click", handleLinkClick)
  );
};
