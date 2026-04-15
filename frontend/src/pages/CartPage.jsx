import React from 'react';
import styled from 'styled-components';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

const CartSection = styled.section`
  padding: 150px 80px;
  background-color: var(--ivory);
  min-height: 100vh;
`;

const CartContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-family: 'Playfair Display', serif;
  font-size: 3rem;
  margin-bottom: 50px;
  color: var(--obsidian);
`;

const Item = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px 0;
  border-bottom: 1px solid rgba(26, 26, 26, 0.1);
`;

const ItemInfo = styled.div`
  h3 { font-family: 'Playfair Display', serif; font-size: 1.5rem; margin-bottom: 10px; }
  p { color: var(--gold); font-weight: 600; }
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  color: #ff4d4d;
  cursor: pointer;
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const TotalContainer = styled.div`
  margin-top: 60px;
  text-align: right;
  border-top: 2px solid var(--obsidian);
  padding-top: 30px;
`;

const PayButton = styled.button`
  background: var(--obsidian);
  color: var(--ivory);
  padding: 20px 60px;
  border: none;
  font-size: 0.8rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  cursor: pointer;
  margin-top: 30px;
  transition: all 0.3s ease;

  &:hover {
    background: var(--gold);
  }
`;

const CartPage = () => {
  const { cart, removeFromCart, totalAmount } = useCart();

  const handleCheckout = () => {
    // On redirige vers la page de paiement en passant le total dans l'URL
    window.open(`/paiement.html?total=${totalAmount}`, '_blank');
  };

  return (
    <CartSection>
      <CartContainer>
        <Title>Votre Sélection SS</Title>
        
        <AnimatePresence>
          {cart.length === 0 ? (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              Votre panier est vide. Explorez notre collection pour trouver votre signature.
            </motion.p>
          ) : (
            <>
              {cart.map((item) => (
                <Item 
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <ItemInfo>
                    <h3>{item.name}</h3>
                    <p>{item.price.toLocaleString()} FCFA</p>
                  </ItemInfo>
                  <RemoveButton onClick={() => removeFromCart(item.id)}>Supprimer</RemoveButton>
                </Item>
              ))}

              <TotalContainer>
                <h2 style={{ fontSize: '2.5rem', fontWeight: '300' }}>
                  Total : {totalAmount.toLocaleString()} FCFA
                </h2>
                <PayButton onClick={handleCheckout}>
                  Procéder au paiement groupé
                </PayButton>
              </TotalContainer>
            </>
          )}
        </AnimatePresence>
      </CartContainer>
    </CartSection>
  );
};

export default CartPage;