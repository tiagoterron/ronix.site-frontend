import React, { useContext } from "react";
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { MainChain } from "../context/MainChain";
import $ from 'jquery';
import { images } from '../constants';
const Navigator = () => {

const { RNB, USER, connectWallet, Networks, contracts } = useContext(MainChain);

let userAdddress = String(USER.address);
let userAddressShorter = userAdddress.slice(0, 6)+"..."+userAdddress.slice(38);
const NetworkFrom = localStorage.getItem("NetworkFrom");
return(
<Navbar collapseOnSelect expand="lg" variant="dark" className="bGGIYh fixed-top">
  <Container>
  <Navbar.Brand href="#home">
  {/* <img src={images.ronix} className="ronix__logo" />{' '} */}
  <img src={images.ronix} className="ronix__logo" />
      </Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="me-auto mx-5">
      {NetworkFrom !== "RON" &&
      <Nav.Link href={`https://bscscan.com/address/${contracts[NetworkFrom].RNB.address}`} target="_blank">Contract</Nav.Link>
    }
      <Nav.Link href="https://t.me/+Ec0maCqHuv0yY2Y6" target="_blank">Telegram</Nav.Link>
      <Nav.Link href="https://ronix.site/faq.html" target="_blank">How to use it</Nav.Link>
      <Nav.Link href={void(0)} id="whitepapper">Whitepaper</Nav.Link>
    </Nav>
    <Nav>
      <Nav.Link href="https://bscscan.com/address/" target="_blank">
      </Nav.Link>
      <div className="title-text--right">
      {
      USER.address ?  
      <div className="d-flex flex-row bd-highligh">
      <div className="p-2 bd-highligh"><span className="box_color" ><a className="link__dfuahduwd" target="_blank" href={Networks[NetworkFrom].BlockExplorerUrls+"/address/"+userAdddress}>{userAddressShorter}</a></span></div>
       </div>
      : 
       <button type="button" className="btn__main  btn__load" id="btn_UYWUQHUENW" onClick={connectWallet}>Connect Wallet</button>
       
       }
      </div>
      

    </Nav>
  </Navbar.Collapse>
  </Container>
</Navbar>
)
}

export default Navigator;
