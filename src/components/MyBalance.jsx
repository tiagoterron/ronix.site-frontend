import React, { useState, useContext, useEffect } from 'react'
import { FaWallet } from 'react-icons/fa';
import { Container, Modal, Button, Row, Col } from 'react-bootstrap';
import { ethers, utils, Wallet } from "ethers";

import './mybalance.scss';
import $ from 'jquery';
import { MainChain } from '../context/MainChain';
import { images } from '../constants';
import { CurrencyFormat2, CurrencyFormat } from '../lib/functions.js';



const MyBalanceTokens = () => {
    const { MoneyFormat, contracts, SignContract, getABI, Networks, Tokens, MainProvider, TKAddress } = useContext(MainChain);
    const [isLoaded, setIsLoaded] = useState(false);
    const NetworkFrom = localStorage.getItem("NetworkFrom");
    const userAddress = localStorage.getItem("userAddress");

    useEffect(async () => {
        const Providers = await MainProvider();
        
        if(NetworkFrom === "RON"){
        const ContractSLP = SignContract(contracts[NetworkFrom].SLP.address, getABI(contracts[NetworkFrom].SLP.address, [NetworkFrom]), Providers.signer);
        const ContractAXS = SignContract(contracts[NetworkFrom].AXS.address, getABI(contracts[NetworkFrom].AXS.address, [NetworkFrom]), Providers.signer);
        const ContractWETH = SignContract(contracts[NetworkFrom].WETH.address, getABI(contracts[NetworkFrom].WETH.address, [NetworkFrom]), Providers.signer);
        const ContractUSDC = SignContract(contracts[NetworkFrom].USDC.address, getABI(contracts[NetworkFrom].USDC.address, [NetworkFrom]), Providers.signer);
        const ContractRON = Providers.signer.getBalance();
        
        Tokens.SLP[NetworkFrom].MyBalance = utils.formatUnits(await ContractSLP.balanceOf(userAddress), Tokens['SLP'][NetworkFrom].Decimals);
        Tokens.AXS[NetworkFrom].MyBalance = utils.formatUnits(await ContractAXS.balanceOf(userAddress), Tokens['AXS'][NetworkFrom].Decimals);
        Tokens.RON[NetworkFrom].MyBalance = utils.formatUnits(await ContractRON, Tokens['RON'].Decimals);
        Tokens.WETH[NetworkFrom].MyBalance = utils.formatUnits(await ContractWETH.balanceOf(userAddress), Tokens['WETH'][NetworkFrom].Decimals);
        Tokens.USDC[NetworkFrom].MyBalance = utils.formatUnits(await ContractUSDC.balanceOf(userAddress), Tokens['USDC'][NetworkFrom].Decimals);
        setIsLoaded(true);
    }else{

        if(TKAddress[NetworkFrom].SLP){
            const ContractSLP = SignContract(contracts[NetworkFrom].SLP.address, getABI(contracts[NetworkFrom].SLP.address, [NetworkFrom]), Providers.signer);
            Tokens.SLP[NetworkFrom].MyBalance = utils.formatUnits(await ContractSLP.balanceOf(userAddress), Tokens['SLP'][NetworkFrom].Decimals);
        }

        if(TKAddress[NetworkFrom].RON){
            const ContractRON = SignContract(contracts[NetworkFrom].RON.address, getABI(contracts[NetworkFrom].RON.address, [NetworkFrom]), Providers.signer);
            Tokens.RON[NetworkFrom].MyBalance = utils.formatUnits(await ContractRON.balanceOf(userAddress), Tokens['RON'][NetworkFrom].Decimals);
        }
        if(TKAddress[NetworkFrom].AXS){
        const ContractAXS = SignContract(contracts[NetworkFrom].AXS.address, getABI(contracts[NetworkFrom].AXS.address, [NetworkFrom]), Providers.signer);
        Tokens.AXS[NetworkFrom].MyBalance = utils.formatUnits(await ContractAXS.balanceOf(userAddress), Tokens['AXS'][NetworkFrom].Decimals);
        }
        if(TKAddress[NetworkFrom].WETH){
        const ContractWETH = SignContract(contracts[NetworkFrom].WETH.address, getABI(contracts[NetworkFrom].WETH.address, [NetworkFrom]), Providers.signer);
        Tokens.WETH[NetworkFrom].MyBalance = utils.formatUnits(await ContractWETH.balanceOf(userAddress), Tokens['WETH'][NetworkFrom].Decimals);
        }
        if(TKAddress[NetworkFrom].USDC){
        const ContractUSDC = SignContract(contracts[NetworkFrom].USDC.address, getABI(contracts[NetworkFrom].USDC.address, [NetworkFrom]), Providers.signer);
        Tokens.USDC[NetworkFrom].MyBalance = utils.formatUnits(await ContractUSDC.balanceOf(userAddress), Tokens['USDC'][NetworkFrom].Decimals);
        }
        if(TKAddress[NetworkFrom].MATIC){
        const ContractMATIC = SignContract(contracts[NetworkFrom].MATIC.address, getABI(contracts[NetworkFrom].MATIC.address, [NetworkFrom]), Providers.signer);
        Tokens.MATIC[NetworkFrom].MyBalance = utils.formatUnits(await ContractMATIC.balanceOf(userAddress), Tokens['MATIC'][NetworkFrom].Decimals);
        }
        if(TKAddress[NetworkFrom].AVAX){
        const ContractAVAX = SignContract(contracts[NetworkFrom].AVAX.address, getABI(contracts[NetworkFrom].AVAX.address, [NetworkFrom]), Providers.signer);
        Tokens.AVAX[NetworkFrom].MyBalance = utils.formatUnits(await ContractAVAX.balanceOf(userAddress), Tokens['AVAX'][NetworkFrom].Decimals);
        }
        if(TKAddress[NetworkFrom].BNB){
        const ContractBNB = SignContract(contracts[NetworkFrom].BNB.address, getABI(contracts[NetworkFrom].BNB.address, [NetworkFrom]), Providers.signer);
        Tokens.BNB[NetworkFrom].MyBalance = utils.formatUnits(await ContractBNB.balanceOf(userAddress), Tokens['BNB'][NetworkFrom].Decimals);
        }
        setIsLoaded(true);
       }
       
    }, [isLoaded])
    return(
    <div className="Tokens__HUHSUHDLDBD">
        {
        isLoaded &&
        Object.keys(Tokens).map((item, i) => {
            let Token;
            Token = Tokens[item][NetworkFrom].MyBalance ?? 0;
            if(Token < 0.01){
                Token = CurrencyFormat2(Token);
            }else{
                Token = CurrencyFormat(Token);
            }
            const TokenStatus = contracts[NetworkFrom][Tokens[item].Symbol].Status;
        return(
        <div className="Tokens__UHDDOPKJFHBHJUDHDR" key={i}>
                {TokenStatus ? 
                <>
                <div className="Tokens__JD8789hIDHLSHUSH">

                    <img src={Tokens[item].Logo} alt="" />
                </div>
                <div className="Tokens__IJSJPOSJBJLJHUDHF">
                {Token}
                </div>
                <div className="Tokens___JUIOPSOHD">{Tokens[item].Title}</div>
                </> :
                <div className="Tokens__JD8789hIDHUSHUSHSUSLSHUSH">
                <img src={Tokens[item].Logo} alt="" />
            </div>
        }
            </div>
        )})
        
        }
    </div>
    );
}

const MyBalance = () => {
    const { PROVIDER } = useContext(MainChain);
    let NetworkFrom, userAddress;
    NetworkFrom = localStorage.getItem("NetworkFrom");
    userAddress = localStorage.getItem("userAddress");
    
  return (
    <Row>
        <Col md={12}>

        <div className="dQdmym">
        <div className="dXbYox">
        <div className="dnJGkr">
        <div className="kEiMDz eycoH d-flex justify-content-evenly">
                <div className="title-text  flex-grow-1 bd-highlight"><FaWallet /> My Wallet</div>
                <div className="etZQAu mx-2">
                    <img width="35px" src={images[NetworkFrom]} alt="" />
                </div>
                </div>
        <hr className="sc-bqyKOL gSuxaX"></hr>
        <div className="kEiMDz"></div>
        <MyBalanceTokens />
        </div>
        </div>
    </div>
    </Col>
  </Row>
  )
}

export default MyBalance