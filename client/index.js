import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App.jsx';

// uncomment so that webpack can bundle styles
import styles from './stylesheets/styles.css';

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App />);
