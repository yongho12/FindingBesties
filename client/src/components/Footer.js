import React from 'react';
import { GrLinkedin , GrGithub } from "react-icons/gr";
import { FaHome } from "react-icons/fa"




const Footer = () => {
    return (
        <div className = "footer">
        <section id="contact" class="section">
        <h3 className="contact__email">Developed by Yongho Kim</h3>
        <div className="contact__links">
            <a href="https://github.com/yongho12" target="_blank" rel="noopener noreferrer">
                <GrGithub />
            </a>
            <a href="https://www.linkedin.com/in/yongho-kim-024451199/" target="_blank" rel="noopener noreferrer">
                <GrLinkedin />
            </a>
            <a href="https://yonghokim.info" target="_blank" rel="noopener noreferrer">
                <FaHome />
            </a>
        </div>
    </section>
        </div>
    );
};

export default Footer;