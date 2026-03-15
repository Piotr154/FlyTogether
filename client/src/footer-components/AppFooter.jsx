import { IconPlaneTilt } from '@tabler/icons-react';
import '../styles/AppFooter.css';


export const AppFooter = () => {

    return (
        <div className="app-footer">
            <div className="app-footer-FirstRow">
                <div className="footer-about">
                    <div className="app-footer_icon-title">
                        <IconPlaneTilt className="app__icon" />
                        <h2>
                            FlyTogether
                        </h2>
                    </div>
                </div>
                <div className="footer-links">
                    <h3>Quick Links</h3>
                </div>
                <div className="footer-links">
                    <h3>Support</h3>
                </div>
                <div className="footer-contact">
                    <h3>Get In Touch</h3>
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