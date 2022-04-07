import React, { useContext, useEffect } from 'react'
import { Container, Row, Col, Button, Modal, Popover, OverlayTrigger, Accordion } from 'react-bootstrap';
import './header.scss'
import $ from 'jquery';
import { MainChain } from '../context/MainChain';
import { BSCSideChain } from '../context/BSCSideChain';
import { ETHSideChain } from '../context/ETHSideChain';


let show;
const Header = ({}) => {
  const { USER, RNB, addLiquidity, CurrencyFormat, MainProvider, MetaMaskImportBSC } = useContext(MainChain);
  const { RNBDATABSC, getRNBBSCData } = useContext(BSCSideChain);
  const { RNBDATAETH, getRNBETHData } = useContext(ETHSideChain);
  return (
    <Container className="mt-5 mb-5">
      <Row>
        <Col><button type="submit" className="gkTzQI dZAyIf fIqiLm btn-hover" onClick={() => {getRNBBSCData(MainProvider)}}>LOAD BSC</button></Col>
        <Col><button type="submit" className="gkTzQI dZAyIf fIqiLm btn-hover" onClick={() => {getRNBETHData(MainProvider)}}>LOAD ETH</button></Col>
      </Row>


       


  <Row>
    
  <Col md={6}>
    <div className="dQdmym">
    <div className="dXbYox">
      <div className="dnJGkr">
      <div className="kEiMDz eycoH d-flex justify-content-evenly">
        
          <div className="etZQAu mx-2">
          <i className="fas fa-cog  color-icons"></i>
          
            </div>
            <div className="title-text  flex-grow-1 bd-highlight">WALLET (BALANCE)</div>
            
            </div>
            
      <hr className="sc-bqyKOL gSuxaX"></hr>
      <div className="kEiMDz">BSC</div>
      
      <ul className="jQcwXY">
        <li><div className="label">SLP</div><div className="value" id="WALLET_BSC_SLP"></div></li>
        <li><div className="label">AXS</div><div className="value" id="WALLET_BSC_AXS"></div></li>
        <li><div className="label">WETH</div><div className="value" id="WALLET_BSC_WETH"></div></li>
        <li><div className="label">USDC</div><div className="value" id="WALLET_BSC_USDC"></div></li>
        <li><div className="label">RON</div><div className="value" id="WALLET_BSC_RON"></div></li>
        <li><div className="label">Contract</div><div className="value"><a href="" id="WALLET_BSC_ADDRESS" target="_blank"></a></div></li>
        </ul>
      </div>
    </div>
  </div>
    </Col>
    <Col md={6}>
    <div className="dQdmym">
    <div className="dXbYox">
      <div className="dnJGkr">
      <div className="kEiMDz eycoH d-flex justify-content-evenly">
          <div className="etZQAu mx-2">
          <i className="fas fa-cog  color-icons"></i>
          
            </div>
            <div className="title-text  flex-grow-1 bd-highlight">WALLET (BALANCE)</div>
            </div>
      <hr className="sc-bqyKOL gSuxaX"></hr>
      <div className="kEiMDz">ETH</div>
      
      <ul className="jQcwXY">
        <li><div className="label">SLP</div><div className="value" id="WALLET_ETH_SLP"></div></li>
        <li><div className="label">AXS</div><div className="value" id="WALLET_ETH_AXS"></div></li>
        <li><div className="label">WETH</div><div className="value" id="WALLET_ETH_WETH"></div></li>
        <li><div className="label">USDC</div><div className="value" id="WALLET_ETH_USDC"></div></li>
        <li><div className="label">RON</div><div className="value" id="WALLET_ETH_RON"></div></li>
        <li><div className="label">Contract</div><div className="value"><a href="" id="WALLET_ETH_ADDRESS" target="_blank"></a></div></li>
        </ul>
      </div>
    </div>
  </div>
    </Col>
    
  </Row>
  <Row>
    
  <Col md={6}>
    <div className="dQdmym">
    <div className="dXbYox">
      <div className="dnJGkr">
      <div className="kEiMDz eycoH d-flex justify-content-evenly">
          <div className="etZQAu mx-2">
          <i className="fas fa-cog  color-icons"></i>
          
            </div>
            <div className="title-text  flex-grow-1 bd-highlight">USER (LIQUIDITY)</div>
            </div>
      <hr className="sc-bqyKOL gSuxaX"></hr>
      <div className="kEiMDz">BSC</div>
      
      <ul className="jQcwXY">
        <li><div className="label">SLP</div><div className="value" id="WALLET_LP_BSC_SLP"></div></li>
        <li><div className="label">AXS</div><div className="value" id="WALLET_LP_BSC_AXS"></div></li>
        <li><div className="label">WETH</div><div className="value" id="WALLET_LP_BSC_WETH"></div></li>
        <li><div className="label">USDC</div><div className="value" id="WALLET_LP_BSC_USDC"></div></li>
        <li><div className="label">RON</div><div className="value" id="WALLET_LP_BSC_RON"></div></li>
        </ul>
      </div>
    </div>
  </div>
    </Col>
    <Col md={6}>
    <div className="dQdmym">
    <div className="dXbYox">
      <div className="dnJGkr">
      <div className="kEiMDz eycoH d-flex justify-content-evenly">
          <div className="etZQAu mx-2">
          <i className="fas fa-cog  color-icons"></i>
          
            </div>
            <div className="title-text  flex-grow-1 bd-highlight">USER (LIQUIDITY)</div>
            </div>
      <hr className="sc-bqyKOL gSuxaX"></hr>
      <div className="kEiMDz">ETH</div>
      
      <ul className="jQcwXY">
        <li><div className="label">SLP</div><div className="value" id="WALLET_LP_ETH_SLP"></div></li>
        <li><div className="label">AXS</div><div className="value" id="WALLET_LP_ETH_AXS"></div></li>
        <li><div className="label">WETH</div><div className="value" id="WALLET_LP_ETH_WETH"></div></li>
        <li><div className="label">USDC</div><div className="value" id="WALLET_LP_ETH_USDC"></div></li>
        <li><div className="label">RON</div><div className="value" id="WALLET_LP_ETH_RON"></div></li>
        </ul>
      </div>
    </div>
  </div>
    </Col>
    
  </Row>
  <Row>
  <Col md={6}>
    <div className="dQdmym">
    <div className="dXbYox">
      <div className="dnJGkr">
      <div className="kEiMDz eycoH d-flex justify-content-evenly">
          <div className="etZQAu mx-2">
          <i className="fas fa-cog  color-icons"></i>
          
            </div>
            <div className="title-text  flex-grow-1 bd-highlight">LIQUIDITY (SMART CONTRACT)</div>
            </div>
      <hr className="sc-bqyKOL gSuxaX"></hr>
      <div className="kEiMDz">BSC</div>
      
      <ul className="jQcwXY">
        <li><div className="label">SLP</div><div className="value" id="LIQUIDITY_BSC_SLP"></div></li>
        <li><div className="label">AXS</div><div className="value" id="LIQUIDITY_BSC_AXS"></div></li>
        <li><div className="label">WETH</div><div className="value" id="LIQUIDITY_BSC_WETH"></div></li>
        <li><div className="label">USDC</div><div className="value" id="LIQUIDITY_BSC_USDC"></div></li>
        <li><div className="label">RON</div><div className="value" id="LIQUIDITY_BSC_RON"></div></li>
        <li><div className="label">ADDRESS: </div><div className="value" id="CONTRACT_BSC_ADDRESS"></div></li>
        </ul>
      </div>
    </div>
  </div>
    </Col>
    <Col md={6}>
    <div className="dQdmym">
    <div className="dXbYox">
      <div className="dnJGkr">
      <div className="kEiMDz eycoH d-flex justify-content-evenly">
          <div className="etZQAu mx-2">
          <i className="fas fa-cog  color-icons"></i>
          
            </div>
            <div className="title-text  flex-grow-1 bd-highlight">LIQUIDITY  (SMART CONTRACT)</div>
            </div>
      <hr className="sc-bqyKOL gSuxaX"></hr>
      <div className="kEiMDz">ETH</div>
      
      <ul className="jQcwXY">
        <li><div className="label">SLP</div><div className="value" id="LIQUIDITY_ETH_SLP"></div></li>
        <li><div className="label">AXS</div><div className="value" id="LIQUIDITY_ETH_AXS"></div></li>
        <li><div className="label">WETH</div><div className="value" id="LIQUIDITY_ETH_WETH"></div></li>
        <li><div className="label">USDC</div><div className="value" id="LIQUIDITY_ETH_USDC"></div></li>
        <li><div className="label">RON</div><div className="value" id="LIQUIDITY_ETH_RON"></div></li>
        <li><div className="label">ADDRESS: </div><div className="value" id="CONTRACT_ETH_ADDRESS"></div></li>
        </ul>
      </div>
    </div>
  </div>
    </Col>
    
  </Row>
  <Row>
  <Col md={6}>
    <div className="dQdmym">
    <div className="dXbYox">
      <div className="dnJGkr">
      <div className="kEiMDz eycoH d-flex justify-content-evenly">
          <div className="etZQAu mx-2">
          <i className="fas fa-cog  color-icons"></i>
          
            </div>
            <div className="title-text  flex-grow-1 bd-highlight">ADD LIQUIDITY</div>
            </div>
      <hr className="sc-bqyKOL gSuxaX"></hr>
      <div className="kEiMDz">BSC</div>
      
      <form className="form-inline" id="form-stake-busd" onSubmit={e => addLiquidity(e, "BSC")}>
              <div className="sc-higWrZ fymMGo">

                <div className="qBBMa">
                  <div className="jSYiPb">
                    <div className="dVXwPo">
                  </div>
                  <div className="dVXwPo">
                    <select className="dlHZKJ deposit-input" type="value" name="amount" id="add_liquidity_BSC_token_name">
                      <option value="0x3c11D60b82D7d94C58BF99d470891CCF55058D75">SLP</option>
                      <option value="0xc24f3e4e29152530ba38781679c1246FABeCb212">AXS</option>
                      <option value="0x747e1667d92C338694b20E043f4A0074dB1496d4">WETH</option>
                      <option value="0xe62c32A54328a0E0bb16814d35d4578CB1fc42a6">USDC</option>
                      <option value="0x50C40046BAb46c2Eeda8250DfA6229f2A5425537">RON</option>
                    </select>
                  </div>
                  <div className="dVXwPo">
                    <input className="dlHZKJ deposit-input" type="value" name="amount" id="add_liquidity_BSC_token_amount" />
                  </div>
                    <hr className="gSuxaX" />
                  </div>
                </div>
              </div>
              <button type="submit" className="gkTzQI dZAyIf fIqiLm btn-hover">STAKE BUSD</button>
              <input type="hidden" name="referrer" id="id_referrer_address" defaultValue={USER.getUserReferrer} />
            </form>

      </div>
    </div>
  </div>
    </Col>
    <Col md={6}>
    <div className="dQdmym">
    <div className="dXbYox">
      <div className="dnJGkr">
      <div className="kEiMDz eycoH d-flex justify-content-evenly">
          <div className="etZQAu mx-2">
          <i className="fas fa-cog  color-icons"></i>
          
            </div>
            <div className="title-text  flex-grow-1 bd-highlight">ADD LIQUIDITY</div>
            </div>
      <hr className="sc-bqyKOL gSuxaX"></hr>
      <div className="kEiMDz">ETH</div>
      
      <form className="form-inline" id="form-stake-busd" onSubmit={e => addLiquidity(e, "ETH")}>
              <div className="sc-higWrZ fymMGo">

                <div className="qBBMa">
                  <div className="jSYiPb">
                    <div className="dVXwPo">
                  </div>
                  <div className="dVXwPo">
                    <select className="dlHZKJ deposit-input" type="value" name="amount" id="add_liquidity_ETH_token_name">
                      <option value="0x5dF7622c41c3a3d43EBbF3AC8B59d3ACDB6Eb9e9">SLP</option>
                      <option value="0x892B78f588a125c75d4EF9bA7135ff4468C4A2b0">AXS</option>
                      <option value="0x45DD6A6af28126aA8170A5fe952993EFCce4951c">WETH</option>
                      <option value="0x81469E6dc22F8E4D5D1Dc7EF4f6e8f2E5fE597Da">USDC</option>
                      <option value="0x8b47d02Dfeedae0eB7c3FA401DEb2B29f366Df23">RON</option>
                    </select>
                  </div>
                  <div className="dVXwPo">
                    <input className="dlHZKJ deposit-input" type="value" name="amount" id="add_liquidity_ETH_token_amount" />
                  </div>
                    <hr className="gSuxaX" />
                  </div>
                </div>
              </div>
              <button type="submit" className="gkTzQI dZAyIf fIqiLm btn-hover">STAKE BUSD</button>
              <input type="hidden" name="referrer" id="id_referrer_address" defaultValue={USER.getUserReferrer} />
            </form>

      </div>
    </div>
  </div>
    </Col>
    
  </Row>
  <Row>
  <Col md={12}>
    <div className="dQdmym">
    <div className="dXbYox">
      <div className="dnJGkr">
      <div className="kEiMDz eycoH d-flex justify-content-evenly">
          <div className="etZQAu mx-2">
          <i className="fas fa-cog  color-icons"></i>
          
            </div>
            <div className="title-text  flex-grow-1 bd-highlight">BRIDGE</div>
            </div>
      <hr className="sc-bqyKOL gSuxaX"></hr>
      <form className="form-inline" id="form-stake-busd">
      <div className="dVXwPo">
                    <select className="dlHZKJ deposit-input me-3" type="value" name="amount" id="bridge_from_network">
                      <option value="BSC">BSC</option>
                      <option value="ETH">ETH</option>
                    </select>
                    <select className="dlHZKJ deposit-input" type="value" name="amount" id="bridge_to_network">
                      <option value="ETH">ETH</option>
                      <option value="BSC">BSC</option>

                    </select>
                  </div>
      
      
              <div className="sc-higWrZ fymMGo">

                <div className="qBBMa">
                  <div className="jSYiPb">
                    <div className="dVXwPo">
                  </div>
                  <div className="dVXwPo">
                  <div className="className me-3"><input className="dlHZKJ deposit-input" style={{width:'450px'}} type="value" name="amount" id="bridge_from_token_amount" /></div>
                    <select className="dlHZKJ deposit-input" type="value" name="amount" id="bridge_from_token_name">
                      <option value="SLP">SLP</option>
                      <option value="AXS">AXS</option>
                      <option value="WETH">WETH</option>
                      <option value="USDC">USDC</option>
                      <option value="RON">RON</option>
                    </select>
                  </div>
 
                  <div className="dVXwPo">
                  <div className="className me-3"><input className="dlHZKJ deposit-input" style={{width:'450px'}} type="value" name="amount" id="bridge_to_token_amount" /></div>
                    <select className="dlHZKJ deposit-input" type="value" name="amount" id="bridge_to_token_name">
                      <option value="SLP">SLP</option>
                      <option value="AXS">AXS</option>
                      <option value="WETH">WETH</option>
                      <option value="USDC">USDC</option>
                      <option value="RON">RON</option>
                    </select>
                  </div>    
                    <hr className="gSuxaX" />
                  </div>
                </div>
              </div>
              <button type="submit" className="gkTzQI dZAyIf fIqiLm btn-hover">TRANSFER</button>
            </form>

      </div>
    </div>
  </div>
    </Col>
    
    
  </Row>
  <Row>
        <Col><button type="submit" className="gkTzQI dZAyIf fIqiLm btn-hover" onClick={() => {MetaMaskImportBSC({chainId: '0x61', chainName: 'Smart Chain - Testnet', name: 'Binance Coin', symbol: 'BNB', decimals: 18, rpcUrls: 'https://data-seed-prebsc-1-s1.binance.org:8545/', blockExplorerUrls:'https://testnet.bscscan.com'})}}>ADD BSC TO METAMASK</button></Col>
        <Col><button type="submit" className="gkTzQI dZAyIf fIqiLm btn-hover" onClick={() => {MetaMaskImportBSC({chainId: '0x7e4', chainName: 'Ronin Chain', name: 'Ronin', symbol: 'RON', decimals: 18, rpcUrls: 'https://api.roninchain.com/rpc', blockExplorerUrls:'https://explorer.roninchain.com/'})}}>ADD RON TO METAMASK</button></Col>
      </Row>
</Container>
  )
}

export default Header