import React, { useState, useContext, useEffect } from 'react'
import { Container, Modal, Button, Row, Col } from 'react-bootstrap';
import { ethers, utils, Wallet } from "ethers";

import './myliquidity.scss';
import $ from 'jquery';
import { MainChain } from '../context/MainChain';
import { images } from '../constants';

const handleChangeInput = (e, token, range) => {
    const gValue = document.querySelector("#id__QWQSaIUSISDIDSIOUAGHHUEW_"+range);
    gValue.textContent = e.target.value+" "+token;
}

const TokensMyLiquidity = () => {
    const { CurrencyFormat, MoneyFormat, contracts, SignContract, getABI, Networks, Tokens, MainProvider, removeLiquidity, TKAddress } = useContext(MainChain);
    const [isLoaded, setIsLoaded] = useState(false);
    const NetworkFrom = localStorage.getItem("NetworkFrom");
    const userAddress = localStorage.getItem("userAddress");
    useEffect(async () => {
        const Providers = await MainProvider();
        const ContractRNB = SignContract(contracts[NetworkFrom].RNB.address, getABI(contracts[NetworkFrom].RNB.address, [NetworkFrom]), Providers.signer);
        if(TKAddress[NetworkFrom].SLP){
        Tokens.SLP[NetworkFrom].MyLiquidity = utils.formatUnits(await ContractRNB.getUserTotalLiquidity(contracts[NetworkFrom].SLP.address, userAddress), Tokens['SLP'][NetworkFrom].Decimals);
        }
        if(TKAddress[NetworkFrom].AXS){
        Tokens.AXS[NetworkFrom].MyLiquidity = utils.formatUnits(await ContractRNB.getUserTotalLiquidity(contracts[NetworkFrom].AXS.address, userAddress), Tokens['AXS'][NetworkFrom].Decimals);
        }
        if(TKAddress[NetworkFrom].RON){
        Tokens.RON[NetworkFrom].MyLiquidity = utils.formatUnits(await ContractRNB.getUserTotalLiquidity(contracts[NetworkFrom].RON.address, userAddress), Tokens['RON'][NetworkFrom].Decimals);
        }
        if(TKAddress[NetworkFrom].WETH){
        Tokens.WETH[NetworkFrom].MyLiquidity = utils.formatUnits(await ContractRNB.getUserTotalLiquidity(contracts[NetworkFrom].WETH.address, userAddress), Tokens['WETH'][NetworkFrom].Decimals);
        }
        if(TKAddress[NetworkFrom].USDC){
        Tokens.USDC[NetworkFrom].MyLiquidity = utils.formatUnits(await ContractRNB.getUserTotalLiquidity(contracts[NetworkFrom].USDC.address, userAddress), Tokens['USDC'][NetworkFrom].Decimals);
        }
        if(TKAddress[NetworkFrom].MATIC){
        Tokens.MATIC[NetworkFrom].MyLiquidity = utils.formatUnits(await ContractRNB.getUserTotalLiquidity(contracts[NetworkFrom].MATIC.address, userAddress), Tokens['MATIC'][NetworkFrom].Decimals);
        }
        if(TKAddress[NetworkFrom].AVAX){
        Tokens.AVAX[NetworkFrom].MyLiquidity = utils.formatUnits(await ContractRNB.getUserTotalLiquidity(contracts[NetworkFrom].AVAX.address, userAddress), Tokens['AVAX'][NetworkFrom].Decimals);
        }
        if(TKAddress[NetworkFrom].BNB){
        Tokens.BNB[NetworkFrom].MyLiquidity = utils.formatUnits(await ContractRNB.getUserTotalLiquidity(contracts[NetworkFrom].BNB.address, userAddress), Tokens['BNB'][NetworkFrom].Decimals);
        }
        setIsLoaded(true);
       
    }, [isLoaded])
        
    return(
    <div className="Tokens__HUHSUHDLDBD">
        {
        Object.keys(Tokens).map((item, i) => {
            let Token;
            Token = Tokens[item][NetworkFrom].MyLiquidity ?? null;
            if(Number(Token) === 0) return;
            Token = CurrencyFormat(Token);
        return(
        <div className="Tokens__UHDDOPKJFHBR_HUSS" key={i}>
            <form onSubmit={e => removeLiquidity(e, Tokens[item].Symbol, document.querySelector(`#id__USaIUSIOUAGHHUEW_${contracts[NetworkFrom][Tokens[item].Symbol].address}`).value)} >
                <div className="Tokens__JD8789hIDHL">
                    <img src={Tokens[item].Logo} alt="" />
                </div>
                <div className="Tokens__IJSJPOSJBJLF">
                {Token}
                </div>
                <div className="Tokens___JUIOPSOHD">{Tokens[item].Title}</div>
                <div className="Tokens_JISjLOJDF">
                    <input name="amountRemove" type="range" id={`id__USaIUSIOUAGHHUEW_${contracts[NetworkFrom][Tokens[item].Symbol].address}`} min="0.001" step="0.001" max={Tokens[item][NetworkFrom].MyLiquidity} onChange={e => handleChangeInput(e, Tokens[item].Title, contracts[NetworkFrom][Tokens[item].Symbol].address)} />  
                </div>
                <div className="Tokens_JISjLOJDF" id={`id__QWQSaIUSISDIDSIOUAGHHUEW_${contracts[NetworkFrom][Tokens[item].Symbol].address}`}>{Token} {Tokens[item].Title}</div>
                <div className="Tokens_JISjLOJDF">
                <button type="submit" className="btn__main btn__load" id={`btn__UIUSpIOAUS_${contracts[NetworkFrom][Tokens[item].Symbol].address}`} >Remove</button>
                </div>
            </form>
        </div>
        )})}
    </div>
    );
}

const TokensMyRewards = ({Network}) => {
    const { CurrencyFormatDecimals, contracts, SignContract, getABI, Tokens, MainProvider, ClaimRewards, TKAddress } = useContext(MainChain);
    const [isLoadedRewards, setIsLoadedRewards] = useState(false);
    const NetworkFrom = localStorage.getItem("NetworkFrom");
    const userAddress = localStorage.getItem("userAddress");
    useEffect(async () => {
        if(NetworkFrom !== "RON"){
        const Providers = await MainProvider();
        const ContractRNB = SignContract(contracts[NetworkFrom].RNB.address, getABI(contracts[NetworkFrom].RNB.address, [NetworkFrom]), Providers.signer);
        if(TKAddress[NetworkFrom].SLP){
        Tokens.SLP[NetworkFrom].MyRewards = utils.formatUnits(await ContractRNB.getUserRewards(contracts[NetworkFrom].SLP.address, userAddress), Tokens['SLP'][NetworkFrom].Decimals);
        }
        if(TKAddress[NetworkFrom].AXS){
        Tokens.AXS[NetworkFrom].MyRewards = utils.formatUnits(await ContractRNB.getUserRewards(contracts[NetworkFrom].AXS.address, userAddress), Tokens['AXS'][NetworkFrom].Decimals);
        }
        if(TKAddress[NetworkFrom].RON){
        Tokens.RON[NetworkFrom].MyRewards = utils.formatUnits(await ContractRNB.getUserRewards(contracts[NetworkFrom].RON.address, userAddress), Tokens['RON'][NetworkFrom].Decimals);
        }
        if(TKAddress[NetworkFrom].WETH){
        Tokens.WETH[NetworkFrom].MyRewards = utils.formatUnits(await ContractRNB.getUserRewards(contracts[NetworkFrom].WETH.address, userAddress), Tokens['WETH'][NetworkFrom].Decimals);
        }
        if(TKAddress[NetworkFrom].USDC){
        Tokens.USDC[NetworkFrom].MyRewards = utils.formatUnits(await ContractRNB.getUserRewards(contracts[NetworkFrom].USDC.address, userAddress), Tokens['USDC'][NetworkFrom].Decimals);
        }
        if(TKAddress[NetworkFrom].MATIC){
        Tokens.MATIC[NetworkFrom].MyRewards = utils.formatUnits(await ContractRNB.getUserRewards(contracts[NetworkFrom].MATIC.address, userAddress), Tokens['MATIC'][NetworkFrom].Decimals);
        }
        if(TKAddress[NetworkFrom].AVAX){
        Tokens.AVAX[NetworkFrom].MyRewards = utils.formatUnits(await ContractRNB.getUserRewards(contracts[NetworkFrom].AVAX.address, userAddress), Tokens['AVAX'][NetworkFrom].Decimals);
        }
        if(TKAddress[NetworkFrom].BNB){
        Tokens.BNB[NetworkFrom].MyRewards = utils.formatUnits(await ContractRNB.getUserRewards(contracts[NetworkFrom].BNB.address, userAddress), Tokens['BNB'][NetworkFrom].Decimals);
        }
        setIsLoadedRewards(true);
        }
    }, [isLoadedRewards])
        
    return(
    <div className="Tokens__HUHSUHDLDBD">
        {Object.keys(Tokens).map((item, i) => {
            let Token, Liquidity;
            Token = Tokens[item][NetworkFrom].MyRewards ?? 0;
            Liquidity = Tokens[item][NetworkFrom].MyLiquidity ?? 0;
            if(Number(Liquidity) === 0 || Number(Token) === 0) return;
            if(Tokens[item][NetworkFrom].Decimals === 0 || Token === 0){
            Token = CurrencyFormatDecimals(Token, 0);
        }else if(Tokens[item][NetworkFrom].Decimals === 6){
            Token = CurrencyFormatDecimals(Token, 2);
        }else if(Token  >= 100){
            Token = CurrencyFormatDecimals(Token, 2);
        }else{
            Token = CurrencyFormatDecimals(Token, 4);
            }
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
                    {Tokens[item][NetworkFrom].MyRewards > 0 ?
                <button type="submit" className="btn__main btn__load" id={`btn__UIUSpUISJQIOAUS_${contracts[NetworkFrom][Tokens[item].Symbol].address}`} onClick={e => ClaimRewards(e, Tokens[item].Symbol, NetworkFrom)}>Claim</button> 
                : 
                <button type="submit" className="btn__main" disabled>--</button> 
            
            }
                </div>
            </div>
        )})}
    </div>
    );
}

const MyLiquidity = () => {
    const { Networks } = useContext(MainChain);
    const NetworkFrom = localStorage.getItem("NetworkFrom");

  return (
    NetworkFrom !== "RON" &&
    <Row>
        <>
        <Col md={6}>
        <div className="dQdmym">
        <div className="dXbYox">
        <div className="dnJGkr">
        <div className="kEiMDz eycoH d-flex justify-content-evenly">
                <div className="title-text  flex-grow-1 bd-highlight">My Liquidity: {Networks[NetworkFrom].Name}</div>
                <div className="etZQAu mx-2">
                    <img width="35px" src={images[NetworkFrom]} alt="" />
                </div>
                </div>
        <hr className="sc-bqyKOL gSuxaX"></hr>
        <div className="kEiMDz"></div>

        <TokensMyLiquidity />

        </div>
        </div>
    </div>
    </Col>
        <Col md={6}>
        <div className="dQdmym">
        <div className="dXbYox">
        <div className="dnJGkr">
        <div className="kEiMDz eycoH d-flex justify-content-evenly">
                <div className="title-text  flex-grow-1 bd-highlight">My Rewards: {Networks[NetworkFrom].Name}</div>
                <div className="etZQAu mx-2">
                    <img width="35px" src={images[NetworkFrom]} alt="" />
                </div>
                </div>
        <hr className="sc-bqyKOL gSuxaX"></hr>
        <div className="kEiMDz"></div>

        <TokensMyRewards />

        </div>
        </div>
    </div>
    </Col>
    </>
        </Row>
    
  )
}

export default MyLiquidity