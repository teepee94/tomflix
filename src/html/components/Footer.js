import React from "react";
import FacebookIcon from "../../resources/icons/FacebookIcon";
import InstagramIcon from "../../resources/icons/InstagramIcon";
import TwitterIcon from "../../resources/icons/TwitterIcon";
import YoutubeIcon from "../../resources/icons/YoutubeIcon";

const SOCIAL_LINKS = [
    { label: "Facebook", href: "https://www.facebook.com/netflix", Icon: FacebookIcon },
    { label: "Instagram", href: "https://www.instagram.com/netflix", Icon: InstagramIcon },
    { label: "Twitter", href: "https://x.com/netflix", Icon: TwitterIcon },
    { label: "YouTube", href: "https://www.youtube.com/netflix", Icon: YoutubeIcon },
];

// Placeholder menu, mirroring the original layout. Rendered as text rather
// than empty links so it doesn't create dead tab stops.
const MENU_COLUMNS = [
    ["Audio and Subtitles", "Media Centre", "Privacy", "Contact Us"],
    ["Audio Description", "Investor Relations", "Legal Notices"],
    ["Help Centre", "Jobs", "Cookie Preferences"],
    ["Gift Cards", "Terms of Use", "Corporate Information"],
];

function Footer({ className = "" }) {
    return (
        <footer className={`c-footer ${className}`}>
            <div className="container">
                <div className="row">
                    <ul className="c-footer__social-items">
                        {SOCIAL_LINKS.map(({ label, href, Icon }) => (
                            <li className="c-footer__social-item" key={label}>
                                <a href={href} className="c-footer__social-item-link" target="_blank" rel="noopener noreferrer">
                                    <span className="u-visually-hide">Visit Netflix on {label} (opens in a new tab)</span>
                                    <Icon />
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="row">
                    <div className="c-footer__cols">
                        <div className="row">
                            {MENU_COLUMNS.map((items) => (
                                <div className="c-footer__col" key={items[0]}>
                                    <ul className="c-footer__menu-items">
                                        {items.map((item) => (
                                            <li className="c-footer__menu-item" key={item}>
                                                <span className="c-footer__menu-item-link">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="c-footer__copyright-container">
                        <p className="c-footer__copyright">
                            © <a href="https://tommyparkinson.com" className="c-footer__copyright-link">tommyparkinson</a> | Netflix Copy {new Date().getFullYear()}
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
