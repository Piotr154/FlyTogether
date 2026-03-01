import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from './context/ThemeContext.jsx';
import { MantineProvider } from '@mantine/core';
import App from './App.jsx';
import './styles/index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <MantineProvider>
        <App />
      </MantineProvider>
    </ThemeProvider>
  </StrictMode>
  
)
