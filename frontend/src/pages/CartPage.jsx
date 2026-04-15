import React from 'react';
import styled from 'styled-components';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

// --- STYLES ---

const PageContainer = styled.section`
  padding: 150px 80px;
  background-color: var(--ivory);
  min-height: 100vh;
  @media (max-width: 768px) { padding: 100px 20px; }
`;

const Layout = styled.div`
  display: grid;
  grid-template-columns: 1fr 350px;
  gap: 60px;
  max-width: 1200px;
  margin: 0 auto;
  @media (max-width: 1024px) { grid-template-columns: 1fr; }
`;

const ItemCard = styled(motion.div)`
  display: flex;
  gap: 20px;
  background: white;
  padding: 20px;
  margin-bottom: 15px;
  border-radius: 2px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.02);
  align-items: center;
`;

const ItemImg = styled.img`
  width: 80px;
  height: 100px;
  object-fit: cover;
  background: #f7f7f7;
`;

const SummaryBox = styled.div`
  background: white;
  padding: 30px;
  height: fit-content;
  border-radius: 2px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.05);
  position: sticky;
  top: 120px;
`;

const CheckoutButton = styled.button`
  width: 100%;
  padding: 20px;
  background: var(--obsidian);
  color: var(--ivory);
  border: none;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 20px;
  transition: all 0.3s ease;
  &:hover { background: var(--gold); }
`;

const CartPage = () => {
  const { cart, removeFromCart, clearCart, totalAmount } = useCart();
  
  // Logique de frais de livraison (Exemple: Gratuit au dessus de 100.000 FCFA)
  const delivery = totalAmount > 100000 ? 0 : 2500;
  const grandTotal = totalAmount + delivery;

  const handlePay = () => {
    // On envoie le montant final à la page de paiement WhatsApp
    window.open(`/paiement.html?total=${grandTotal}`, '_blank');
  };

  if (cart.length === 0) {
    return (
      <PageContainer style={{ textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'Playfair Display', fontSize: '2rem' }}>Votre panier est vide</h2>
        <p style={{ margin: '20px 0' }}>L'élégance n'attend pas. Trouvez votre prochaine signature.</p>
        <Link to="/catalogue" style={{ color: 'var(--gold)', textDecoration: 'underline' }}>
          Retour au catalogue
        </Link>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <h1 style={{ fontFamily: 'Playfair Display', fontSize: '2.5rem', marginBottom: '40px' }}>Votre Sélection</h1>
      
      <Layout>
        {/* LISTE DES ARTICLES */}
        <div>
          <AnimatePresence>
            {cart.map((item, index) => (
              <ItemCard 
                key={`${item.id}-${index}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <ItemImg src={item.img} alt={item.name} />
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: '1rem', fontWeight: '500' }}>{item.name}</h3>
                  <p style={{ color: 'var(--gold)', marginTop: '5px' }}>{item.price.toLocaleString()} FCFA</p>
                </div>
                <button 
                  onClick={() => removeFromCart(item.id)}
                  style={{ background: 'none', border: 'none', color: '#ccc', cursor: 'pointer', fontSize: '0.8rem' }}
                >
                  Supprimer
                </button>
              </ItemCard>
            ))}
          </AnimatePresence>
          <button 
            onClick={clearCart}
            style={{ marginTop: '20px', background: 'none', border: 'none', color: '#999', cursor: 'pointer', textDecoration: 'underline', fontSize: '0.8rem' }}
          >
            Vider tout le panier
          </button>
        </div>

        {/* RÉCAPITULATIF PAYANT */}
        <SummaryBox>
          <h2 style={{ fontSize: '1.2rem', marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '1px' }}>Résumé</h2>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '0.9rem' }}>
            <span>Sous-total</span>
            <span>{totalAmount.toLocaleString()} FCFA</span>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', fontSize: '0.9rem' }}>
            <span>Livraison</span>
            <span>{delivery === 0 ? "Gratuite" : delivery.toLocaleString() + " FCFA"}</span>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid #eee', marginBottom: '20px' }} />

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: 'bold' }}>
            <span>Total</span>
            <span style={{ color: 'var(--gold)' }}>{grandTotal.toLocaleString()} FCFA</span>
          </div>

          <CheckoutButton onClick={handlePay}>
            Procéder au paiement
          </CheckoutButton>
          
          <p style={{ fontSize: '0.7rem', color: '#999', marginTop: '15px', textAlign: 'center' }}>
            Paiement sécurisé via Orange Money, MTN ou Moov.
          </p>
        </SummaryBox>
      </Layout>
    </PageContainer>
  );
};

export default CartPage;