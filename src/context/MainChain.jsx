import React, { useEffect, useState } from "react";
import { ethers, utils } from "ethers";
import $ from 'jquery';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { images } from '../constants';
import { abi } from '../contracts';
import { BigNumber, MoneyFormat, CurrencyFormat, CurrencyFormatDecimals, sleep, short, addGlobalEventListener, qs, qsa } from '../lib/functions.js';
import { hexlify } from "ethers/lib/utils";
import { TKAddress, Tokens, Networks, contracts } from '../contracts/contracts.js';

const axios = require("axios");

if(!localStorage.getItem("NetworkFrom")){
    localStorage.setItem("NetworkFrom", "BSC");
    localStorage.setItem("NetworkTo", "RON");
    window.location.reload();
}

addGlobalEventListener('click', '.btn__load', (e) => {
    const element = document.querySelector("#"+e.target.id);
    const content = element.textContent;
    element.textContent = "";
    element.classList.add("button__loading");
    sleep(5000).then(() => {
        element.textContent = content;
        element.classList.remove("button__loading");
    })
}, {})



const URL_API = "https://cryptofactory.online";
const CreateTransaction = (_url, _params) => {
    axios.post(URL_API+_url, {headers: {'Access-Control-Allow-Origin': '*'}}, {
        params: _params
    });
}

const Transactions = {};
const GetAllTransactions = () => {
    axios.get(URL_API+"/getAllTransactions/").then((response) => {
        Object.keys(response.data).map((item, i)=>{
            Transactions[i] = {};
            Object.keys(response.data[item]).map((k, l)=>{
                Transactions[i][k] = response.data[item][k];
                });
          });
    });
}




const ethereum = window.ethereum ?? false;
var provider;
var signer;
if(ethereum !== false){
ethereum.on('chainChanged', chainId => {
    for (var prop in Networks) {
        if(Networks[prop].ChainIdHex === chainId){
            localStorage.setItem("NetworkFrom", prop);
            break;
        }
    }
    window.location.reload();
})
}else{
    localStorage.setItem("NetworkFrom", "BSC");
}



const loading = (_msg) => {
    const onLoading = toast.loading(_msg, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
}

const UnderstandRisks = () => {
    localStorage.setItem('UnderstandRisks', 1);
    const element = $(".caution_HSUHUD").remove();
}

const connectProxyNetwork = (_url) => {
    const proxyNetwork = _url;
    const proxyProvider = new ethers.providers.JsonRpcProvider(proxyNetwork);
    const proxyGasPrice = proxyProvider.getGasPrice();
    // const proxyWallet = new ethers.Wallet(process.env.REACT_APP_PRIVATE_KEY);
    // const proxySigner = proxyWallet.connect(proxyProvider);
    const SideProvider = {
        provider: proxyProvider,
        signer: proxyProvider,
        address: process.env.REACT_APP_ADMIN_ADDRESS,
        gasPrice: proxyGasPrice
    }
    return SideProvider;
}


const connectProxyNetworkRON = (_url) => {
    const proxyNetwork = _url;
    const proxyProvider = new ethers.providers.JsonRpcProvider(proxyNetwork);
    const proxyGasPrice = proxyProvider.getGasPrice();
    // const proxyWallet = new ethers.Wallet(process.env.REACT_APP_PRIVATE_KEY);
    // const proxySigner = proxyWallet.connect(proxyProvider);
    const SideProvider = {
        provider: proxyProvider,
        signer: proxyProvider,
        address: process.env.REACT_APP_ADMIN_ADDRESS,
        gasPrice: proxyGasPrice
    }
    return SideProvider;
}

const MainProvider = async () => {
    const Prov = {
        provider: null,
        signer: null,
        network: null
    }
    if(ethereum){
    try{
        provider = new ethers.providers.Web3Provider(ethereum);
        signer = provider.getSigner();
        const { chainId } = await provider.getNetwork()
        Prov.provider = provider;
        Prov.signer = signer;
        Prov.network = chainId;

        localStorage.setItem('NetworkFrom', getNetworkById(chainId).Symbol);
              
        }catch (err ){
            const conn = connectProxyNetwork(Networks['BSC'].RpcUrls);
            Prov.provider = conn.provider;
            Prov.signer =  conn.provider;
            Prov.network =  Networks['BSC'].ChainId;
            localStorage.setItem('NetworkFrom', 'BSC');
        }
        }
        return Prov;
  }

  const ADMIN = {
    address: process.env.REACT_APP_ADMIN_ADDRESS
}

const WrongNetwork = async () => {
    if(ethereum){
    let Network = true;
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const { chainId } = await provider.getNetwork()
    for (var prop in Networks) {
        if(Networks[prop].ChainId === chainId){
            Network = false
            break;
        }
    }
    return Network;
}
}

const getNetworkById = (_id) => {
    if(_id === Networks.BSC.ChainId) return Networks.BSC;
    if(_id === Networks.AVAX.ChainId) return Networks.AVAX;
    if(_id === Networks.MATIC.ChainId) return Networks.MATIC;
    if(_id === Networks.ETH.ChainId) return Networks.ETH;
    if(_id === Networks.RON.ChainId) return Networks.RON;
}

  
export const MainChain = React.createContext();


const notify = (_type, _msg) => {
    toast[_type](_msg, {
        position: "top-center",
        autoClose: 10000,
        hideProgressBar: false,
        closeOnClick: true,
        enableHtml: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
}

const SignContract = (_contract, _abi, _signer) => {  
    const Contract = new ethers.Contract(_contract, _abi, _signer);
    return Contract;
};

export const MainChainProvider = ({children}) => {
    
    const [isLoading, setIsLoading] = useState(false);

    const load = (_hash) => {
        localStorage.setItem('load', _hash);
    }

const [USER, setUSER] = useState({  });

const checkWalletConnected = async () => {
    try {
        if (!ethereum){
                localStorage.setItem("userAddress", "0x583068dd78d4aD8373053D5997A3143c333c50B9")
                return false;
        }else{
            const accounts = await ethereum.request({ method: "eth_accounts" })
            if(accounts[0]){
            setUSER((prevState) => ({ ...prevState, address: accounts[0] })); 
            if(!localStorage.getItem("userAddress") || localStorage.getItem("userAddress") !== accounts[0]){
                localStorage.setItem("userAddress", accounts[0]);
                if(accounts[0] === ADMIN.address){
                    ADMIN.logged = true;
                } 
            }     
            return true;
        }else{
            return false;
        }        
        }
        
    } catch (error) {
        return false
      }

} 
const GetTokenPrice = async (_token1, _token2) => {
    let Price;
    if(_token1 !== "RON"){
    let endpoint = `https://min-api.cryptocompare.com/data/price?api_key=${process.env.REACT_APP_PK_CRYPTO_COMPARE}&fsym=${_token1}&tsyms=${_token2}`;
    Price = await axios({url: endpoint, method: 'get'});
    localStorage.setItem("TokenPrice"+_token1, Price.data[_token2])
    return Price.data[_token2];
    }else{
        var options = {
            method: 'GET',
            url: 'https://api.coingecko.com/api/v3/coins/ronin?tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false',
            params: {ids: _token1, vs_currencies: _token2},
            headers: {
                'x-rapidapi-host': 'coingecko.p.rapidapi.com',
                'x-rapidapi-key': `${process.env.REACT_APP_PK_COINGECKO}`
            }
        };
        
    Price = await axios.request(options);
    localStorage.setItem("TokenPrice"+_token1, Price.data.market_data.current_price['usd'])
    return Price.data.market_data.current_price['usd'];
    }
    }

const TokenPrices = async () => {
    const LastTokenPriceUpdate = localStorage.getItem("LastTokenPriceUpdate") ?? localStorage.setItem("LastTokenPriceUpdate", Date.now());
    if(Date.now() > (Number(LastTokenPriceUpdate)+250000) || !localStorage.getItem("TokenPriceRON")){
    localStorage.setItem("LastTokenPriceUpdate", Date.now())   
    Tokens.RON.Price = await GetTokenPrice("RON", "USDC")
    Tokens.SLP.Price = await GetTokenPrice("SLP", "USDC")
    Tokens.AXS.Price = await GetTokenPrice("AXS", "USDC")
    Tokens.WETH.Price = await GetTokenPrice("WETH", "USDC")
    Tokens.AVAX.Price = await GetTokenPrice("AVAX", "USDC")
    Tokens.MATIC.Price = await GetTokenPrice("MATIC", "USDC")
    Tokens.BNB.Price = await GetTokenPrice("BNB", "USDC")
    Tokens.USDC.Price = 1; 
    }else{
    Tokens.RON.Price = localStorage.getItem("TokenPriceRON")
    Tokens.SLP.Price = localStorage.getItem("TokenPriceSLP")
    Tokens.AXS.Price = localStorage.getItem("TokenPriceAXS")
    Tokens.WETH.Price = localStorage.getItem("TokenPriceWETH")
    Tokens.AVAX.Price = localStorage.getItem("TokenPriceAVAX")
    Tokens.MATIC.Price = localStorage.getItem("TokenPriceMATIC")
    Tokens.BNB.Price = localStorage.getItem("TokenPriceBNB")
    Tokens.USDC.Price = 1;
    }
}

const connectWallet = async () => {
    try {
      if (!ethereum){
        // sleep(5000).then(() => window.open('https://metamask.io/download/', '_blank'));
          return notify("error", "MetaMask does not appear to be installed in your browser.");
      }
        const accounts = await ethereum.request({ method: "eth_requestAccounts", });
        setUSER((prevState) => ({ ...prevState, address: accounts[0] }));
        localStorage.setItem("userAddress", accounts[0]);
        notify("success", "Wallet "+accounts[0]+" connected!");
        reload(5);
        
    } catch (error) {
        notify("error", "Unlock your metamask!");
    }
  };

const getABI = (_addr, _network) => {
    if(_addr === contracts[_network].RNB.address) return contracts[_network].RNB.abi;
    if(_addr === contracts[_network].SLP.address) return contracts[_network].SLP.abi;
    if(_addr === contracts[_network].AXS.address) return contracts[_network].AXS.abi;
    if(_addr === contracts[_network].WETH.address) return contracts[_network].WETH.abi;
    if(_addr === contracts[_network].USDC.address) return contracts[_network].USDC.abi;
    if(_addr === contracts[_network].RON.address) return contracts[_network].RON.abi;
    if(_addr === contracts[_network].MATIC.address) return contracts[_network].MATIC.abi;
    if(_addr === contracts[_network].AVAX.address) return contracts[_network].AVAX.abi;
    if(_addr === contracts[_network].BNB.address) return contracts[_network].BNB.abi;
}

const getTokenByAddressReturnName = (_addr, _network) => {
    if(_addr === contracts[_network].RNB.address) return Tokens.RNB.Symbol;
    if(_addr === contracts[_network].SLP.address) return Tokens.SLP.Symbol;
    if(_addr === contracts[_network].AXS.address) return Tokens.AXS.Symbol;
    if(_addr === contracts[_network].WETH.address) return Tokens.WETH.Symbol;
    if(_addr === contracts[_network].USDC.address) return Tokens.USDC.Symbol;
    if(_addr === contracts[_network].RON.address) return Tokens.RON.Symbol;
    if(_addr === contracts[_network].MATIC.address) return Tokens.MATIC.Symbol;
    if(_addr === contracts[_network].AVAX.address) return Tokens.AVAX.Symbol;
    if(_addr === contracts[_network].BNB.address) return Tokens.BNB.Symbol;
}

const GetLiquidityToken = async (_network, _token) => {
    if(_network === "RON"){
    const conn = connectProxyNetworkRON(Networks['RON'].RpcUrls);
    if(_token === "RON"){
    return await conn.provider.getBalance(ADMIN.address);
    }else{
    const contract = SignContract(contracts['RON'][_token].address, getABI(contracts['RON'][_token].address, _network), conn.provider);
    return await contract.balanceOf(ADMIN.address);
    }
    }else{
    const conn = connectProxyNetwork(Networks[_network].RpcUrls);
    const Contract = SignContract(contracts[_network].RNB.address, getABI(contracts[_network].RNB.address, _network), conn.provider);
    return await Contract.getAvailableLiquidityOfToken(contracts[_network][_token].address);
    }
}

const CalculatePairToken = async  (e, _token1, _token2, _from) => {
    
    let Token2Price, TokenLiquidity, NetworkTo, NetworkFrom, TotalLiquidityToken, AmountFrom, AmountTo;
    AmountFrom = document.querySelector("#bridge_from_token_amount");
    AmountTo = document.querySelector("#bridge_to_token_amount");
    NetworkTo = localStorage.getItem("NetworkTo");
    NetworkFrom = localStorage.getItem("NetworkFrom");
    if(_from === true){
        AmountFrom = (AmountFrom.value-(1*AmountFrom.value)/100);
        Token2Price = (AmountFrom*Tokens[_token1].Price)/Tokens[_token2].Price;
        TokenLiquidity = await GetLiquidityToken(NetworkTo, _token2);

        TotalLiquidityToken = utils.formatUnits(TokenLiquidity, Tokens[_token2][NetworkTo].Decimals);
        if(Token2Price > TotalLiquidityToken){
            $("#bridge_to_token_amount").addClass("dauwyuw89aw");
            $("#Label__JHUDFUHFhIDHIu").css("display", "flex");
            $("#Label__JHUDFUHFhIDHIu div").empty().append("There's only "+CurrencyFormat(TotalLiquidityToken)+" "+_token2+" tokens available on this pool!")
            $("#bridge_to_token_amount").val(CurrencyFormat(Token2Price)); 
            $("#span__SHUHSOQIJWSQ").empty().append(CurrencyFormat(Token2Price)); 
            document.querySelector("#bridge_to_token_amount").dataset.limit = true;
        }else{
            $("#Label__JHUDFUHFhIDHIu").css("display", "none");
            $("#Label__JHUDFUHFhIDHIu div").empty();
            $("#bridge_to_token_amount").removeClass("dauwyuw89aw");    
            $("#bridge_to_token_amount").val(CurrencyFormat(Token2Price)); 
            $("#span__SHUHSOQIJWSQ").empty().append(Token2Price); 
            document.querySelector("#bridge_to_token_amount").dataset.limit = false;
        }
    }else{
        Token2Price = (AmountTo.value*Tokens[_token1].Price)/Tokens[_token2].Price;
        TokenLiquidity = await GetLiquidityToken(NetworkFrom, _token1);
        TotalLiquidityToken = utils.formatUnits(TokenLiquidity, Tokens[_token1][NetworkFrom].Decimals);
        $("#bridge_from_token_amount").val(CurrencyFormat(Token2Price)); 
        
    }
}

const getBalanceOf = async (addr, token, network) => {
    const NetworkFrom = localStorage.getItem('NetworkFrom');
    const _tokenName = getTokenByAddressReturnName(token.address, NetworkFrom);
    const Providers = await MainProvider();
    const balanceOf = await SignContract(token.address, getABI(token.address, network), Providers.signer).balanceOf(addr);
    return Number(utils.formatUnits(balanceOf, Tokens[_tokenName][NetworkFrom].Decimals));
}

const InitiateBridge = async (e) => {
    e.preventDefault();
    const Providers = await MainProvider();
    Providers.address = USER.address;

    let contractRNB_FROM, ABI, Allowence, Approve, receiveTokens, _decimalsTokenFrom, _decimalsTokenTo;
    let bridge_from_network = localStorage.getItem("NetworkFrom");
    let bridge_to_network = localStorage.getItem("NetworkTo");
    let NetworkFrom = bridge_from_network;
    let NetworkTo = bridge_to_network;
    let _tokenFrom = localStorage.getItem("TokenFrom");
    let _tokenTo = localStorage.getItem("TokenTo");
    let TokenFromSymbol = _tokenFrom;
    let TokenToSymbol = _tokenTo;
    let _amountFrom = $("#bridge_from_token_amount").val();
    let TokenPriceFrom = await GetTokenPrice(_tokenFrom, "USDC");
    let TokenPriceTo = await GetTokenPrice(_tokenTo, "USDC");
    let _amountTo = (_amountFrom*TokenPriceFrom)/TokenPriceTo;
    let CheckLiquidityTokenTo = await GetLiquidityToken(NetworkTo, _tokenTo);
    CheckLiquidityTokenTo = Number(utils.formatUnits(CheckLiquidityTokenTo, Tokens[_tokenTo][NetworkTo].Decimals));
    let balanceOf;
    if(_tokenFrom === "RON"){
    balanceOf = utils.formatUnits(await Providers.signer.getBalance(), 18);
    }else{
    balanceOf = await getBalanceOf(Providers.address, contracts[NetworkFrom][_tokenFrom], NetworkFrom);
    }

    if(Number(_amountFrom) <= 0){
        notify("error", "The amount must be greater than 0");
        return;
    }

    if(Number(balanceOf) < Number(_amountFrom)){
        notify("error", "You do not have enough "+Tokens[_tokenFrom].Symbol+" in your wallet!");
        return;
    }

    if(Number(_amountTo) > Number(CheckLiquidityTokenTo)){
        notify("error", "There's only "+CurrencyFormat(Tokens[_tokenTo][NetworkTo].TotalLiquidity)+" "+Tokens[_tokenTo].Symbol+" available on "+Networks[NetworkTo].Name);
        return;
    }
    if(Number(_amountFrom) < Number(Tokens[_tokenFrom].Min)){
        notify("error", "The minimum amount is "+CurrencyFormat(Tokens[_tokenFrom].Min)+" "+Tokens[_tokenFrom].Title);
        return;
    }
    if(Number(_amountFrom) > Number(Tokens[_tokenFrom].Max)){
        notify("error", "The maximum amount is "+CurrencyFormat(Tokens[_tokenFrom].Max)+" "+Tokens[_tokenFrom].Title);
        return;
    }
    
    notify("info", "Step 1: You need to allow us to use your "+Tokens[_tokenFrom].Symbol+" tokens!");
    setLoading(5, true);
    let txHash = utils.solidityKeccak256(["string"], [Providers.address+NetworkFrom+NetworkTo+TokenFromSymbol+TokenToSymbol+balanceOf+CheckLiquidityTokenTo]);
    
    if(NetworkFrom === "RON"){ 
        ABI = `[{"inputs":[{"internalType":"address","name":"_mainchainGateway","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_oldAdmin","type":"address"},{"indexed":true,"internalType":"address","name":"_newAdmin","type":"address"}],"name":"AdminChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_oldAdmin","type":"address"}],"name":"AdminRemoved","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_owner","type":"address"},{"indexed":true,"internalType":"address","name":"_spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"_value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_minter","type":"address"}],"name":"MinterAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_minter","type":"address"}],"name":"MinterRemoved","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_from","type":"address"},{"indexed":true,"internalType":"address","name":"_to","type":"address"},{"indexed":false,"internalType":"uint256","name":"_value","type":"uint256"}],"name":"Transfer","type":"event"},{"constant":false,"inputs":[{"internalType":"address[]","name":"_addedMinters","type":"address[]"}],"name":"addMinters","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"admin","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"_owner","type":"address"},{"internalType":"address","name":"_spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"_value","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_spender","type":"address"},{"internalType":"uint256","name":"_value","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_newAdmin","type":"address"}],"name":"changeAdmin","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_spender","type":"address"},{"internalType":"uint256","name":"_value","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_spender","type":"address"},{"internalType":"uint256","name":"_value","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"_addr","type":"address"}],"name":"isMinter","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"mainchainGateway","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_value","type":"uint256"}],"name":"mint","outputs":[{"internalType":"bool","name":"_success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"minter","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"minters","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"removeAdmin","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address[]","name":"_removedMinters","type":"address[]"}],"name":"removeMinters","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"_success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_from","type":"address"},{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"_success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"}]`;
        contractRNB_FROM = SignContract(contracts['RON'][_tokenFrom].address, ABI, Providers.signer);
    }else{
        contractRNB_FROM = SignContract(contracts[bridge_from_network].RNB.address, getABI(contracts[bridge_from_network].RNB.address, bridge_from_network), Providers.signer);
    }
    let DBRonixToAddress, DBRonixFromAddress;
    
    _decimalsTokenFrom = Tokens[_tokenFrom][bridge_from_network].Decimals;
    _decimalsTokenTo = Tokens[_tokenTo][bridge_to_network].Decimals;
    _tokenFrom = contracts[bridge_from_network][_tokenFrom].address;
    _tokenTo = contracts[bridge_to_network][_tokenTo].address;
    if(NetworkTo === "RON"){
        DBRonixToAddress = _tokenTo
    }else{
        DBRonixToAddress = contracts[bridge_to_network].RNB.address;
    }
    let _amountToWithFees = (_amountTo-(1*_amountTo/100));

    let RequestAllowence = true;
    const contractFrom = SignContract(_tokenFrom, getABI(_tokenFrom, bridge_from_network), Providers.signer);
    if(NetworkFrom === "RON"){
    Allowence = await contractFrom.allowance(Providers.address, ADMIN.address);
    DBRonixFromAddress = "RON";
    }else{
    Allowence = await contractFrom.allowance(contracts[bridge_from_network].RNB.address, contracts[bridge_from_network].RNB.address);
    DBRonixFromAddress = contracts[bridge_from_network].RNB.address;    
}
    await Allowence;
    if(utils.formatEther(Allowence) > _amountFrom){
        RequestAllowence = false;
    }
    
    if(RequestAllowence === true){
        try{
        if(NetworkFrom === "RON"){
            
        Approve = await contractFrom.approve(ADMIN.address, ethers.utils.parseUnits(_amountFrom, _decimalsTokenFrom));
    }else{
        Approve = await contractFrom.approve(contracts[bridge_from_network].RNB.address, ethers.utils.parseUnits(_amountFrom, _decimalsTokenFrom));
        }
        
        notify("info", "Step 2: Now you need to approve this transaction!");
        await Approve.wait();
        RequestAllowence = false;
    }catch (err){
        notify("error", "Something went wrong: "+err.data.message);
    }
    }
    if(RequestAllowence === false){
        if(NetworkFrom === "RON"){
            try{
                if(_tokenFrom === contracts['RON'].RON.address){
                let tx = {
                    to: ADMIN.address,
                    value: ethers.utils.parseUnits(_amountFrom, _decimalsTokenFrom)
                };
                receiveTokens = await Providers.signer.sendTransaction(tx);
                }else{
                    receiveTokens = await contractRNB_FROM.transfer(ADMIN.address, ethers.utils.parseUnits(_amountFrom, _decimalsTokenFrom));
                }

                let params = {
                    address: USER.address,
                    networkFrom: NetworkFrom,
                    networkTo: NetworkTo,
                    networkFromId: Networks[NetworkFrom].ChainId,
                    networkToId: Networks[NetworkTo].ChainId,
                    hash: txHash,
                    hashFrom: receiveTokens.hash,
                    hashTo: '0x',
                    amountFrom: _amountFrom,
                    amountTo: _amountToWithFees, 
                    tokenFrom: _tokenFrom,
                    tokenTo: _tokenTo,
                    tokenFromSymbol: TokenFromSymbol,
                    tokenToSymbol: TokenToSymbol,
                    tokenFromDecimals: _decimalsTokenFrom,
                    tokenToDecimals: _decimalsTokenTo,
                    ronixFrom: DBRonixFromAddress,
                    ronixTo: DBRonixToAddress,
                    status: 'pending',
                };
                CreateTransaction("/createTransaction/", params);
                localStorage.setItem('NewTx', txHash);
                load(receiveTokens.hash);
            
                setLoading(5, false);
            }catch (err){
                notify("error", "Something went wrong: "+err.data.message);
            }
        }else{
        try{
            receiveTokens = await contractRNB_FROM.receiveTokens(USER.address, _tokenFrom, ethers.utils.parseUnits(_amountFrom, _decimalsTokenFrom), txHash, Networks[NetworkFrom].ChainId);
            let params = {
                address: USER.address,
                networkFrom: NetworkFrom,
                networkTo: NetworkTo,
                networkFromId: Networks[NetworkFrom].ChainId,
                networkToId: Networks[NetworkTo].ChainId,
                hash: txHash,
                hashFrom: receiveTokens.hash,
                hashTo: '0x',
                amountFrom: _amountFrom,
                amountTo: _amountToWithFees, 
                tokenFrom: _tokenFrom,
                tokenTo: _tokenTo,
                tokenFromSymbol: TokenFromSymbol,
                tokenToSymbol: TokenToSymbol,
                tokenFromDecimals: _decimalsTokenFrom,
                tokenToDecimals: _decimalsTokenTo,
                ronixFrom: contracts[NetworkFrom].RNB.address,
                ronixTo: DBRonixToAddress,
                status: 'pending',
            };
            CreateTransaction("/createTransaction/", params);
            localStorage.setItem('NewTx', txHash);
            load(receiveTokens.hash);
            
            setLoading(5, false);
        }catch (err){
            notify("error", "Something went wrong: "+err.data.message);
        }  
        }
        await receiveTokens.wait();
        if(receiveTokens.hash){
            notify("success", "Completed. Hash: "+short(receiveTokens.hash));
            reload(10);             
        } 
    }
}

const revertTransaction = async (_id) => {
    const Providers = await MainProvider();
    const query = await axios.get(URL_API+"/getTransaction/"+_id, {headers: {'Access-Control-Allow-Origin': '*'}});
    let NetworkFrom = query.data[0].networkFrom;
    let AddressUser = query.data[0].address;
    let hash = query.data[0].hash;
    let _amountFrom = query.data[0].amountFrom.toString();
    let tokenFrom = query.data[0].tokenFrom;
    let _tokenFrom = getTokenByAddressReturnName(query.data[0].tokenFrom, NetworkFrom);
    let _decimalsTokenFrom = Tokens[_tokenFrom][NetworkFrom].Decimals;
    let contract = SignContract(contracts[NetworkFrom].RNB.address, getABI(contracts[NetworkFrom].RNB.address, [NetworkFrom]), Providers.signer);
    let transferTokens;
    
        if(NetworkFrom === "RON"){  
                try{          
                 if(_tokenFrom === "RON"){
                let tx = {
                    to: AddressUser,
                    value: utils.parseUnits(_amountFrom, _decimalsTokenFrom)
                };
                transferTokens = await Providers.signer.sendTransaction(tx);
                }else{
                let ABI = `[{"inputs":[{"internalType":"address","name":"_mainchainGateway","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_oldAdmin","type":"address"},{"indexed":true,"internalType":"address","name":"_newAdmin","type":"address"}],"name":"AdminChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_oldAdmin","type":"address"}],"name":"AdminRemoved","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_owner","type":"address"},{"indexed":true,"internalType":"address","name":"_spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"_value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_minter","type":"address"}],"name":"MinterAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_minter","type":"address"}],"name":"MinterRemoved","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_from","type":"address"},{"indexed":true,"internalType":"address","name":"_to","type":"address"},{"indexed":false,"internalType":"uint256","name":"_value","type":"uint256"}],"name":"Transfer","type":"event"},{"constant":false,"inputs":[{"internalType":"address[]","name":"_addedMinters","type":"address[]"}],"name":"addMinters","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"admin","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"_owner","type":"address"},{"internalType":"address","name":"_spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"_value","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_spender","type":"address"},{"internalType":"uint256","name":"_value","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_newAdmin","type":"address"}],"name":"changeAdmin","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_spender","type":"address"},{"internalType":"uint256","name":"_value","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_spender","type":"address"},{"internalType":"uint256","name":"_value","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"_addr","type":"address"}],"name":"isMinter","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"mainchainGateway","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_value","type":"uint256"}],"name":"mint","outputs":[{"internalType":"bool","name":"_success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"minter","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"minters","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"removeAdmin","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address[]","name":"_removedMinters","type":"address[]"}],"name":"removeMinters","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"_success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_from","type":"address"},{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"_success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"}]`;
                contract = SignContract(tokenFrom, ABI, Providers.signer);
                transferTokens = await contract.transfer(AddressUser, utils.parseUnits(_amountFrom, _decimalsTokenFrom));
                }
            axios.post(URL_API+"/revertTransaction/"+_id+"/reverted/", {headers: {'Access-Control-Allow-Origin': '*'}});
            notify("success", "The transaction has been reverted. Hash: "+short(transferTokens.hash));
            reload(5);
            }catch(err){
                notify("error", "Something went wrong: "+err.data.message);
                }
        }else{
        try{ 
        let revertTX = await contract.revertTransaction(AddressUser, tokenFrom, ethers.utils.parseUnits(_amountFrom.toString(), _decimalsTokenFrom), hash, Networks[NetworkFrom].ChainId);
        revertTX.wait();
        axios.post(URL_API+"/revertTransaction/"+_id+"/reverted/", {headers: {'Access-Control-Allow-Origin': '*'}});
        notify("success", "The transaction has been reverted. Hash: "+short(revertTX.hash));
        reload(5);
        }catch(err){    
        notify("error", "Something went wrong: "+err.data.message);
        }
        }
    
    
}

const confirmFreeRonRequest = async (_id) => {
    const Providers = await MainProvider();
    const query = await axios.get(URL_API+"/getRonRequest/"+_id, {headers: {'Access-Control-Allow-Origin': '*'}});
    let address = query.data[0].address;
    let amount = utils.parseUnits(parseFloat(query.data[0].amount).toFixed(18), 18);
    try{
    let tx = {
        to: address,
        value: amount
    };
    let transferTokens = await Providers.signer.sendTransaction(tx);
    axios.post(URL_API+"/updateStatusRonRequest/"+_id+"/completed/"+transferTokens.hash, {headers: {'Access-Control-Allow-Origin': '*'}}, {params: {}}).then((res) => console.log(res));
    notify("success", "Completed. Hash: "+short(transferTokens.hash));
    reload(5);
    }catch(err){
    notify("error", "Something went wrong!"+err);   
    }
}

const confirmTransaction = async (_id) => {
    const Providers = await MainProvider();
    let _amountToWithFees, _amountToWithoutFees, _amountToUnits, contractRNB_TO, ABI, _decimalsTokenTo, transferTokens;

    const query = await axios.get(URL_API+"/getTransaction/"+_id, {headers: {'Access-Control-Allow-Origin': '*'}});
    let AddressUser = query.data[0].address;
    let NetworkTo = query.data[0].networkTo;
    let _amountTo = query.data[0].amountTo;
    let hashID = query.data[0].hash;
    let _tokenToAddress = query.data[0].tokenTo;
    let _tokenTo = getTokenByAddressReturnName(query.data[0].tokenTo, NetworkTo);
    _decimalsTokenTo = Tokens[_tokenTo][NetworkTo].Decimals;

    if(NetworkTo === "RON"){
    ABI = `[{"inputs":[{"internalType":"address","name":"_mainchainGateway","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_oldAdmin","type":"address"},{"indexed":true,"internalType":"address","name":"_newAdmin","type":"address"}],"name":"AdminChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_oldAdmin","type":"address"}],"name":"AdminRemoved","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_owner","type":"address"},{"indexed":true,"internalType":"address","name":"_spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"_value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_minter","type":"address"}],"name":"MinterAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_minter","type":"address"}],"name":"MinterRemoved","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_from","type":"address"},{"indexed":true,"internalType":"address","name":"_to","type":"address"},{"indexed":false,"internalType":"uint256","name":"_value","type":"uint256"}],"name":"Transfer","type":"event"},{"constant":false,"inputs":[{"internalType":"address[]","name":"_addedMinters","type":"address[]"}],"name":"addMinters","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"admin","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"_owner","type":"address"},{"internalType":"address","name":"_spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"_value","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_spender","type":"address"},{"internalType":"uint256","name":"_value","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_newAdmin","type":"address"}],"name":"changeAdmin","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_spender","type":"address"},{"internalType":"uint256","name":"_value","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_spender","type":"address"},{"internalType":"uint256","name":"_value","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"_addr","type":"address"}],"name":"isMinter","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"mainchainGateway","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_value","type":"uint256"}],"name":"mint","outputs":[{"internalType":"bool","name":"_success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"minter","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"minters","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"removeAdmin","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address[]","name":"_removedMinters","type":"address[]"}],"name":"removeMinters","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"_success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_from","type":"address"},{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"_success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"}]`;
    contractRNB_TO = SignContract(contracts['RON'][_tokenTo].address, ABI, Providers.signer);
    }else{
    contractRNB_TO = SignContract(contracts[NetworkTo].RNB.address, getABI(contracts[NetworkTo].RNB.address, [NetworkTo]), Providers.signer);
    }
        if(NetworkTo === "RON"){
            _amountToUnits = utils.parseUnits(parseFloat(_amountTo).toFixed(_decimalsTokenTo), _decimalsTokenTo);
            try{
                if(_tokenTo === "RON"){
                    let tx = {
                        to: AddressUser,
                        value: _amountToUnits
                    };
                    transferTokens = await Providers.signer.sendTransaction(tx);
                }else{  
                transferTokens = await contractRNB_TO.transfer(AddressUser, _amountToUnits);
                }
                axios.post(URL_API+"/updateStatusTransaction/"+_id+"/completed/"+transferTokens.hash, {headers: {'Access-Control-Allow-Origin': '*'}}, {params: {value: _amountToWithFees}}).then((res) => console.log(res));
                notify("success", "Completed. Hash: "+short(transferTokens.hash));
                reload(5);
            }catch (err){
                console.log(err);
                notify("error", "Something went wrong: "+err.data.message);
            }
        }else{
            _amountToWithoutFees = (_amountTo+(1*_amountTo/100));
            _amountToUnits = utils.parseUnits(parseFloat(_amountToWithoutFees).toFixed(_decimalsTokenTo), _decimalsTokenTo);
            _amountToWithFees = (_amountToWithoutFees-(1*_amountToWithoutFees/100));
            
                transferTokens = await contractRNB_TO.transferTokens(AddressUser, _tokenToAddress, _amountToUnits, hashID);
                await transferTokens.wait();
                axios.post(URL_API+"/updateStatusTransaction/"+_id+"/completed/"+transferTokens.hash, {headers: {'Access-Control-Allow-Origin': '*'}}, {params: {value: _amountToWithFees}}).then((res) => console.log(res));
                notify("success", "Completed. Hash: "+short(transferTokens.hash));
                reload(5);

                try{
            }catch (err){
                notify("error", "Something went wrong: "+err.data.message);
            }
        }   
    
}

const addLiquidity = async (e, _amount) => {
    e.preventDefault();
    let _network, _decimalsTokenFrom;
    _network = localStorage.getItem("NetworkFrom");
    let token = Tokens[localStorage.getItem("AddLiquidityToken")];
    _amount = $("#"+_amount).val();
    const Providers = await MainProvider();
    if(Number(_amount) <= 0){
        notify("error", "The amount must be greater than 0");
        return;
    }

    if(Number(_amount) > token[_network].MyBalance){
        notify("error", "No enough balance! \n\n\nYou have only "+CurrencyFormat(token[_network].MyBalance)+" "+token.Symbol+"s in your wallet!");
        return;
    }

    
    notify("info", "Step 1: You need to allow us to use your "+token.Symbol+" tokens!");
    _decimalsTokenFrom = Tokens[localStorage.getItem("AddLiquidityToken")][_network].Decimals;
    let _token = contracts[_network][localStorage.getItem("AddLiquidityToken")].address;
    const contractRNB = SignContract(contracts[_network].RNB.address, contracts[_network].RNB.abi, Providers.signer);
    const contract = SignContract(_token, getABI(_token, _network), Providers.signer);
    try{  
    const Allowence = await contract.approve(contracts[_network].RNB.address, ethers.utils.parseUnits(_amount, _decimalsTokenFrom));
    setIsLoading(true);
    await Allowence.wait();
        if(Allowence.hash){
            notify("info", "Step 2: Now you need to approve this transaction!");
                contractRNB.addLiquidity(ethers.utils.parseUnits(_amount, _decimalsTokenFrom), _token, ethers.utils.parseUnits(_amount, 18)).then((res) => {
                setIsLoading(false);
                notify("success", "Completed! Hash: "+short(res.hash));
                load(res.hash);
                reload(5);
            })    
        }
    } catch (err){
        notify("error", "Something went wrong: "+err.data.message);
    }
}

const reload = (_time) => {
    setTimeout(() => {window.location.reload()}, _time*1000);
}
const setLoading = (_time, _bool) => {
    setTimeout(() => {setIsLoading(_bool)}, _time*1000);
}

const removeLiquidity = async (e, _token, _amount) => {
    e.preventDefault();
    const Providers = await MainProvider();
    notify("info", "Approve this transaction to get back your liquidity");
    let _network, _decimalsTokenFrom;
    _network = localStorage.getItem("NetworkFrom");
    _decimalsTokenFrom = Tokens[_token][_network].Decimals;
    _token = contracts[_network][_token].address;
    _amount = parseFloat(_amount).toFixed(_decimalsTokenFrom)

        const contractRNB = SignContract(contracts[_network].RNB.address, contracts[_network].RNB.abi, Providers.signer);
            contractRNB.removeLiquidity(ethers.utils.parseUnits(_amount, _decimalsTokenFrom), _token).then((res) => {
            notify("success", "Completed! Hash: "+short(res.hash));
            reload(5);
        }).catch ((err) => {
        notify("error", "Something went wrong: "+err.data.message);
    })
}

const PayLPToken = async (_token, _network) => {
    const Providers = await MainProvider();
    const contractRNB = SignContract(contracts[_network].RNB.address, contracts[_network].RNB.abi, Providers.signer);
    try{
        const res = await contractRNB.payFeeToLP(_token);
        notify("success", "Completed! Hash: "+short(res.hash));
        reload(10);
    }catch(err){
        notify("error", "Something went wrong: "+err.data.message);
    }
}

const ClaimRewards = async (e, _token, _network) => {
    const Providers = await MainProvider();
    _token = contracts[_network][_token].address;
    const RonixContract = SignContract(contracts[_network].RNB.address, contracts[_network].RNB.abi, Providers.signer);
    try{
    const res = await RonixContract.claimRewardsLP(_token);
        notify("success", "Completed! Hash: "+short(res.hash));
        reload(10);
    }catch(err){
        notify("error", "Something went wrong: "+err.data.message);
    }
}


const SelectToken = (_token, _close, _d) => {
    setUSER((prevState) => ({ ...prevState, [_d]: _token })); 
    localStorage.setItem(_d, _token);
    document.querySelector("#bridge_to_token_amount").value = "";
    document.querySelector("#bridge_from_token_amount").value = "";
    _close.call();
}


const MetaMaskImportNetwork = (Network) => {
    console.log(Network)
    ethereum.request({ 
        method: "wallet_addEthereumChain",
        params: [{
            chainId: `0x${Number(Network.ChainId).toString(16)}`,
            chainName: Network.Name,
            nativeCurrency: {
                name: Network.Name,
                symbol: Network.Title,
                decimals: Network.Decimals
            },
            rpcUrls: [Network.RpcUrls],
            blockExplorerUrls: [Network.BlockExplorerUrls]
        }]
    })
}

const CreateFreeRonRequest = async (e) => {
e.preventDefault();
let addr = localStorage.getItem("userAddress");
addr = addr.replace("ronin", "0x");
const userID = await axios.post(URL_API+"/createFreeRonRequest/", {headers: {'Access-Control-Allow-Origin': '*'}}, {params: {addr: addr}});
localStorage.setItem('SessionID', userID.data);
notify("success", "Request done successfully! You will receive 0.0005 RON tokens in your wallet!");
reload(5);


}

const SelectNetwork = (_network, _close, _d) => {
    
    if(_d === "NetworkFrom"){
        localStorage.removeItem('TokenFrom');
        window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{
                chainId: `0x${Number(Networks[_network].ChainId).toString(16)}`
                    }]
        }).catch((err) => {
            MetaMaskImportNetwork(Networks[_network])

        });
    }
    const oldNetwork = localStorage.getItem(_d, _network);
    setUSER((prevState) => ({ ...prevState, [_d]: _network })); 
    localStorage.setItem(_d, _network);
    _close.call();
    if(_d === "NetworkTo" && _network !== oldNetwork) {
        localStorage.removeItem('TokenTo');
        window.location.reload()}
}

    const pendingTx = async () => { 
    const NetworkFrom = localStorage.getItem("NetworkFrom");
    const NetworkTo = localStorage.getItem("NetworkTo");
    const NewTx = localStorage.getItem("NewTx");
    if(NewTx){
        try{
        const res = await axios.post(URL_API+"/transferTokens/"+NewTx);
                localStorage.removeItem('NewTx');   
        }catch(err){
            console.log(err);
        }
    }  
    }

    const listenToBlockchain = async () => {
    const NetworkTo = localStorage.getItem("NetworkTo");
    if(NetworkTo !== "RON"){

        const connTo = connectProxyNetwork(Networks[NetworkTo].RpcUrls);
        const contract = SignContract(contracts[NetworkTo].RNB.address, getABI(contracts[NetworkTo].RNB.address, [NetworkTo]), connTo.signer);
        contract.on("Transfers", (to, name, amount, network, hash) => {
            notify("info", "New Tx");
            axios.get(URL_API+"/getTransactionByHash/"+hash).then((r) => {
                let tokenToDecimals = r.data[0].tokenToDecimals;
                let amountSent = utils.formatUnits(amount, tokenToDecimals);
                axios.post(URL_API+"/updateTxFinalPrice/"+hash, {}, {params: {amount:amountSent}}).then((res) => {
                    localStorage.removeItem('NewTx');
                })
            });
            
        });
    }
    }

    useEffect(async () => {
        listenToBlockchain();
        pendingTx();
        TokenPrices();
        checkWalletConnected()
        GetAllTransactions();
        const IsWrongNetwork = await WrongNetwork();
        if(IsWrongNetwork){
            loading("Wrong network on your Metamask");
        }
        
    }, [])
return (
    <MainChain.Provider
    value={{
        connectWallet,
        CurrencyFormat,
        CurrencyFormatDecimals,
        addLiquidity,
        checkWalletConnected,
        USER,
        MainProvider,
        MetaMaskImportNetwork,
        connectProxyNetwork,
        contracts,
        SignContract,
        InitiateBridge,
        Tokens,
        Networks,
        SelectToken,
        SelectNetwork,
        setUSER,
        CalculatePairToken,
        getABI,
        BigNumber,
        removeLiquidity,
        PayLPToken,
        connectProxyNetworkRON,
        ADMIN,
        ClaimRewards,
        MoneyFormat,
        notify,
        isLoading,
        Transactions,
        getTokenByAddressReturnName,
        confirmTransaction,
        revertTransaction,
        CreateFreeRonRequest,
        URL_API,
        confirmFreeRonRequest,
        TKAddress,
        UnderstandRisks,
        GetLiquidityToken,
        short
    }}>
       {children} 
    </MainChain.Provider>
)
}