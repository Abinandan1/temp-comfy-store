import React from "react";
import styled from "styled-components";
import logo from "../assets/logo.svg";
import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";
import { links } from "../utils/constants";
import CartButtons from "./CartButtons";
import { useProductsContext } from "../context/products_context";
import { useUserContext } from "../context/user_context";

const Nav = () => {
  const { openSidebar } = useProductsContext();
  const { myUser } = useUserContext();
  let i = 0;
  const NavContainer = styled.nav`
    height: 5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    .profile {
      display: none;
    }
    .nav-center {
      width: 90vw;
      margin: 0 auto;
      max-width: var(--max-width);
    }
    .nav-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      img {
        width: 175px;
        margin-left: -15px;
      }
    }
    .nav-toggle {
      background: transparent;
      border: transparent;
      color: var(--clr-primary-5);
      cursor: pointer;
      svg {
        font-size: 2rem;
      }
    }
    .nav-links {
      display: none;
    }
    .cart-btn-wrapper {
      display: none;
    }
    @media (min-width: 992px) {
      .nav-toggle {
        display: none;
      }
      .nav-center {
        display: grid;
        grid-template-columns: ${myUser
          ? `auto 1fr auto auto`
          : `auto 1fr auto`};
        align-items: center;
      }
      .profile {
        display: inline;
        width: 2rem;
        height: 2rem;
        border-radius: 50%;
      }
      .nav-links {
        display: flex;
        justify-content: center;
        li {
          margin: 0 0.5rem;
        }
        a {
          color: var(--clr-grey-3);
          font-size: 1rem;
          text-transform: capitalize;
          letter-spacing: var(--spacing);
          padding: 0.5rem;
          &:hover {
            border-bottom: 2px solid var(--clr-primary-7);
          }
        }
      }
      .cart-btn-wrapper {
        display: grid;
        grid-template-columns: 1fr 1fr auto;
        gap: 1rem;
      }
    }
  `;
  return (
    <NavContainer>
      <div className="nav-center">
        <div className="nav-header">
          <Link to="/">
            <img src={logo} alt="" />
          </Link>
          <button onClick={openSidebar} type="button" className="nav-toggle">
            <FaBars />
          </button>
        </div>
        <ul className="nav-links">
          {links.map(({ id, text, url }) => {
            return (
              <li key={id}>
                <Link to={url}>{text}</Link>
              </li>
            );
          })}
          {myUser && (
            <li>
              <Link to="/checkout">checkout</Link>
            </li>
          )}
        </ul>
        <CartButtons />
        {myUser ? <img className="profile" src={myUser.picture} alt="" /> : ""}
      </div>
    </NavContainer>
  );
};

export default Nav;
