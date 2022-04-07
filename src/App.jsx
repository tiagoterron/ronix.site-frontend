import React, { useContext, useState, useEffect } from 'react'
import { Header, Navigator, Bridge, Liquidity, AddLiquidity, MyLiquidity, Fees, Transactions, RonRequests } from './components/'
import { ToastContainer } from 'react-toastify';
import { Container } from 'react-bootstrap';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import { MainChain } from './context/MainChain';

const App = () => {
  const { isLoading, ADMIN, checkWalletConnected } = useContext(MainChain);
  const NetworkFrom = localStorage.getItem("NetworkFrom");
  const userAddress = localStorage.getItem("userAddress");

  const [isConnected, setIsConnected] = useState(false);
    useEffect(async () => {
        const isConnected = await checkWalletConnected();
        if(isConnected) setIsConnected(true);
    }, [])
 
  if(isLoading == true) {
    return <div className="div-bg-loading">
              <ToastContainer />  
              <div className="mt-4"><img src="https://z0sqrs02-a.akamaihd.net/loading_icons/loading-default.gif" /></div>
              <div className="s-text text-dark h5">DO NOT RELOAD THIS PAGE!</div>
              <div className="s-text text-dark h4 mt-2">We are connecting to the blockchain.</div>
          </div>;
  }
  return (
    <div className="App__Container">
      <Navigator />
      <ToastContainer />
      <Bridge />
      <Liquidity />
      {(NetworkFrom === "RON") && (isConnected) && <RonRequests /> }
      {(NetworkFrom !== "RON") && (isConnected) && <AddLiquidity /> }
      {(NetworkFrom !== "RON") && (isConnected) && <MyLiquidity /> }
      {userAddress === ADMIN.address && <Fees />  }
      <Transactions /> 
    </div>
  )
}

export default App