import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom'; // Import du hook de navigation

// --- STYLED COMPONENTS ---

const HeroContainer = styled.section`
  height: 90vh;
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background-color: var(--obsidian);
  /* Bordure de test supprimée pour l'Ultra Design */
`;

const VideoBackground = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.5;
  z-index: 1;
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgba(26,26,26,0.4), rgba(26,26,26,0.8));
  z-index: 2;
`;

const Content = styled.div`
  position: relative;
  z-index: 3;
  text-align: center;
  padding: 0 20px;
`;

const Title = styled(motion.h1)`
  font-family: 'Playfair Display', serif;
  font-size: clamp(2.5rem, 8vw, 4.5rem);
  color: var(--ivory);
  margin-bottom: 1.5rem;
  font-weight: 300;
  letter-spacing: -1px;
`;

const Subtitle = styled(motion.p)`
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 4px;
  color: var(--gold);
  margin-bottom: 3rem;
`;

const CTA = styled(motion.button)`
  background: transparent;
  border: 1px solid var(--gold);
  color: var(--gold);
  padding: 18px 40px;
  font-size: 0.8rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);

  &:hover {
    background: var(--gold);
    color: var(--obsidian);
  }
`;

// --- COMPOSANT REACT ---

const Hero = () => {
  const navigate = useNavigate(); // Initialisation de la navigation

  return (
    <HeroContainer>
      <VideoBackground autoPlay loop muted playsInline>
        <source src="/assets/hero-bg.mp4" type="video/mp4" />
      </VideoBackground>
      
      <Overlay />

      <Content>
        <Subtitle
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Signature Capillaire de Luxe
        </Subtitle>
        
        <Title
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          L'art de la coiffure, <br /> l'éclat de votre identité.
        </Title>

        <CTA
          onClick={() => navigate('/catalogue')} // Action : va vers le catalogue sur le même onglet
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          whileHover={{ scale: 1.05 }}
        >
          Explorer la Galerie
        </CTA>
      </Content>
    </HeroContainer>
  );
};

export default Hero;