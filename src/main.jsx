import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { RecoilRoot } from 'recoil'; // Import RecoilRoot
import App from './App.jsx';
import { AuthProvider } from './context/AuthProvider.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
 
    <RecoilRoot> {/* Wrap components with RecoilRoot */}
      <AuthProvider>
        <App />
      </AuthProvider>
    </RecoilRoot>
 
);
