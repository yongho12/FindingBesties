import React from 'react';
import { Link, NavLink, Switch, Route, Redirect} from 'react-router-dom'; 
// import Link from 'react-redux';
import { GrLinkedin , GrGithub} from "react-icons/gr";
import styled, { css, ThemeProvider } from "styled-components";


const Footer = () => {
    return (
        <div>
           <section id="contact" class="section">
        <h3 class="contact__email">Developed by Yongho Kim</h3>
        <div class="contact__links">
            <a href="https://github.com/yongho12" target="_blank">
                <GrGithub />
            </a>
            <a href="https://www.linkedin.com/in/yongho-kim-024451199/" target="_blank">
                <GrLinkedin />
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