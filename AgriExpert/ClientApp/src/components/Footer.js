import React from "react";

import {
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaTwitter,
  FaLinkedin
} from "react-icons/fa";
import {
  FooterLinksContainer,
  FooterLinksWrapper,
  FooterLinkK,
  FooterLinksItems,
  FooterLinksTitle,
  FooterLink,
  FooterContainer,
  SocialMedia,
  SocialMediaWrap,
  SocialLogo,
  SocialIcon,
  SocialIconLink,
  SocialIcons,
  FooterLinkJ,
  WebsiteRights
} from "./FooterElement.js";

function Footer() {
  return (
    <FooterContainer>
      <FooterLinksContainer>
        <FooterLinksWrapper>
          <FooterLinksItems>
            <FooterLinksTitle>About Us</FooterLinksTitle>
            <FooterLinkK href="/about">How it works</FooterLinkK>
          </FooterLinksItems>

          <FooterLinksItems>
            <FooterLinksTitle>Contact Us</FooterLinksTitle>
            <FooterLinkJ>Phone no- 9387610809, 8135838212, 9435105989</FooterLinkJ>
          </FooterLinksItems>
        </FooterLinksWrapper>
        <FooterLinksWrapper>
          <FooterLinksItems>
            <FooterLinksTitle>Social Media</FooterLinksTitle>
            <FooterLink href="https://www.instagram.com/" target="_blank">
              Instagram
            </FooterLink>
            <FooterLink href="https://www.facebook.com/" target="_blank">
              Facebook
            </FooterLink>
            <FooterLink href="https://www.youtube.com/" target="_blank">
              Youtube
            </FooterLink>
            <FooterLink href="https://twitter.com/home" target="_blank">
              Twitter
            </FooterLink>
            <FooterLink href="https://www.linkedin.com/feed/" target="_blank">
              LinkedIn
            </FooterLink>
          </FooterLinksItems>
         </FooterLinksWrapper>
              <FooterLinksWrapper>
                  <FooterLinksItems>
                      <FooterLinksTitle>Polices and Conditions</FooterLinksTitle>
                      <FooterLink href="/CancellationRefund">Refund policy</FooterLink>
                      <FooterLink href="/ShippingPolicy">Shipping policy</FooterLink>
                      <FooterLink href="/PrivacyPolicy">Privacy policy</FooterLink>
                      <FooterLink href="/TermsCondition">Terms & Conditions</FooterLink>
                  </FooterLinksItems>
              </FooterLinksWrapper>
      </FooterLinksContainer>
      <SocialMedia>
        <SocialMediaWrap>
          <SocialLogo to="/">
            <SocialIcon />
            AgriExpert
          </SocialLogo>
          <WebsiteRights>Ⓒ AgriExpert 2023</WebsiteRights>
          <SocialIcons>
            <SocialIconLink
              href="https://www.facebook.com/"
              target="_blank"
              aria-label="Facebook"
            >
              <FaFacebook />
            </SocialIconLink>
            <SocialIconLink
              href="https://www.instagram.com/"
              target="_blank"
              aria-label="Instagram"
            >
              <FaInstagram />
            </SocialIconLink>
            <SocialIconLink
              href={"https://www.youtube.com/"}
              target="_blank"
              aria-label="Youtube"
              rel="noopener noreferrer"
            >
              <FaYoutube />
            </SocialIconLink>
            <SocialIconLink
              href="https://twitter.com/home"
              target="_blank"
              aria-label="Twitter"
            >
              <FaTwitter />
            </SocialIconLink>
            <SocialIconLink
              href="https://www.linkedin.com/feed/"
              target="_blank"
              aria-label="Linkedin"
            >
              <FaLinkedin />
            </SocialIconLink>
          </SocialIcons>
        </SocialMediaWrap>
      </SocialMedia>

      <a href = "https://toggle10.in/"
         target='_blank' className="toggle">Powered By @TOGGLE10
         </a>     </FooterContainer>
  );
}

export default Footer;
