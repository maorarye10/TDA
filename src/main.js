import "../node_modules/modern-normalize/modern-normalize.css";
import "../styles/style.css";
import "../styles/utils.css";
import "../styles/components/background.css";
import "../styles/components/hero.css";
import "../styles/components/mobile-nav.css";
import "../styles/components/header.css";
import "../styles/components/icon-bar.css";
import "../styles/components/info.css";
import "../styles/components/services.css";
import "../styles/components/gallery.css";
import "../styles/components/contactAndReviews.css";
import "../styles/components/contact.css";
import "../styles/components/reviews.css";
import "../styles/components/footer.css";

import { mobileNav } from "./utils/mobile-nav";
import { servicesNav } from "./utils/services-nav";
import { gallery } from "./utils/gallery";

mobileNav();
servicesNav();
gallery();
