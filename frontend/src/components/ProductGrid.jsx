import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext'; // Import du hook panier

// --- STYLED COMPONENTS (Conservés selon ton design) ---

const Section = styled.section`
  padding: 120px 80px;
  background-color: var(--ivory);
  min-height: 100vh;
`;

const ControlsContainer = styled.div`
  margin-bottom: 60px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  border-bottom: 1px solid rgba(26, 26, 26, 0.05);
  padding-bottom: 40px;
`;

const SearchBar = styled.input`
  width: 100%;
  max-width: 400px;
  background: transparent;
  border: none;
  border-bottom: 1px solid var(--obsidian);
  padding: 10px 0;
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  outline: none;
  color: var(--obsidian);
  &::placeholder { color: rgba(26, 26, 26, 0.3); }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 40px;
`;

const Card = styled(motion.div)`
  background: #FFFFFF;
  padding: 20px;
  border-radius: 2px;
  height: fit-content;
  box-shadow: 0 4px 15px rgba(0,0,0,0.02);
`;

const ImageWrapper = styled.div`
  aspect-ratio: 3/4;
  overflow: hidden;
  margin-bottom: 20px;
  background: #f7f7f7;
  img { width: 100%; height: 100%; object-fit: cover; }
`;

const DetailsArea = styled(motion.div)`
  overflow: hidden;
  font-size: 0.85rem;
  color: #666;
  line-height: 1.6;
  background: #fdfdfd;
  margin: 10px 0;
  border-left: 1px solid var(--gold);
  padding-left: 15px;
`;

const ButtonGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-top: 15px;
`;

const ActionButton = styled.button`
  padding: 12px;
  font-size: 0.65rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  border: 1px solid var(--obsidian);
  background: ${props => props.$primary ? 'var(--obsidian)' : 'transparent'};
  color: ${props => props.$primary ? 'var(--ivory)' : 'var(--obsidian)'};
  transition: all 0.3s ease;

  &:hover {
    background: var(--gold);
    border-color: var(--gold);
    color: var(--ivory);
  }
`;

// --- DATA ---
const products = [
    { id: 1, name: "Pérruque Afro XXL", price: 10000, desc: "Volume spectaculaire, 100% cheveux humains. Densité maximum pour un style affirmé.", img: "/assets/afro.jpg" },
    { id: 2, name: "Bob Lisse Frange", price: 15000, desc: "Coupe carrée élégante avec frange. Texture soyeuse et fini naturel.", img: "/assets/bob-frange.jpg" },
    { id: 3, name: "Bob Court Brésilien", price: 30000, desc: "Mèches brésiliennes de qualité supérieure. Coupe courte moderne et dynamique.", img: "/assets/bob-bresilien.jpg" },
    { id: 4, name: "Lace Frontale Lisse", price: 35000, desc: "Lace HD invisible 13x4. Fusion parfaite avec la peau pour un rendu ultra-naturel.", img: "/assets/lace-lisse.jpg" },
    { id: 5, name: "Bouclée Naturelle", price: 60000, desc: "Boucles définies et rebondies. Cheveux humains vierges d'exception.", img: "/assets/boucle-nat.jpg" },
    { id: 6, name: "Ondulée Longue", price: 10000, desc: "Ondulations souples et glamour sur toute la longueur.", img: "/assets/ondule-longue.jpg" },
    { id: 7, name: "Lace Ondulée", price: 20000, desc: "Lace HD avec texture wavy naturelle. Idéal pour un look estival chic.", img: "/assets/lace-ondule.jpg" },
    { id: 8, name: "Frisée Glamour", price: 10000, desc: "Petites frisettes serrées pour un volume glamour instantané.", img: "/assets/frisee-glam.jpg" },
    { id: 9, name: "Frisée Chic", price: 10000, desc: "Style frisé sophistiqué, léger et facile à porter au quotidien.", img: "/assets/frisee-chic.jpg" },
    { id: 10, name: "Perruque Luxe", price: 10000, desc: "Édition limitée. Sélection premium pour une brillance et une douceur incomparables.", img: "/assets/luxe.jpg" },
    { id: 11, name: "Ondulée Spéciale", price: 10000, desc: "Texture unique travaillée à la main pour une allure singulière.", img: "/assets/ondule-speciale.jpg" },
    { id: 12, name: "Frisée Star", price: 10000, desc: "La perruque préférée de nos clientes pour briller en soirée.", img: "/assets/frisee-star.jpg" }
];

const ProductGrid = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedId, setExpandedId] = useState(null);
  const { addToCart } = useCart(); // Utilisation de la fonction du panier

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleDetails = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <Section>
      <header style={{marginBottom: '50px'}}>
        <h2 style={{fontFamily: 'Playfair Display', fontSize: '2.5rem', fontWeight: '300'}}>La Collection</h2>
      </header>

      <ControlsContainer>
        <SearchBar 
          placeholder="Rechercher un modèle..." 
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </ControlsContainer>

      <Grid>
        <AnimatePresence>
          {filteredProducts.map((product) => (
            <Card key={product.id} layout>
              <ImageWrapper>
                <img src={product.img} alt={product.name} />
              </ImageWrapper>
              
              <h3 style={{fontSize: '0.95rem', marginBottom: '5px', fontWeight: '500'}}>{product.name}</h3>
              <span style={{color: 'var(--gold)', fontWeight: '600', fontSize: '0.9rem'}}>
                {product.price.toLocaleString()} FCFA
              </span>

              <AnimatePresence>
                {expandedId === product.id && (
                  <DetailsArea
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                  >
                    <p style={{padding: '10px 0'}}>{product.desc}</p>
                  </DetailsArea>
                )}
              </AnimatePresence>
              
              <ButtonGroup>
                <ActionButton onClick={() => toggleDetails(product.id)}>
                  {expandedId === product.id ? "Fermer" : "Détails"}
                </ActionButton>
                
                {/* MODIFICATION : Ajoute au panier au lieu d'ouvrir le paiement direct */}
                <ActionButton $primary onClick={() => addToCart(product)}>
                  Commander
                </ActionButton>
              </ButtonGroup>
            </Card>
          ))}
        </AnimatePresence>
      </Grid>
    </Section>
  );
};

export default ProductGrid;