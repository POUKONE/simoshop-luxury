import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';

// --- STYLED COMPONENTS RETOUCHÉS ---

const Section = styled.section`
  padding: 120px 80px;
  background-color: var(--ivory);
  min-height: 100vh;
  @media (max-width: 768px) { padding: 80px 20px; }
`;
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 40px;
  @media (max-width: 768px) {
    grid-template-columns: 1fr; /* Une seule colonne sur mobile pour plus de clarté */
    gap: 20px;
  }
`;
const ButtonGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-top: 15px;
`;

const SearchBar = styled.input`
  width: 100%;
  max-width: 400px;
  background: transparent;
  border: none;
  border-bottom: 1px solid rgba(26, 26, 26, 0.2);
  padding: 12px 0;
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  outline: none;
  color: var(--obsidian);
  transition: border-color 0.3s ease;
  &:focus { border-bottom-color: var(--gold); }
  &::placeholder { color: rgba(26, 26, 26, 0.3); }
`;

const Card = styled(motion.div)`
  background: #FFFFFF;
  padding: 15px;
  border-radius: 4px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.03);
  position: relative;
  transition: box-shadow 0.3s ease;
  &:hover { box-shadow: 0 20px 40px rgba(0,0,0,0.08); }
`;

const ImageWrapper = styled.div`
  aspect-ratio: 3/4;
  overflow: hidden;
  margin-bottom: 20px;
  background: #f7f7f7;
  border-radius: 2px;
  img { 
    width: 100%; 
    height: 100%; 
    object-fit: cover; 
    transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  }
  ${Card}:hover img { transform: scale(1.08); }
`;
const DetailsArea = styled(motion.div)`
  overflow: hidden;
  font-size: 0.85rem;
  color: #666;
  line-height: 1.6;
  background: #fdfdfd;
  margin: 10px 0;
  border-left: 2px solid var(--gold);
  padding-left: 15px;
`;

const ActionButton = styled.button`
  padding: 12px;
  font-size: 0.65rem;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  cursor: pointer;
  border: 1px solid var(--obsidian);
  background: ${props => props.$added ? '#25D366' : (props.$primary ? 'var(--obsidian)' : 'transparent')};
  color: ${props => (props.$primary || props.$added) ? 'var(--ivory)' : 'var(--obsidian)'};
  border-color: ${props => props.$added ? '#25D366' : 'var(--obsidian)'};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    background: ${props => props.$added ? '#25D366' : 'var(--gold)'};
    border-color: ${props => props.$added ? '#25D366' : 'var(--gold)'};
    color: white;
  }

  &:disabled { cursor: default; }
`;

// --- DATA (Conservée) ---
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
  const [addingId, setAddingId] = useState(null); // État pour le feedback d'ajout
  const { addToCart } = useCart();

  const handleAddToCart = (product) => {
    addToCart(product);
    setAddingId(product.id);
    setTimeout(() => setAddingId(null), 1500); // Reset après 1.5s
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Section>
      <motion.header 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{marginBottom: '50px'}}
      >
        <h2 style={{fontFamily: 'Playfair Display', fontSize: '2.5rem', fontWeight: '300'}}>La Collection</h2>
        <SearchBar 
          placeholder="Rechercher un modèle..." 
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </motion.header>

      <Grid>
        <AnimatePresence>
          {filteredProducts.map((product) => (
            <Card 
              key={product.id} 
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <ImageWrapper>
                <img src={product.img} alt={product.name} />
              </ImageWrapper>
              
              <h3 style={{fontSize: '0.9rem', marginBottom: '8px', fontWeight: '500', letterSpacing: '0.5px'}}>{product.name}</h3>
              <div style={{color: 'var(--gold)', fontWeight: '600', fontSize: '0.9rem', marginBottom: '15px'}}>
                {product.price.toLocaleString()} FCFA
              </div>

              <AnimatePresence>
                {expandedId === product.id && (
                  <DetailsArea
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                  >
                    <p style={{padding: '10px 0', fontSize: '0.8rem'}}>{product.desc}</p>
                  </DetailsArea>
                )}
              </AnimatePresence>
              
              <ButtonGroup>
                <ActionButton onClick={() => setExpandedId(expandedId === product.id ? null : product.id)}>
                  {expandedId === product.id ? "Fermer" : "Détails"}
                </ActionButton>
                
                <ActionButton 
                  $primary 
                  $added={addingId === product.id}
                  onClick={() => handleAddToCart(product)}
                  disabled={addingId === product.id}
                >
                  {addingId === product.id ? "Ajouté ✓" : "Commander"}
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