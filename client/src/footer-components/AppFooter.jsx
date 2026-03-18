import { IconPlaneTilt, IconMail, IconPhone, IconMapPin } from '@tabler/icons-react';
import '../styles/AppFooter.css';


export const AppFooter = () => {

    return (
        <div className="app-footer">
            <div className="app-footer-FirstRow">
                <div className="footer-column">
                    <div className="app-footer_icon-title">
                        <IconPlaneTilt className="app__icon" />
                        <h2>
                            FlyTogether
                        </h2>
                    </div>
                     <p>
                        Find the best flights from 
                        multiple cities to one destination. 
                        Travel together, start from anywhere.
                    </p>
                </div>
                <div className="footer-column">
                    <h3>Quick Links</h3>
                    <ul>
                        <li>How It Works</li>
                        <li>Popular Destinations</li>
                        <li>Travel Tips</li>
                        <li>FAQ</li>
                    </ul>
                </div>
                <div className="footer-column">
                    <h3>Support</h3>
                    <ul>
                        <li>Contact Us</li>
                        <li>Privacy Policy</li>
                        <li>Terms of Service</li>
                        <li>Refund Policy</li>
                    </ul>
                </div>
                <div className="footer-column">
                    <h3>Get In Touch</h3>
                    <div className="footer-contact-line">
                        <IconMail class="contact-icon" stroke={2} />
                        <a href="mailto:support@flytogether.com">support@flytogether.com</a>
                    </div>
                    <div className="footer-contact-line">
                        <IconPhone class="contact-icon" stroke={2} />
                        <span>1-800-FLY-TOGETHER</span>
                    </div>
                    <div className="footer-contact-line">
                        <IconMapPin class="contact-icon" stroke={2} />
                        <span>123 Aviation Blvd, Sky City, SC 12345</span>
                    </div>
                </div>
            </div>
            <div className="app-footer-SecondRow">
                <div>
                    <p>© 2026 FlyTogether. All rights reserved.</p>
                </div>
                <div>
                    <ul>
                        <li>
                            Accessibility
                        </li>
                        <li>
                            Sitemap
                        </li>
                        <li>
                            Cookies
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}