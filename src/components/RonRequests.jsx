import React, { useState, useContext, useEffect } from 'react'
import { Container, Modal, Button, Row, Col } from 'react-bootstrap';
import { BsFillCheckCircleFill, BsPatchExclamationFill } from "react-icons/bs";
import { ethers, utils, Wallet } from "ethers";
import './ronrequests.scss';
import $ from 'jquery';
import { MainChain } from '../context/MainChain';
import { images } from '../constants';

const axios = require("axios");
  

const ShowFreeRonRequests = () => {
  const { Transactions, confirmFreeRonRequest, rejectFreeRonRequest, URL_API, Tokens, getTokenByAddressReturnName, Networks, CurrencyFormat, CurrencyFormatDecimals, ADMIN, USER, confirmTransaction, revertTransaction } = useContext(MainChain);
  const [isLoaded, setIsLoaded] = useState(false);
  const [LatestTransactions, setLatestTransactions] = useState([]);
  let NetworkFrom = localStorage.getItem('NetworkFrom');
  let NetworkTo = localStorage.getItem('NetworkTo');
  let userAddress = localStorage.getItem("userAddress");
  let address, _hash, _tokenFrom, _tokenTo, _status, tx;
    useEffect( async () => {
      if(userAddress === ADMIN.address){
        tx = await axios.get(URL_API+"/getAllRonRequestsPending/");
      }else{
        tx = await axios.get(URL_API+"/getAllRonRequests/");
      }
        setLatestTransactions(tx.data)
        setIsLoaded(true);
    }, [isLoaded])
    return(
      <>
      <div className="Transactions__HJSUHDIHOUIHdO_Row">
            <div className="Transactions__ISUHUSHS_Col">Amount</div>
            <div className="Transactions__ISUHUSHS_Col">Address</div>
            <div className="Transactions__ISUHUSHS_Col">City / Country</div>
            <div className="Transactions__ISUHUSHS_Col">Date / Time</div>
            <div className="Transactions__ISUHUSHS_Col_S">Status</div>
        </div>
      {LatestTransactions.map((item, i) => {
        address = LatestTransactions[i].address;
        address = address.slice(0, 10)+"..."+address.slice(38);
        let _ip = LatestTransactions[i].ip;
        let _hash = LatestTransactions[i].hash;
        let _session = LatestTransactions[i].session.slice(0,20)+"...";
        let _local = LatestTransactions[i].region+" / "+LatestTransactions[i].country;
        let _status = LatestTransactions[i].status;
        let date = LatestTransactions[i].createdAt;
        date =  new Date(date).toLocaleString();
        return(
          <div className="Transactions__HJSUHDIHOUIHdO_Row" key={i}>
            
          <div className="Transactions__ISUHUSHS_Col_Cont">0.0005 RON</div>
          <div className="Transactions__ISUHUSHS_Col_Cont">{address}</div>
          <div className="Transactions__ISUHUSHS_Col_Cont">{_local}</div> 
          <div className="Transactions__ISUHUSHS_Col_Cont">{date}</div> 
          <div className="Transactions__ISUHUSHS_Col_Status Button__Admin_Aprovals">
            {
            LatestTransactions[i].status === "completed" ?
            <BsFillCheckCircleFill className="Icon___Success_Tx" alt="Completed!" />  
          :  LatestTransactions[i].status === "reverted" ?
            <BsPatchExclamationFill className="Icon___Warning_Tx" alt="Completed!" /> 
          : (userAddress === ADMIN.address) && (NetworkFrom === "RON")   ?

          <div>
          <button className="" onClick={e => confirmFreeRonRequest(LatestTransactions[i]._id)}>Confirm</button>  
          </div>
          : (userAddress === ADMIN.address) && (LatestTransactions[i].networkFrom === NetworkFrom) ?
          <div>
          <button className="" onClick={e => rejectFreeRonRequest(LatestTransactions[i]._id)}>Reject</button>  
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

const FreeRonRequests = () => {
    const { Transactions } = useContext(MainChain);
    
  return (
      <Row>
          <Col md={12}>

          <div className="dQdmym">
        <div className="dXbYox">
        <div className="dnJGkr">
        <div className="kEiMDz eycoH d-flex justify-content-evenly">
                <div className="title-text  flex-grow-1 bd-highlight">Free Ron Requests</div>
                <div className="etZQAu mx-2">
                    <img width="35px" src="" alt="" />
                </div>
                </div>
        <hr className="sc-bqyKOL gSuxaX"></hr>
        <div className="kEiMDz"></div>
        <ShowFreeRonRequests />
          </div> 
        </div>
        </div>
          </Col>
      </Row>
  );
}

export default FreeRonRequests