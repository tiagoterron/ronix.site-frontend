import React, { useState, useContext, useEffect } from 'react'
import { FaWallet } from 'react-icons/fa';
import { Container, Modal, Button, Row, Col } from 'react-bootstrap';
import { ethers, utils, Wallet } from "ethers";

import './freeron.scss';
import $ from 'jquery';
import { MainChain } from '../context/MainChain';
import { images } from '../constants';
const axios = require("axios");

const FreeRon = () => {
    const { CreateFreeRonRequest, URL_API  } = useContext(MainChain);
    const [FreeRon, setFreeRon] = useState(true);
    let NetworkFrom, userAddress;
    NetworkFrom = localStorage.getItem("NetworkFrom");
    userAddress = localStorage.getItem("userAddress");
    useEffect(async () => {
        const userID = await axios.get(URL_API+"/checkUserID/", {headers: {'Access-Control-Allow-Origin': '*'}}, {params: {}})
        if(userID.data[0]){
        if(userID.data[0]._id){
            setFreeRon(false);
            localStorage.setItem('SessionID', userID.data[0].session);
        }
    }
    })
    
  return (
    <Row>
        {FreeRon &&
        
        <Col md={12}>

        <div className="dQdmym">
        <div className="dXbYox">
        <div className="dnJGkr">
        <div className="kEiMDz eycoH d-flex justify-content-evenly">
                <div className="title-text  flex-grow-1 bd-highlight"><img width="35px" src={images[NetworkFrom]} alt="" /> Free Ron Tokens</div>
                <div className="etZQAu mx-2">

                </div>
                </div>
        <hr className="sc-bqyKOL gSuxaX"></hr>
        <div className="kEiMDz"></div>
        <form onSubmit={(e) => CreateFreeRonRequest(e)}>
        <div className='jAVvRy'>
        <div className="cauxVV">
            <div className='fMTTav'>
                

                    <span className="iyIEoz">
                        <div className="uWUSIHJDFOqW">
                        <img src={images.RON} className="sc-hy2v6e-0 kotaxM" style={{color: "var(--primary-color)"}} />
                        <div className="dbsTEZ">0.0005 RON</div>
                        </div> </span>
                        <div className="dbsTEZSHUS">{userAddress}</div>
                <button type="submit" className="button__SHUGFHDIDSJGDF btn__main  btn__load" id="btn_OSPQOSQISLPLS">CLAIM
            </button>
            
            </div>
            
        </div>
        
    </div>
    </form>
        </div>
        </div>
    </div>
    
    </Col>
}
  </Row>
  )
}

export default FreeRon