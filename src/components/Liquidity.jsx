import React, { useState, useContext, useEffect } from 'react'
import { Container, Modal, Button, Row, Col } from 'react-bootstrap';
import { ethers, utils, Wallet } from "ethers";

import './liquidity.scss';
import $ from 'jquery';
import { MainChain } from '../context/MainChain';
import { images } from '../constants';

const TokensLiquidity = ({Network, w}) => {
    const { CurrencyFormat, MoneyFormat, contracts, SignContract, getABI, Networks, Tokens, MainProvider, ADMIN, connectProxyNetwork, connectProxyNetworkRON, TKAddress } = useContext(MainChain);
    const [isLoaded, setIsLoaded] = useState(false);
    const NetworkFrom = Network;
    const NetworkTo = localStorage.getItem("NetworkTo");
    let userAddress = ADMIN.address
   
    useEffect(async () => {
        const Providers = await MainProvider();
        if(NetworkFrom === "RON"){
        const ConnRon = connectProxyNetworkRON(Networks[NetworkFrom].RpcUrls);
        const ContractSLP = SignContract(contracts[NetworkFrom].SLP.address, getABI(contracts[NetworkFrom].SLP.address, [NetworkFrom]), ConnRon.signer);
        const ContractAXS = SignContract(contracts[NetworkFrom].AXS.address, getABI(contracts[NetworkFrom].AXS.address, [NetworkFrom]), ConnRon.signer);
        const ContractWETH = SignContract(contracts[NetworkFrom].WETH.address, getABI(contracts[NetworkFrom].WETH.address, [NetworkFrom]), ConnRon.signer);
        const ContractUSDC = SignContract(contracts[NetworkFrom].USDC.address, getABI(contracts[NetworkFrom].USDC.address, [NetworkFrom]), ConnRon.signer);
        const ContractRON = ConnRon.provider.getBalance(userAddress);
        Tokens.SLP[NetworkFrom].TotalLiquidity = utils.formatUnits(await ContractSLP.balanceOf(userAddress), Tokens['SLP'][NetworkFrom].Decimals);
        Tokens.AXS[NetworkFrom].TotalLiquidity = utils.formatUnits(await ContractAXS.balanceOf(userAddress), Tokens['AXS'][NetworkFrom].Decimals);
        Tokens.RON[NetworkFrom].TotalLiquidity = utils.formatUnits(await ContractRON, Tokens['RON'][NetworkFrom].Decimals);
        Tokens.WETH[NetworkFrom].TotalLiquidity = utils.formatUnits(await ContractWETH.balanceOf(userAddress), Tokens['WETH'][NetworkFrom].Decimals);
        Tokens.USDC[NetworkFrom].TotalLiquidity = utils.formatUnits(await ContractUSDC.balanceOf(userAddress), Tokens['USDC'][NetworkFrom].Decimals);
        Tokens.RON[NetworkFrom].TotalLiquidity = utils.formatUnits(await ContractRON, Tokens['RON'][NetworkFrom].Decimals);
    }else{
        const Conn = connectProxyNetwork(Networks[NetworkFrom].RpcUrls);
        const ContractRNB = SignContract(contracts[NetworkFrom].RNB.address, getABI(contracts[NetworkFrom].RNB.address, [NetworkFrom]), Conn.signer);
        if(TKAddress[NetworkFrom].SLP){
        Tokens.SLP[NetworkFrom].TotalLiquidity = utils.formatUnits(await ContractRNB.getAvailableLiquidityOfToken(contracts[NetworkFrom].SLP.address), Tokens['SLP'][NetworkFrom].Decimals);
        }
        if(TKAddress[NetworkFrom].AXS){
        Tokens.AXS[NetworkFrom].TotalLiquidity = utils.formatUnits(await ContractRNB.getAvailableLiquidityOfToken(contracts[NetworkFrom].AXS.address), Tokens['AXS'][NetworkFrom].Decimals);
        }
        if(TKAddress[NetworkFrom].RON){
        Tokens.RON[NetworkFrom].TotalLiquidity = utils.formatUnits(await ContractRNB.getAvailableLiquidityOfToken(contracts[NetworkFrom].RON.address), Tokens['RON'][NetworkFrom].Decimals);
        }
        if(TKAddress[NetworkFrom].WETH){
        Tokens.WETH[NetworkFrom].TotalLiquidity = utils.formatUnits(await ContractRNB.getAvailableLiquidityOfToken(contracts[NetworkFrom].WETH.address), Tokens['WETH'][NetworkFrom].Decimals);
        }
        if(TKAddress[NetworkFrom].USDC){
        Tokens.USDC[NetworkFrom].TotalLiquidity = utils.formatUnits(await ContractRNB.getAvailableLiquidityOfToken(contracts[NetworkFrom].USDC.address), Tokens['USDC'][NetworkFrom].Decimals);
        }
        if(TKAddress[NetworkFrom].MATIC){
        Tokens.MATIC[NetworkFrom].TotalLiquidity = utils.formatUnits(await ContractRNB.getAvailableLiquidityOfToken(contracts[NetworkFrom].MATIC.address), Tokens['MATIC'][NetworkFrom].Decimals);
        }
        if(TKAddress[NetworkFrom].BNB){
        Tokens.BNB[NetworkFrom].TotalLiquidity = utils.formatUnits(await ContractRNB.getAvailableLiquidityOfToken(contracts[NetworkFrom].BNB.address), Tokens['BNB'][NetworkFrom].Decimals);
        }
        if(TKAddress[NetworkFrom].AVAX){
        Tokens.AVAX[NetworkFrom].TotalLiquidity = utils.formatUnits(await ContractRNB.getAvailableLiquidityOfToken(contracts[NetworkFrom].AVAX.address), Tokens['AVAX'][NetworkFrom].Decimals);  
        }
    }
    setIsLoaded(true);
    }, [isLoaded])
        
    return(
    <div className="Tokens__HUHSUHDLDBD">
        {Object.keys(Tokens).map((item, i) => {
            let Token;
            Token = Tokens[item][Network].TotalLiquidity ?? 0;
            Token = CurrencyFormat(Token);
            const TokenStatus = contracts[NetworkFrom][Tokens[item].Symbol].Status;

        return(
        <div className="Tokens__UHDDOPKJFHBR" key={i}>
                {TokenStatus ?
                <>
                <div className="Tokens__JD8789hIDHL">
                    <img src={Tokens[item].Logo} alt="" />
                </div>
                
                <div className="Tokens__IJSJPOSJBJLF">
                {Token}
                </div>
                <div className="Tokens___JUIOPSOHD">{Tokens[item].Title}</div>
                </>
                : <div className="Tokens__JD8789hIUKSJDDHL">
                <img src={Tokens[item].Logo} alt="" />
            </div>
            }
            </div>
        )})}
    </div>
    );
}

const Liquidity = () => {
    const { connectProxyNetwork, connectProxyNetworkRON, contracts, SignContract, getABI, BigNumber, Networks, Tokens, MainProvider, ADMIN, short } = useContext(MainChain);
    const NetworkFrom = localStorage.getItem("NetworkFrom");
    const NetworkTo = localStorage.getItem("NetworkTo");
        
    
  return (
    <Row>
        <Col md={6}>

        <div className="dQdmym">
        <div className="dXbYox">
        <div className="dnJGkr">
        <div className="kEiMDz eycoH d-flex justify-content-evenly">
                <div className="title-text  flex-grow-1 bd-highlight">Total Liquidity: {Networks[NetworkFrom].Name}</div>
                <div className="etZQAu mx-2">
                    {NetworkFrom === "RON" ?
                <a target="_blank" href={Networks[NetworkFrom].BlockExplorerUrls+"/address/"+ADMIN.address}><img width="35px" src={images[NetworkFrom]} alt="" /></a>
                :
                <a target="_blank" href={Networks[NetworkFrom].BlockExplorerUrls+"/address/"+contracts[NetworkFrom].RNB.address}><img width="35px" src={images[NetworkFrom]} alt="" /></a>
                }
                </div>
                </div>
        <hr className="sc-bqyKOL gSuxaX"></hr>
        <div className="kEiMDz"></div>

        

        <TokensLiquidity Network={NetworkFrom} w='from' />
        {/* {
            NetworkFrom !== "RON" &&
        <ul className="jQcwXY">
           <li><div className="label OPSKIDJFSOIHDS">Contract Address:</div><div className="value"><a target="_blank" href={Networks[NetworkFrom].BlockExplorerUrls+"/address/"+contracts[NetworkFrom].RNB.address}>{short(contracts[NetworkFrom].RNB.address)}</a></div></li>
        </ul> 
            } */}
        </div>
        </div>
    </div>
    </Col>
    <Col md={6}>
        <div className="dQdmym">
        <div className="dXbYox">
        <div className="dnJGkr">
        <div className="kEiMDz eycoH d-flex justify-content-evenly">
                <div className="title-text  flex-grow-1 bd-highlight">Total Liquidity: {Networks[NetworkTo].Name}</div>
                <div className="etZQAu mx-2">
                    {NetworkTo === "RON" ?
                <a target="_blank" href={Networks[NetworkTo].BlockExplorerUrls+"/address/"+ADMIN.address}><img width="35px" src={images[NetworkTo]} alt="" /></a>
                :
                <a target="_blank" href={Networks[NetworkTo].BlockExplorerUrls+"/address/"+contracts[NetworkTo].RNB.address}><img width="35px" src={images[NetworkTo]} alt="" /></a>
                }
                </div>
                </div>
        <hr className="sc-bqyKOL gSuxaX"></hr>
        <div className="kEiMDz"></div>

        <TokensLiquidity Network={NetworkTo} w='to' />
        {/* {
             NetworkTo !== "RON" &&
        <ul className="jQcwXY">
        <li><div className="label OPSKIDJFSOIHDS">Contract Address:</div><div className="value"><a target="_blank" href={Networks[NetworkTo].BlockExplorerUrls+"/address/"+contracts[NetworkTo].RNB.address}>{short(contracts[NetworkTo].RNB.address)}</a></div></li>
        </ul>
        } */}
        </div>
        </div>
    </div>
    </Col>
  </Row>
  )
}

export default Liquidity