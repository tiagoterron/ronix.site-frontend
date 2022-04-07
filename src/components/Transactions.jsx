import React, { useState, useContext, useEffect } from 'react'
import { Container, Modal, Button, Row, Col } from 'react-bootstrap';
import { BsFillCheckCircleFill, BsPatchExclamationFill } from "react-icons/bs";
import { ethers, utils, Wallet } from "ethers";
import './transactions.scss';
import $ from 'jquery';
import { MainChain } from '../context/MainChain';
import { images } from '../constants';

const axios = require("axios");
   

const TransactionsCard = () => {
  const { Transactions, Tokens, getTokenByAddressReturnName, Networks, CurrencyFormat, CurrencyFormatDecimals, ADMIN, USER, confirmTransaction, revertTransaction, URL_API } = useContext(MainChain);
  const [isLoaded, setIsLoaded] = useState(false);
  const [LatestTransactions, setLatestTransactions] = useState([]);
  let NetworkFrom = localStorage.getItem('NetworkFrom');
  let NetworkTo = localStorage.getItem('NetworkTo');
  let userAddress = localStorage.getItem("userAddress");
  let _addr, _hash, _tokenFrom, _tokenTo, _status;
    useEffect( async () => {
      const tx = await axios.get(URL_API+"/getTransactions/");
        setLatestTransactions(tx.data)
        setIsLoaded(true);
    }, [isLoaded])
    return(
      <>
      <div className="Transactions__HJSUHDIHOUIHdO_Row">
            <div className="Transactions__ISUHUSHS_Col">Tokens</div>
            <div className="Transactions__ISUHUSHS_Col">Networks</div>
            <div className="Transactions__ISUHUSHS_Col_S">Status</div>
        </div>
      {LatestTransactions.map((item, i) => {
        _addr = LatestTransactions[i].address.slice(0, 6);
        _hash = LatestTransactions[i].hashFrom.slice(0, 25)+"...";
        _tokenFrom = LatestTransactions[i].tokenFromSymbol;
        _tokenTo = LatestTransactions[i].tokenToSymbol;
        let _amountTo = LatestTransactions[i].amountTo;
        let TokenFromDecimals = Tokens[_tokenFrom][NetworkFrom].Decimals > 8 ? 8 : 2;
        let TokenToDecimals = Tokens[_tokenTo][NetworkTo].Decimals > 8 ? 8 : 2;
        return(
          <div className="Transactions__HJSUHDIHOUIHdO_Row" key={i}>
            
          <div className="Transactions__ISUHUSHS_Col_Cont">
            
          <div className="Tokens__UHDDOPKJFHBRHSUHDFOF">
                <div className="Tokens__JD87HDUHUD89hIDHL">
                    <img src={Tokens[_tokenFrom].Logo} alt="" />
                </div>
                <div className="Tokens__IJSJPOSJBJLF">
                {parseFloat(LatestTransactions[i].amountFrom).toFixed(TokenFromDecimals)}
                </div>
                <div className="Tokens___JUIOPSOHD">{Tokens[_tokenFrom].Title}</div>
            </div>
            <div className="Tokens__UHDDOPKJFHBRHSUHDFOF"><i className="fa fa-exchange  color-icons mx-2"></i></div>
            <div className="Tokens__UHDDOPKJFHBRHSUHDFOF">
                <div className="Tokens__JD87HDUHUD89hIDHL">
                    <img src={Tokens[_tokenTo].Logo} alt="" />
                </div>
                <div className="Tokens__IJSJPOSJBJLF">

                {parseFloat(_amountTo).toFixed(TokenToDecimals)}
                </div>
                <div className="Tokens___JUIOPSOHD">{Tokens[_tokenTo].Title}</div>
            </div>
            
            </div>
          <div className="Transactions__ISUHUSHS_Col_Cont">
              <div className="Tokens__UHDDOPKJFHBRHSUHDFOF">
                <div className="Tokens__JD87HDUHUD89hIDHL">
                <img src={Networks[LatestTransactions[i].networkFrom].Logo} className="sc-hy2v6e-0 kotaxM" />
                </div>
                <div className="Tokens__IJSJPOSJBJLF">
                <div className="Tokens___JUIOPSOHD"><a href={Networks[LatestTransactions[i].networkFrom].BlockExplorerUrls+"/tx/"+LatestTransactions[i].hashFrom} target="_blank">{Networks[LatestTransactions[i].networkFrom].Name}</a></div>
              </div>
            </div>
            <div className="Tokens__UHDDOPKJFHBRHSUHDFOF"><i className="fa fa-exchange  color-icons mx-2"></i></div>
            <div className="Tokens__UHDDOPKJFHBRHSUHDFOF">
                <div className="Tokens__JD87HDUHUD89hIDHL">
                <img src={Networks[LatestTransactions[i].networkTo].Logo} className="sc-hy2v6e-0 kotaxM" />
                </div>
                <div className="Tokens__IJSJPOSJBJLF">
                <div className="Tokens___JUIOPSOHD"><a href={Networks[LatestTransactions[i].networkTo].BlockExplorerUrls+"/tx/"+LatestTransactions[i].hashTo} target="_blank">{Networks[LatestTransactions[i].networkTo].Name}</a></div>
              </div>
            </div>
              </div>
          <div className="Transactions__ISUHUSHS_Col_Status Button__Admin_Aprovals">
            {
            LatestTransactions[i].status === "completed" ?
            <BsFillCheckCircleFill className="Icon___Success_Tx" alt="Completed!" />  
          :  LatestTransactions[i].status === "reverted" ?
            <BsPatchExclamationFill className="Icon___Warning_Tx" alt="Completed!" /> 
          : (userAddress === ADMIN.address) && (LatestTransactions[i].networkTo === NetworkFrom)   ?

          <div>
          <button className="" onClick={e => confirmTransaction(LatestTransactions[i]._id, Networks[LatestTransactions[i].networkTo])}>Confirm</button>  
          </div>
          : (userAddress === ADMIN.address) && (LatestTransactions[i].networkFrom === NetworkFrom) ?
          <div>
          <button className="" onClick={e => revertTransaction(LatestTransactions[i]._id)}>Revert</button>  
          </div>

          
        :
          <img src={images.GIFLoading} className="sc-hy2v6e-0 kotaxM" alt="Pending!" />
          }
          
            </div>
      </div> 
        );
        })}
        </>
    );
  };

const Transactions = () => {
    const { Transactions } = useContext(MainChain);
    
  return (
      <Row>
          <Col md={12}>

          <div className="dQdmym">
        <div className="dXbYox">
        <div className="dnJGkr">
        <div className="kEiMDz eycoH d-flex justify-content-evenly">
                <div className="title-text  flex-grow-1 bd-highlight">Latest Transactions</div>
                <div className="etZQAu mx-2">
                    <img width="35px" src="" alt="" />
                </div>
                </div>
        <hr className="sc-bqyKOL gSuxaX"></hr>
        <div className="kEiMDz"></div>
        <TransactionsCard />
          </div> 
        </div>
        </div>
          </Col>
      </Row>
  );
}

export default Transactions