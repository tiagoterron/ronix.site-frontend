import React, { useState, useContext, useEffect } from 'react'
import { Container, Modal, Button, Row, Col } from 'react-bootstrap';
import { MdSyncAlt, MdWarning } from 'react-icons/md';
import { ethers, utils, Wallet } from "ethers";

import './addliquidity.scss';
import $ from 'jquery';
import { MainChain } from '../context/MainChain';
import { images } from '../constants';

const getNetworkById = (_id, _network) => {
    if(_id == _network.BSC.ChainId) return _network.BSC;
    if(_id == _network.ETH.ChainId) return _network.ETH;
    if(_id == _network.RON.ChainId) return _network.RON;
    if(_id == _network.MATIC.ChainId) return _network.MATIC;
    if(_id == _network.AVAX.ChainId) return _network.AVAX;
}

const AddLiquidityToken = ({Open, Opt, id}) => {
    const { MainProvider, Tokens, USER, CalculatePairToken } = useContext(MainChain);
    let AddLiquidityToken = localStorage.getItem(Opt) == null ? "SLP" : localStorage.getItem(Opt);
    let NetworkFrom = localStorage.getItem("NetworkFrom");
    useEffect( async () => {
        // console.log(AddLiquidityToken); 
        }, [])
    return (
        <div className='jAVvRy'>
        <div className="cauxVV">
            <div className='fMTTav'>
                <a className='hDctQE'  onClick={e => Open(e)}>
                    <span className="iyIEoz">
                        <div className="uWOqW">
                        <img src={Tokens[AddLiquidityToken].Logo} className="sc-hy2v6e-0 kotaxM" style={{color: "var(--primary-color)"}} />
                        <span className="dbsTEZ">{Tokens[AddLiquidityToken].Title}</span>
                        </div>
                        <i className="fa fa-caret-down icons" aria-hidden="true"></i>                            </span>
                </a>  
                <button type="button" className="btn__msxSHUSHDUIWDE" onClick={(e) => selectMaxBalance(Tokens, AddLiquidityToken, NetworkFrom, id)}>Max</button>
                <input type="text" className="fsxHxP"   placeholder="0" id={id} />  
            </div>
            
        </div>
        
    </div>
    );
}
const LoadModal = ({Open, Close, Title, Body}) => {
    return(
<Modal show={Open} onHide={e => Close(e)} animation={false}>
        <Modal.Header>
          <Modal.Title>{Title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {Body == "add" ? <SelectTokenAddLiquidity CloseModal={Close} Opt="AddLiquidityToken" /> : <SelectTokenAddLiquidity CloseModal={Close} Opt="RemoveLiquidityToken"  />}          
        </Modal.Body>
      </Modal>
    );
    
}  
const SelectTokenAddLiquidity = ({CloseModal, Opt}) => {
    const { Tokens, SelectToken, contracts } = useContext(MainChain);
    let LPToken = localStorage.getItem(Opt) == null ? "SLP" : localStorage.getItem(Opt);
    let NetworkFrom = localStorage.getItem("NetworkFrom");
    useEffect(async () => {
    // console.log(Opt); 
    }, [])
    return(
    <>
  {Object.keys(Tokens).map((item, i) => {
    if(contracts[NetworkFrom][Tokens[item].Symbol].address == 0) return;
    if(contracts[NetworkFrom][Tokens[item].Symbol].Status === false) return;
    return(
    <a href={void(0)} onClick={() => SelectToken(Tokens[item].Symbol, CloseModal, Opt)} className={`jXPLWUf88fwa ${LPToken == Tokens[item].Symbol && "f8fa9wf8awf"}`} alt="" key={i}>
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

    const selectMaxBalance = (Tokens, token, network, id) => {
        const Balance = Tokens[token][network].MyBalance ?? 0;
        document.querySelector("#"+id).value = Balance;
    
    }
        

const AddLiquidity = () => {
    const { MainProvider, Transactions, USER, UnderstandRisks, InitiateBridge, connectProxyNetwork, connectProxyNetworkRON, contracts, SignContract, getABI, BigNumber, Networks, addLiquidity, removeLiquidity } = useContext(MainChain);
    const [OpenModalADD, setOpenModalADD] = useState(false);
    const HandleOpenModalADD = (e) => {setOpenModalADD(true)};
    const HandleCloseModalADD = (e) => {setOpenModalADD(false)};

    let NetworkFrom, NetworkTo, userAddress;
        NetworkFrom = localStorage.getItem("NetworkFrom");
        NetworkTo = localStorage.getItem("NetworkTo");
        userAddress = localStorage.getItem("userAddress");  
  return (
    <Row>
        {
        (USER.address !== "undefined" && NetworkFrom !== "RON") &&
        <>
        <Col md={12}>
            
        <div className="dQdmym">
        <div className="dXbYox">
        <div className="dnJGkr">
        <div className="kEiMDz eycoH d-flex justify-content-evenly">
            
                <div className="title-text  flex-grow-1 bd-highlight"> Add Liquidity: {Networks[NetworkFrom].Name}</div>
                <div className="etZQAu mx-2">
                    <img width="35px" src={images[NetworkFrom]} alt="" />
                </div>
                </div>
        <hr className="sc-bqyKOL gSuxaX"></hr>
        <div className="ISOKDFOIJDJD"><MdWarning className='icon_SUFDJUIsIHS' /> Earn Rewards as a Liquidity Provider</div>
        <form className="form-inline" id="form-stake-busd" onSubmit={e => addLiquidity(e, "add_liquidity_token_amount")}>
      <div className="sc-17a89k0-4 fMTTav bridge__box">
           <AddLiquidityToken Opt="AddLiquidityToken" id="add_liquidity_token_amount" Open={e=>HandleOpenModalADD(e)} />
          </div>
          <hr className="sc-bqyKOL gSuxaX"></hr>
              <div className="HSUOKDFNPEM">
                  <ul>
                      <li>Liquidity providers receive 0.9% of every transaction.</li>
                      <li>Those who provide liquidity only earn rewards in the asset and in the network where they stake.</li>
                      <li>The liquidity providers can withdraw their funds whenever they want if there is enough liquidity in the pool.</li>
                      <li>We award rewards every day and you can claim them right away.</li>
                  </ul>
            </div>
          <div className="fMTTav bridge__box">
            <div className='jAVvR2y'>
            <button type="submit" className="btn__main btn__load" id="btn_UIUXOQiOHJSQ">FARM / STAKE</button>

            </div>
        </div>
        {!localStorage.getItem('UnderstandRisks') &&
        <div className="caution_HSUHUD">
        <MdWarning className='icon_SUHS' /> Ronix is an experimental project. Take your own risks. <button onClick={UnderstandRisks} className="btn__risks" id='id__HSHUDOPQW'>Ok</button>
        </div>
        }
        </form>

  <div className="bridge__modal">
      <LoadModal Open={OpenModalADD} Close={HandleCloseModalADD} Title={"Select an asset:"} Body="add" />
    </div>
    </div>
        </div>
        </div>
        </Col>
        </> }
        </Row>
    
  )
}

export default AddLiquidity