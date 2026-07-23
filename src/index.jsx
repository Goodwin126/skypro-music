import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import { AuthProvider } from './context/AuthContext';
import { TokenProvider } from './context/TokenContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <AuthProvider>
        <TokenProvider>
          <App />
        </TokenProvider>
      </AuthProvider>
    </BrowserRouter>
  </Provider>
);
