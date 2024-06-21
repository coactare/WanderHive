import { ImFacebook, ImInstagram, ImTwitter } from "react-icons/im";
import styled from "styled-components";
import ButtonIcon from "../common/ButtonIcon";
import StyledLogo from "../common/Logo";
import StyledLogoDivider from "../common/LogoDivider";

export const FooterContainer = styled.footer`
background-color: var(--color-grey-0);
  padding: 1.2rem 4.8rem;
  border-top: 1px solid var(--color-grey-100);

`;

export const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 1.5fr 1fr 1fr 1fr;
`;

export const LogoColumn = styled.div`
  display: flex;
  flex-direction: column;
`;


export const SocialLinks = styled.ul`
  list-style: none;
  display: flex;
  gap: 2.4rem;
`;

export const CopyrightText = styled.p`
  font-size: 1.4rem;
  line-height: 1.6;
  
  margin-top: auto;
`;

export const FooterHeading = styled.h2`
  font-size: 1.8rem;
  font-weight: 500;
  margin-bottom: 4rem;
`;

export const ContactsText = styled.p`
  font-style: normal;
  font-size: 1.6rem;
  line-height: 1.6;
`;

export const Address = styled.p`
  margin-bottom: 2.4rem;
`;

export const FooterNav = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
`;

export const FooterLink = styled.a`
  text-decoration: none;
  font-size: 1.6rem;
  /* color: #767676; */
  transition: all 0.3s;
cursor: pointer;
  &:hover,
  &:active {
    background-color: var(--color-grey-100);
  }
`;

export const ContactAdress = styled.address`
    font-style: normal;
    font-size: 1.6rem;
    line-height: 1.6;
`;


export const AddressColumn = styled.div` `;

export const FooterLogo = styled.a`
  display: block;
    margin-bottom: 3.2rem;
`;

function Footer() {

  return (
    <FooterContainer>
      <FooterGrid>

        <LogoColumn>
          <FooterLogo>
            <StyledLogo onClick={() => navigate("/home")}>
              <span>Sports</span>
              <StyledLogoDivider />
              <span>EShop</span>
            </StyledLogo>
          </FooterLogo>

          <SocialLinks>
            <li>
              <ButtonIcon><ImInstagram /></ButtonIcon>
            </li>
            <li>
              <ButtonIcon><ImFacebook /></ButtonIcon>
            </li>
            <li>
              <ButtonIcon><ImTwitter /></ButtonIcon>
            </li>
          </SocialLinks>

          <CopyrightText>
            Copyright &copy; <span class="year">2027</span> by EShop, Inc.
          </CopyrightText>
        </LogoColumn>


        <AddressColumn>
          <FooterHeading>Contact us</FooterHeading>
          <ContactAdress>
            <Address>
              623 Harrison St., 2nd Floor, (CH) Chandigarh, 160017
            </Address>
            <p>
              <a class="footer-link" href="tel:123-456-7890">123-456-7890</a
              ><br />
              <a class="footer-link" href="mailto:hello@EShop.com"
              >hello@EShop.com</a
              >
            </p>
          </ContactAdress>
        </AddressColumn>

        <nav class="nav-col">
          <FooterHeading>Account</FooterHeading>
          <FooterNav>
            <li><FooterLink>Create account</FooterLink></li>
            <li><FooterLink>Sign in</FooterLink></li>
            <li><FooterLink>iOS app</FooterLink></li>
            <li><FooterLink>Android app</FooterLink></li>
          </FooterNav>
        </nav>

        <nav class="nav-col">
          <FooterHeading>Company</FooterHeading>
          <FooterNav>
            <li><FooterLink>About EShop</FooterLink></li>
            <li><FooterLink>For Business</FooterLink></li>
            <li><FooterLink>Affiliated partners</FooterLink></li>
            <li><FooterLink>Careers</FooterLink></li>
          </FooterNav>
        </nav>

        <nav class="nav-col">
          <FooterHeading>Resources</FooterHeading>
          <FooterNav>
            <li><FooterLink>Catalog directory </FooterLink></li>
            <li><FooterLink>Help center</FooterLink></li>
            <li><FooterLink>Privacy & terms</FooterLink></li>
          </FooterNav>
        </nav>
      </FooterGrid>

    </FooterContainer>
  );
}

export default Footer;