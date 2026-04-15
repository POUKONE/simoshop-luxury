import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  :root {
    --ivory: #F9F6F2;
    --obsidian: #1A1A1A;
    --gold: #C5A059;
  }
    section {
  padding-top: 100px;
}
  body {
    margin: 0;
    padding: 0;
    background-color: var(--obsidian); 
  }
`;