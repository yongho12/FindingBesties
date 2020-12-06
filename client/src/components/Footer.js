import React from 'react';
import { GrLinkedin , GrGithub} from "react-icons/gr";



const Footer = () => {
    return (
        <div className = "footer">
        <section id="contact" class="section">
        <h3 class="contact__email">Developed by Yongho Kim</h3>
        <div class="contact__links">
            <a href="https://github.com/yongho12" target="_blank" rel="noopener noreferrer">
                <GrGithub />
            </a>
            <a href="https://www.linkedin.com/in/yongho-kim-024451199/" target="_blank" rel="noopener noreferrer">
                <GrLinkedin />
            </a>
        </div>
        <p class="contact__rights">
            <a href="https://yonghokim.info" target="_blank" rel="noopener noreferrer">
                   yonghokim.info - All rights reserved
            </a>
        </p>
    </section>
        </div>
    );
};

export default Footer;