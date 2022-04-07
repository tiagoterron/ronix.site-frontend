import React, { useState, useContext, useEffect } from 'react'
import { MdSyncAlt, MdWarning } from 'react-icons/md';
import { Container, Modal, Button } from 'react-bootstrap';
import { ethers, utils, Wallet } from "ethers";
import { MyBalance, FreeRon } from './'
import './bridge.scss';
import $ from 'jquery';
import { MainChain } from '../context/MainChain';
import { images } from '../constants';
import { addGlobalEventListener, qs, qsa, sleep } from '../lib/functions.js';

const getNetworkById = (_id, _network) => {
    if(_id == _network.BSC.ChainId) return _network.BSC;
    if(_id == _network.ETH.ChainId) return _network.ETH;
    if(_id == _network.RON.ChainId) return _network.RON;
    if(_id == _network.MATIC.ChainId) return _network.MATIC;
    if(_id == _network.AVAX.ChainId) return _network.AVAX;
}

const TxDetails = () => {
    const { MainProvider, Networks, contracts, Tokens, CurrencyFormat, GetTokenPrice, GetLiquidityToken } = useContext(MainChain);
    const [change, isChange] = useState(false);
    const [gasPrice, setGasPrice] = useState();
    const [LiquidityToken, setLiquidityToken] = useState(0);
    let LiquidityTokenTo;
    const TokenFrom = localStorage.getItem('TokenFrom');
    const TokenTo = localStorage.getItem('TokenTo');
    const NetworkTo = localStorage.getItem('NetworkTo');
    const TokenAmountTo = 0;
    const GasPrice = 0;
    const Amount = 1;
    useEffect(async () => {
        try{
        const Providers = await MainProvider();
        const UserNetwork = Providers.network;
        const GasPrice = await Providers.provider.getGasPrice();
        setGasPrice(utils.formatUnits(GasPrice, 'wei').toString());
        isChange(true);
        }catch(err){
            
        }
    }, [change]);

    useEffect(async () => {
        LiquidityTokenTo = await GetLiquidityToken(NetworkTo, TokenTo);
        setLiquidityToken(CurrencyFormat(utils.formatUnits(LiquidityTokenTo, Tokens[TokenTo][NetworkTo].Decimals)));
        isChange(true);
    }, [localStorage.getItem("TokenTo")]);

    return(
        <>
        {change &&
        <>
        <div className="HSUOKDFNPEM">
                  <ul>
                      <li>You get approximately: <span id="span__SHUHSOQIJWSQ">0</span> {TokenTo}</li>
                      <li>The Crosschain Fee is 1% + Gas fee</li>
                      <li>Gas Price: {gasPrice} wei</li>
                      
                  </ul>
            <ul>
                <li>Available supply: {LiquidityToken} {TokenTo}</li>
                <li>Price of {TokenFrom}: {Tokens[TokenFrom].Price} USD</li>
                {TokenFrom !== TokenTo && 
                <li>Price of {TokenTo}: {Tokens[TokenTo].Price} USD</li>
                }
                </ul>
            <ul>
                <li>Minimum Crosschain Amount is {CurrencyFormat(Tokens[TokenFrom].Min)} {TokenFrom}</li>
                <li>Maximum Crosschain Amount is {CurrencyFormat(Tokens[TokenFrom].Max)} {TokenFrom}</li>
                <li>Estimated Time of Crosschain Arrival Between 10-30 min</li>
            </ul>
            </div>
            </>
        }
        </>
    );
}

const NetworkFrom = ({Open}) => {
    const { USER, MainProvider, Networks, setUSER } = useContext(MainChain);
    const [CurrentNetwork, setCurrentNetwork] = useState(false);
    let CurrentNetworks, NetworkFrom;

    useEffect(async () => {
        const Providers = await MainProvider();
        const UserNetwork = Providers.network;
        let isConnectedToRightNetwork = false;
        for (var prop in Networks) {
            if(Networks[prop].ChainId === UserNetwork){
                isConnectedToRightNetwork = true;
                NetworkFrom = localStorage.setItem('NetworkFrom', prop);
                setCurrentNetwork(CurrentNetworks);
            break;
            }
        }
        
    }, [])
   NetworkFrom = Networks[localStorage.getItem('NetworkFrom')];

    return(
        <>
    <div className='jAV23vRy'>
    <div className="cauxVV">
        <div className='fMTTarfawv'>
            <button className='hDctQE'  onClick={e => Open(e)}>
                <span className="iyIEoz">
                    <div className="uWOqW">
                    <img src={NetworkFrom.Logo} className="sc-hy2v6e-0 kotaxM" style={{color: "var(--primary-color)"}} />
                    <span className="dbsTEZ">{NetworkFrom.Symbol}</span>
                    </div>
                    <i className="fa fa-caret-down icons" aria-hidden="true"></i>
                </span>
            </button>  
        </div>
    </div>
</div>
</>
);

};

const NetworkTo = ({Open}) => {
    const { USER, MainProvider, Networks } = useContext(MainChain);
    let NetworkTo;
    if(!localStorage.getItem('NetworkTo')){
        NetworkTo = Networks[localStorage.setItem('NetworkTo', 'BSC')];
    }else{
        NetworkTo = Networks[localStorage.getItem('NetworkTo')];
    }
    return(
    <div className='jAV23vRy'>
    <div className="cauxVV">
        <div className='fMTTarfawv'>
            <button className='hDctQE'  onClick={e => Open(e)}>
                <span className="iyIEoz">
                    <div className="uWOqW">
                    <img src={NetworkTo.Logo} className="sc-hy2v6e-0 kotaxM" style={{color: "var(--primary-color)"}} />
                    <span className="dbsTEZ">{NetworkTo.Symbol}</span>
                    </div>
                    <i className="fa fa-caret-down icons" aria-hidden="true"></i>
                </span>
            </button>  
        </div>
    </div>

</div>
);
};

const selectMaxBalance = (Tokens, token, network, id) => {
    const Balance = Tokens[token][network].MyBalance ?? 0;
    document.querySelector("#"+id).value = Balance;

}

const TokenFrom = ({Open}) => {
    const { MainProvider, Tokens, contracts, USER, CalculatePairToken } = useContext(MainChain);
    let TokenFrom;
    const [loaded, isLoaded] = useState(false);
    const NetworkFrom = localStorage.getItem('NetworkFrom');
    useEffect(async () => {
        if(!localStorage.getItem('TokenFrom')){
        for (var prop in contracts[NetworkFrom]) {
            if(contracts[NetworkFrom][prop].Status)
            TokenFrom = localStorage.setItem('TokenFrom', prop);
            break;
        }
        }
        isLoaded(true);
    }, []);
    TokenFrom = Tokens[localStorage.getItem('TokenFrom')];
    return (
        <>
        {loaded &&
        <div className='jAVvRy'>
        <div className="cauxVV">
            <div className='fMTTav'>
                <button className='hDctQE'  onClick={e => Open(e)}>
                    <span className="iyIEoz">
                        <div className="uWOqW">
                        <img src={TokenFrom.Logo} className="sc-hy2v6e-0 kotaxM" style={{color: "var(--primary-color)"}} />
                        <span className="dbsTEZ">{TokenFrom.Title}</span>
                        </div>
                        <i className="fa fa-caret-down icons" aria-hidden="true"></i>                            </span>
                </button>  
                <button className="btn__msxSHUSHDUIWDE" onClick={(e) => selectMaxBalance(Tokens, localStorage.getItem('TokenFrom'), NetworkFrom, 'bridge_from_token_amount')}>Max</button>
                <input type="text" className="fsxHxP"  placeholder="0" id="bridge_from_token_amount"  onChange={e => CalculatePairToken(e, localStorage.getItem('TokenFrom'), localStorage.getItem('TokenTo'), true)} autoComplete="off" autoCorrect="off" placeholder="0" minLength="1" maxLength="79" spellCheck="false" />  
                <div className="Label__JHUDhIDHIu">{TokenFrom.Symbol}</div>
            </div>
        </div>
    </div>
    }
     </>
    );
}

const TokenTo = ({Open}) => {
    const { MainProvider, Tokens, contracts, USER, CalculatePairToken } = useContext(MainChain);
    let TokenTo;
    const [loaded, isLoaded] = useState(false);
    const NetworkTo = localStorage.getItem('NetworkTo');
    useEffect(async () => {
        if(!localStorage.getItem('TokenTo')){
        for (var prop in contracts[NetworkTo]) {
            if(contracts[NetworkTo][prop].Status)
            TokenTo = localStorage.setItem('TokenTo', prop);
            break;
        }
        }
        isLoaded(true);
    }, []);
    TokenTo = Tokens[localStorage.getItem('TokenTo')];
    return (
        
        <>
        {loaded &&
        <div className='jAVvRy'>
        <div className="cauxVV">
            <div className='fMTTav'>
                <button className='hDctQE'  onClick={e => Open(e)}>
                    <span className="iyIEoz">
                        <div className="uWOqW">
                        <img src={TokenTo.Logo} className="sc-hy2v6e-0 kotaxM" style={{color: "var(--primary-color)"}} />
                        <span className="dbsTEZ">{TokenTo.Title}</span>
                        </div>
                        <i className="fa fa-caret-down icons" aria-hidden="true"></i>                            </span>
                </button>  
                <input type="text" className="fsxHxP"  placeholder="0" id="bridge_to_token_amount" data-limit='false' onChange={e => CalculatePairToken(e, localStorage.getItem('TokenTo'), localStorage.getItem('TokenFrom'), false)} autoComplete="off" autoCorrect="off" placeholder="0" minLength="1" maxLength="79" spellCheck="false" />  
                <div className="Label__JHUDhIDHIu">{TokenTo.Symbol}</div>
            </div>
            
        </div>
        
    </div>
    }
    </>

    );
}

const SelectNetworkFrom = ({CloseModal}) => {
    const { USER, MainProvider, Networks, SelectNetwork } = useContext(MainChain);
    let NetworkFrom = localStorage.getItem("NetworkFrom");
    let NetworkTo = localStorage.getItem("NetworkTo");
    let NetworkFromStatus;
    return(
    <>
    {Object.keys(Networks).map((item, i) => {
    NetworkFromStatus = Networks[item].Status;
    if(NetworkFromStatus === true){

        return(
        
            <a href={void(0)} onClick={() => SelectNetwork(Networks[item].Symbol, CloseModal, 'NetworkFrom')} className={`jXPLWUf88fwa ${NetworkFrom == Networks[item].Symbol && "f8fa9wf8awf"}`} alt="" key={i}>
                <div className="jXPLWU Bridge__Modal_Tokens">
                    <img src={Networks[item].Logo} className="sc-hy2v6e-0 kotaxM" />
                    <div className="sc-1c91p6c-0 fTQuos">
                    <div title="Ronin" className="css-193chej">{Networks[item].Symbol}</div>
                    <div className="sc-kAzzGY jgneKc css-cm9dpx">{Networks[item].Name}</div>
                </div>
                <span></span>
                <div className="sc-chPdSV sc-i48ta6-0 sc-i48ta6-4 uWOqW font-semibold"></div>
                </div>
                </a>
        
            )
    }else{
        return(
        
            
                <div className="jXPLWU Bridge__Modal_Tokens Networks__ComingSoon__SHJUHAUS"  key={i}>
                    <img src={Networks[item].Logo} className="sc-hy2v6e-0 kotaxM" />
                    <div className="sc-1c91p6c-0 fTQuos">
                    <div title="Ronin" className="css-193chej">{Networks[item].Symbol}</div>
                    <div className="sc-kAzzGY jgneKc css-cm9dpx">{Networks[item].Name}</div>
                </div>
                <span className="span__SUAHUIhIQW">(Coming soon)</span>
                <div className="sc-chPdSV sc-i48ta6-0 sc-i48ta6-4 uWOqW font-semibold"></div>
                </div>
        
            ) 
    }
        })}
        </>
           );
    };

    const SelectNetworkTo = ({CloseModal}) => {
        const { USER, MainProvider, Networks, SelectNetwork } = useContext(MainChain);
        let NetworkFrom = localStorage.getItem("NetworkFrom");
        let NetworkTo = localStorage.getItem("NetworkTo");
        let NetworkToStatus;
        return(
        <>
        {Object.keys(Networks).map((item, i) => {
            // if(Networks[item].Status === false) return;
            NetworkToStatus = Networks[item].Status;
            if(NetworkToStatus === true){
            return(
        <a href={void(0)} onClick={() => SelectNetwork(Networks[item].Symbol, CloseModal, 'NetworkTo')} className={`jXPLWUf88fwa ${NetworkTo == Networks[item].Symbol && "f8fa9wf8awf"}`} alt="" key={i}>
            <div className="jXPLWU Bridge__Modal_Tokens">
                <img src={Networks[item].Logo} className="sc-hy2v6e-0 kotaxM" />
                <div className="sc-1c91p6c-0 fTQuos">
                <div title="Ronin" className="css-193chej">{Networks[item].Symbol}</div>
                <div className="sc-kAzzGY jgneKc css-cm9dpx">{Networks[item].Name}</div>
            </div>
            <span></span>
            <div className="sc-chPdSV sc-i48ta6-0 sc-i48ta6-4 uWOqW font-semibold"></div>
            </div>
            </a>
          )
        }else{
            return(
        
            
                <div className="jXPLWU Bridge__Modal_Tokens Networks__ComingSoon__SHJUHAUS" key={i}>
                    <img src={Networks[item].Logo} className="sc-hy2v6e-0 kotaxM" />
                    <div className="sc-1c91p6c-0 fTQuos">
                    <div title="Ronin" className="css-193chej">{Networks[item].Symbol}</div>
                    <div className="sc-kAzzGY jgneKc css-cm9dpx">{Networks[item].Name}</div>
                </div>
                <span className="span__SUAHUIhIQW">(Coming soon)</span>
                <div className="sc-chPdSV sc-i48ta6-0 sc-i48ta6-4 uWOqW font-semibold"></div>
                </div>
        
            ) 
        }
        })}
            
            </>
               );
        };

    const SelectTokenFrom = ({CloseModal}) => {
        const { Tokens, SelectToken, contracts } = useContext(MainChain);
        let TokenFrom = localStorage.getItem("TokenFrom");
        let NetworkFrom = localStorage.getItem("NetworkFrom");
        return(
        <>
      {Object.keys(Tokens).map((item, i) => {
          if(contracts[NetworkFrom][Tokens[item].Symbol].Status === false) return;
          if(contracts[NetworkFrom][Tokens[item].Symbol].address === 0) return;
        return(
        <a href={void(0)} onClick={() => SelectToken(Tokens[item].Symbol, CloseModal, 'TokenFrom')} className={`jXPLWUf88fwa ${TokenFrom == Tokens[item].Symbol && "f8fa9wf8awf"}`} alt="" key={i}>
            <div className="jXPLWU Bridge__Modal_Tokens">
                <img src={Tokens[item].Logo} className="sc-hy2v6e-0 kotaxM" />
                <div className="sc-1c91p6c-0 fTQuos">
                <div title="Ronin" className="css-193chej">{Tokens[item].Title}</div>
                <div className="sc-kAzzGY jgneKc css-cm9dpx">{Tokens[item].Name}</div>
            </div>
            
            <span></span>
            <div className="sc-chPdSV sc-i48ta6-0 sc-i48ta6-4 uWOqW font-semibold"></div>
            </div>
            </a>
    )})}
            </>
               );
        };

        const SelectTokenTo = ({CloseModal}) => {
            const { USER, MainProvider, Tokens, SelectToken, contracts } = useContext(MainChain);
            let TokenTo = localStorage.getItem("TokenTo");
            let NetworkTo = localStorage.getItem("NetworkTo");
            return(
            <>
          {Object.keys(Tokens).map((item, i) => {
            if(contracts[NetworkTo][Tokens[item].Symbol].Status === false) return;
            if(contracts[NetworkTo][Tokens[item].Symbol].address == 0) return;
              return(
            <a href={void(0)} onClick={() => SelectToken(Tokens[item].Symbol, CloseModal, 'TokenTo')} className={`jXPLWUf88fwa ${TokenTo == Tokens[item].Symbol && "f8fa9wf8awf"}`} alt="" key={i}>
                <div className="jXPLWU Bridge__Modal_Tokens">
                    <img src={Tokens[item].Logo} className="sc-hy2v6e-0 kotaxM" />
                    <div className="sc-1c91p6c-0 fTQuos">
                    <div title="Ronin" className="css-193chej">{Tokens[item].Title}</div>
                    <div className="sc-kAzzGY jgneKc css-cm9dpx">{Tokens[item].Name}</div>
                </div>
                
                <span></span>
                <div className="sc-chPdSV sc-i48ta6-0 sc-i48ta6-4 uWOqW font-semibold"></div>
                </div>
                </a>
          )})}
                </>
                   );
            };

const Bridge = () => {
    const {InitiateBridge, USER, connectWallet, ADMIN, checkWalletConnected, UnderstandRisks} = useContext(MainChain);
    const [showTokensFrom, setShowTokensFrom] = useState(false);
    const [showTokensTo, setShowTokensTo] = useState(false);
    const [showNetworksFrom, setShowNetworksFrom] = useState(false);
    const [showNetworksTo, setShowNetworksTo] = useState(false);

    const handleCloseModalTokensFrom = (e) => {setShowTokensFrom(false)};
    const handleShowModalTokensFrom = (e) => {e.preventDefault();setShowTokensFrom(true)};

    const handleCloseModalTokensTo = (e) => {setShowTokensTo(false)};
    const handleShowModalTokensTo = (e) => {e.preventDefault();setShowTokensTo(true)};

    const handleCloseModalNetworksFrom = (e) => {setShowNetworksFrom(false)};
    const handleShowModalNetworksFrom = (e) => {e.preventDefault();setShowNetworksFrom(true)};

    const handleCloseModalNetworksTo = (e) => {setShowNetworksTo(false)};
    const handleShowModalNetworksTo = (e) => {e.preventDefault();setShowNetworksTo(true)};
    let userAddress = localStorage.getItem("userAddress");
    let isRon = localStorage.getItem("NetworkFrom");
    const [isConnected, setIsConnected] = useState(false);
    useEffect(async () => {
        const isConnected = await checkWalletConnected();
        if(isConnected) setIsConnected(true);
    }, [])
  return (
    
    <div className="bridge__container">
        {(isRon === "RON") && (userAddress !== ADMIN.address) ?
        <FreeRon /> : ""
        }
        {isConnected &&
        <MyBalance />
    }
        
      <div className="dnJGkr bridge__container_box">
      <div className="kEiMDz eycoH d-flex justify-content-evenly">
          <div className="etZQAu mx-2">
          
          
            </div>
            <div className="title-text  flex-grow-1 bd-highlight"><MdSyncAlt /> Bridge / Crosschain Network</div>
            <div className="Bridge__HYUOIEIKDF mx-2">
                <div className="Bridge__SHUSHLFMNLJF"><img width="35px" src={images[localStorage.getItem("NetworkFrom")]} alt="" /></div>
                <div className="Bridge__SHUSHLFMNLJF"><i className="fa fa-arrow-right" aria-hidden="true"></i></div>
                <div className="Bridge__SHUSHLFMNLJF"><img width="35px" src={images[localStorage.getItem("NetworkTo")]} alt="" /></div>
            </div>
            </div>
      <hr className="sc-bqyKOL gSuxaX"></hr>
      <div className="bridge__SOPASKPAOS">
      <div className="sc-17a89k0-4 fMTTav bridge__box bridge__child_SOPASKPAOS">
       <NetworkFrom Open={e=> handleShowModalNetworksFrom(e)} />
           <TokenFrom Open={e=>handleShowModalTokensFrom(e)} />
            
          </div>
          
          
          <div className="sc-17a89k0-5 sc-17a89k0-6 MsItq">
              <div className="sc-chPdSV sc-i48ta6-0 sc-i48ta6-1 epDTIA">
                  <span></span>
                  <div className="sc-kAzzGY jgneKc css-djrxae">
                  <i className="fa fa-arrow-down" aria-hidden="true"></i>                    </div>
                </div>
            </div>
            <div className="sc-17a89k0-4 fMTTav bridge__box bridge__child_SOPASKPAOS">
       <NetworkTo Open={e => handleShowModalNetworksTo(e)} />
           <TokenTo Open={e => handleShowModalTokensTo(e)} />
            
          </div>
          </div>
          <form className="form-inline" id="FormInitiateBridge"  onSubmit={e => InitiateBridge(e)}>
          <div className="Label__JHUDFUHFhIDHIu" id="Label__JHUDFUHFhIDHIu">
              <div>...</div>
            </div>
            <hr className="sc-bqyKOL gSuxaX"></hr>
              <TxDetails />
          <div className="fMTTav bridge__box">
            <div className='jAVvR2y'>
            {USER.address ?
            <button type="submit" className="btn__main  btn__load" id='id__HSHUDOPQW'>Swap
            </button>
            :
            <button type="submit" className="btn__main  btn__load" id="btn_USUYWUWDYWGDYWU"  onClick={connectWallet}>CONNECT YOUR WALLET</button>
        }
            </div>
        </div> 
        {!localStorage.getItem('UnderstandRisks') &&
        <div className="caution_HSUHUD">
        <MdWarning className='icon_SUHS' /> Ronix is an experimental project. Take your own risks. <button onClick={UnderstandRisks} className="btn__risks" id='id__HSHUDOPQW'>Ok</button>
        </div>
        }
        </form>
  </div>
  <div className="bridge__modal">

      <Modal show={showTokensFrom} onHide={e => handleCloseModalTokensFrom(e)} animation={false}>
        <Modal.Header>
          <Modal.Title>Select a token</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <SelectTokenFrom CloseModal={e => handleCloseModalTokensFrom(e)} />            
        </Modal.Body>
      </Modal>

      <Modal show={showTokensTo} onHide={e => handleCloseModalTokensTo(e)} animation={false}>
        <Modal.Header>
          <Modal.Title>Select a token</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <SelectTokenTo CloseModal={e => handleCloseModalTokensTo(e)} />            
        </Modal.Body>
      </Modal>


      <Modal show={showNetworksFrom} onHide={e=> handleCloseModalNetworksFrom(e)} animation={false}>
        <Modal.Header>
          <Modal.Title>Select a network</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <SelectNetworkFrom CloseModal={e=>handleCloseModalNetworksFrom(e)} />
        </Modal.Body>
      </Modal>

      <Modal show={showNetworksTo} onHide={e=>handleCloseModalNetworksTo(e)} animation={false}>
        <Modal.Header>
          <Modal.Title>Select a network</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <SelectNetworkTo CloseModal={e=>handleCloseModalNetworksTo(e)} />
        </Modal.Body>
      </Modal>
      
    </div>
    </div>
  )
}

export default Bridge