// src/components/Navbar.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext'; // Assure-toi que l'import est présent

// --- STYLED COMPONENTS ---

const NavContainer = styled.nav`
  position: fixed;
  top: 0;
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 80px;
  background: rgba(26, 26, 26, 0.85);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(197, 160, 89, 0.1);
  z-index: 1000;
  box-sizing: border-box;
`;

const LogoSS = styled(Link)`
  font-family: 'Playfair Display', serif;
  font-size: 2.2rem;
  font-style: italic;
  color: var(--gold);
  text-decoration: none;
  letter-spacing: -2px;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.8;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 40px;
  align-items: center; /* Aligne l'icône verticalement avec le texte */
`;

const StyledLink = styled(Link)`
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 3px;
  text-decoration: none;
  color: ${props => props.$active ? 'var(--gold)' : 'var(--ivory)'};
  transition: color 0.3s ease;
  position: relative;
  display: flex;
  align-items: center;

  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: ${props => props.$active ? '100%' : '0'};
    height: 1px;
    background-color: var(--gold);
    transition: width 0.3s ease;
  }

  &:hover {
    color: var(--gold);
  }
`;

const CartBadge = styled.span`
  color: var(--gold);
  margin-left: 5px;
  font-weight: 600;
`;

// --- COMPOSANT ---

const Navbar = () => {
  const location = useLocation();
  const { cart } = useCart(); // ✅ Appel déplacé à l'intérieur du composant

  return (
    <NavContainer>
      <LogoSS to="/">SS</LogoSS>
      
      <NavLinks>
        <StyledLink to="/" $active={location.pathname === "/"}>
          Accueil
        </StyledLink>
        
        <StyledLink to="/catalogue" $active={location.pathname === "/catalogue"}>
          Catalogue
        </StyledLink>
        
        <StyledLink to="/about" $active={location.pathname === "/about"}>
          À Propos
        </StyledLink>
        
        {/* Panier stylisé avec icône ShoppingBag */}
        <StyledLink to="/panier" $active={location.pathname === "/panier"}>
          <ShoppingBag size={18} strokeWidth={1.5} />
          {cart.length > 0 && <CartBadge>({cart.length})</CartBadge>}
        </StyledLink>
      </NavLinks>
    </NavContainer>
  );
};

export default Navbar;