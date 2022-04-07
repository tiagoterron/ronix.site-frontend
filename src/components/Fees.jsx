import React, { useState, useContext, useEffect } from 'react'
import { Container, Modal, Button, Row, Col } from 'react-bootstrap';
import { ethers, utils, Wallet } from "ethers";

import './fees.scss';
import $ from 'jquery';
import { MainChain } from '../context/MainChain';
import { images } from '../constants';

const FeesLP = ({Network}) => {
    const { CurrencyFormat, contracts, PayLPToken, SignContract, getABI, Networks, Tokens, MainProvider, connectProxyNetwork, TKAddress } = useContext(MainChain);
    const [isLoaded, setIsLoaded] = useState(false);
    const NetworkFrom = Network;
    const NetworkTo = localStorage.getItem("NetworkTo");
    const userAddress = localStorage.getItem("userAddress");
    const Conn = connectProxyNetwork(Networks[NetworkFrom].RpcUrls);
    useEffect(async () => {
        if(NetworkFrom !== "RON"){
        const Providers = await MainProvider();
        const ContractRNB = SignContract(contracts[NetworkFrom].RNB.address, getABI(contracts[NetworkFrom].RNB.address, [NetworkFrom]), Conn.signer);
        if(TKAddress[NetworkFrom].SLP){
        Tokens.SLP[NetworkFrom].Fees = utils.formatUnits(await ContractRNB.getLPSwapRewards(contracts[NetworkFrom].SLP.address), Tokens['SLP'][NetworkFrom].Decimals);
        }
        if(TKAddress[NetworkFrom].AXS){
        Tokens.AXS[NetworkFrom].Fees = utils.formatUnits(await ContractRNB.getLPSwapRewards(contracts[NetworkFrom].AXS.address), Tokens['AXS'][NetworkFrom].Decimals);
        }
        if(TKAddress[NetworkFrom].RON){
        Tokens.RON[NetworkFrom].Fees = utils.formatUnits(await ContractRNB.getLPSwapRewards(contracts[NetworkFrom].RON.address), Tokens['RON'][NetworkFrom].Decimals);
        }
        if(TKAddress[NetworkFrom].WETH){
        Tokens.WETH[NetworkFrom].Fees = utils.formatUnits(await ContractRNB.getLPSwapRewards(contracts[NetworkFrom].WETH.address), Tokens['WETH'][NetworkFrom].Decimals);
        }
        if(TKAddress[NetworkFrom].USDC){
        Tokens.USDC[NetworkFrom].Fees = utils.formatUnits(await ContractRNB.getLPSwapRewards(contracts[NetworkFrom].USDC.address), Tokens['USDC'][NetworkFrom].Decimals);
        }
        if(TKAddress[NetworkFrom].MATIC){
        Tokens.MATIC[NetworkFrom].Fees = utils.formatUnits(await ContractRNB.getLPSwapRewards(contracts[NetworkFrom].MATIC.address), Tokens['MATIC'][NetworkFrom].Decimals);
        }
        if(TKAddress[NetworkFrom].BNB){
        Tokens.BNB[NetworkFrom].Fees = utils.formatUnits(await ContractRNB.getLPSwapRewards(contracts[NetworkFrom].BNB.address), Tokens['BNB'][NetworkFrom].Decimals);
        }
        if(TKAddress[NetworkFrom].AVAX){
        Tokens.AVAX[NetworkFrom].Fees = utils.formatUnits(await ContractRNB.getLPSwapRewards(contracts[NetworkFrom].AVAX.address), Tokens['AVAX'][NetworkFrom].Decimals);  
        }
        setIsLoaded(true);
        }    
}, [isLoaded])
    return(
    <div className="Tokens__HUHSUHDLDBD">
        {Object.keys(Tokens).map((item, i) => {
            let Token;
            Token = Tokens[item][Network].Fees ?? 0;
            Token = CurrencyFormat(Token);
        return(
        <div className="Tokens__UHDDOPKJFHBR_HUSS" key={i}>
                <div className="Tokens__JD8789hIDHL">
                    <img src={Tokens[item].Logo} alt="" />
                </div>
                <div className="Tokens__IJSJPOSJBJLF">
                {Token}
                </div>
                <div className="Tokens___JUIOPSOHD">{Tokens[item].Title}</div>
                <div className="Tokens_JISjLOJDF">
                {Network === NetworkFrom &&
                <button type="submit" id={`btn__${contracts[Network][Tokens[item].Symbol].address}`} className="btn__main btn__load" onClick={e => PayLPToken(contracts[Network][Tokens[item].Symbol].address, Network)}>PAY</button>
                }
                </div>
            </div>
        )})}
    </div>
    );
}

const Fees = () => {
    const { MainProvider, USER, InitiateBridge, connectProxyNetwork, TransferTokensFromCryptoFactory, connectProxyNetworkRON, contracts, SignContract, getABI, BigNumber, Networks, Tokens, addLiquidity, PayLPToken, ADMIN } = useContext(MainChain);
    const [showTokensFrom, setShowTokensFrom] = useState(false);
    const [showTokensTo, setShowTokensTo] = useState(false);
    let load = localStorage.getItem('load');
    let NetworkFrom, NetworkTo, userAddress;
        NetworkFrom = localStorage.getItem("NetworkFrom");
        NetworkTo = localStorage.getItem("NetworkTo");

        userAddress = localStorage.getItem("userAddress");

  return (
    <Row>
        {
        (userAddress === ADMIN.address) &&
        <>
        <Col md={6}>
        <div className="dQdmym">
        <div className="dXbYox">
        <div className="dnJGkr">
        <div className="kEiMDz eycoH d-flex justify-content-evenly">
                <div className="title-text  flex-grow-1 bd-highlight">Fees: {Networks[NetworkFrom].Name}</div>
                <div className="etZQAu mx-2">
                    <img width="35px" src={images[NetworkFrom]} alt="" />
                </div>
                </div>
        <hr className="sc-bqyKOL gSuxaX"></hr>
        <div className="kEiMDz"></div>
        <FeesLP Network={NetworkFrom} />
        </div>
        </div>
    </div>
    </Col>
        <Col md={6}>
        <div className="dQdmym">
        <div className="dXbYox">
        <div className="dnJGkr">
        <div className="kEiMDz eycoH d-flex justify-content-evenly">
                <div className="title-text  flex-grow-1 bd-highlight">Fees: {Networks[NetworkTo].Name}</div>
                <div className="etZQAu mx-2">
                    <img width="35px" src={images[NetworkTo]} alt="" />
                </div>
                </div>
        <hr className="sc-bqyKOL gSuxaX"></hr>
        <div className="kEiMDz"></div>
        <FeesLP Network={NetworkTo} />
        </div>
        </div>
    </div>
    </Col>
    </>
    }
        </Row>

  )
  
}

export default Fees