import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { MainChainProvider } from './context/MainChain';
// import { BSCSideChainProvider } from './context/BSCSideChain';
// import { ETHSideChainProvider } from './context/ETHSideChain';
// import { RONSideChainProvider } from './context/RONSideChain';

ReactDOM.render(
    <MainChainProvider>
            <App />
    </MainChainProvider>,
  document.getElementById('root')
);