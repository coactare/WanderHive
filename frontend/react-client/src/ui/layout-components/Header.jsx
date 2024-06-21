import styled from "styled-components";
import { HiOutlineUser, HiShoppingCart } from "react-icons/hi2";

import ButtonIcon from "../common/ButtonIcon";
import StyledLogo from "../common/Logo";
import StyledLogoDivider from "../common/LogoDivider";

import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';

import { useAppSelector } from '../../store/configureStore';
import DarkModeToggle from "../common/DarkModeToggle";
import Logout from "../../features/authentication/Logout";


const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 1.2rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

const StyledLeftDiv = styled.div` `;

const StyledCenterDiv = styled.div`
  margin-left: auto; 
  display: flex; 
  align-items: center; 
  gap:1rem;
`;

const StyledRightDiv = styled.div`
  margin-left: auto; 
  display: flex; 
  align-items: center; 
`;

const StyledHeaderMenu = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
`;

const StyledUserAvatar = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: center;
  font-weight: 500;
  font-size: 1.4rem;
  color: var(--color-grey-600);
`;

const Avatar = styled.img`
  display: block;
  width: 4rem;
  width: 3.6rem;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  outline: 2px solid var(--color-grey-100);
`;

const Img = styled.img`
  height: 6rem;
  width: auto;
`;

function Header() {

    const { basket, status } = useAppSelector(state => state.basket);

  const fullName = 'User';
  let userImage = null;
  const navigate = useNavigate();
  return (
    <StyledHeader>

      <StyledLeftDiv>
        <StyledLogo onClick={() => navigate("/home")}>
          <span>Sports</span>
          <StyledLogoDivider />
          <span>EShop</span>
        </StyledLogo>
      </StyledLeftDiv>

      <StyledCenterDiv>
        <ButtonIcon onClick={() => navigate("/home")}>Home</ButtonIcon>
        <ButtonIcon onClick={() => navigate("/store")}>Store</ButtonIcon>
        <ButtonIcon onClick={() => window.location.href = 'https://github.com'}>Github</ButtonIcon>
      </StyledCenterDiv>

      <StyledRightDiv>
        <StyledUserAvatar>
          <Avatar src={userImage || "default-user.jpg"} alt={`Avatar of ${fullName}`} />
          <span>{fullName}</span>
        </StyledUserAvatar>

        <StyledHeaderMenu>
          <li>
            <ButtonIcon>
              <HiOutlineUser />
            </ButtonIcon>
          </li>
          {/* <li>
            <ButtonIcon onClick={() => navigate(`/checkout`)}>
              <HiShoppingCart />
            </ButtonIcon>
          </li> */}
          <li>
            <ButtonIcon onClick={() => navigate(`/cart-details`)}>
              {basket?.items?.reduce((total, item) => total + item.quantity, 0) !== 0 &&
                basket?.items?.reduce((total, item) => total + item.quantity, 0)}
              <HiShoppingCart />
            </ButtonIcon>
          </li>
          <li>
            <DarkModeToggle />
          </li>
          <li>
            <Logout/>
          </li>
        </StyledHeaderMenu>
      </StyledRightDiv>
    </StyledHeader>
  );
}

export default Header;


