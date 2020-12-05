import React from 'react';

const Footer = () => {
    return (
        <div>
           <section id="contact" class="section">
        <h1 class="contact__title">Let's talk</h1>
        <h2 class="contact__email">winthisgame12@gmail.com</h2>
        <div class="contact__links">
            <a href="https://github.com/yongho12" target="_blank">
                <i class="fab fa-github"></i>
            </a>
            <a href="https://www.linkedin.com/in/yongho-kim-024451199/" target="_blank">
                <i class="fa fa-linkedin-square"></i>
            </a>
        </div>
        <p class="contact__rights">
            2020 yonghokim.info - All rights reserved
        </p>
    </section>
        </div>
    );
};

export default Footer;