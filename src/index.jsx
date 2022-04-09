import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { MainChainProvider } from './context/MainChain';

ReactDOM.render(
    <MainChainProvider>
            <App />
    </MainChainProvider>,
  document.getElementById('root')
);