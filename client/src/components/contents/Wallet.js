import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Row, Col, Divider } from 'antd';
import './Wallet.css';
import { Card, Avatar, Modal, Button } from 'antd';
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined
} from '@ant-design/icons';
import bitcoin from '../../img/bitcoin.png';
import { ConsoleWriter } from 'istanbul-lib-report';

const { Meta } = Card;

const style = { background: '#0092ff', padding: '8px 0' };

function Wallet() {
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [sellShow, setSellShow] = useState(false);

  const sellShowModal = () => {
    setSellShow(true);
  };

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setVisible(false);
    }, 3000);
  };

  const handleCancel = () => {
    setVisible(false);
    setSellShow(false);
  };

  // fetch Bitcoin Present Pricing
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    axios
      .get(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false'
      )
      .then((res) => {
        setCoins(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  console.log(setCoins);

  return (
    <div>
      <div
        className="site-layout-background"
        style={{ padding: 24, minHeight: 360 }}
      >
        <Row>
          <Col span={24}>
            <h1 style={{ fontSize: '24px', color: 'gray' }}>Wallet</h1>
          </Col>
        </Row>

        <Divider orientation="left">Wallets</Divider>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Row>
            <Col className="gutter-row" span={20}>
              <div className="wallets">
                <div>
                  <Col span={24} className="card-contain">
                    <i class="fab fa-bitcoin"></i>
                    <p>$0.00</p>
                    <p>0.00BTH</p>
                  </Col>
                </div>
                <div>
                  <div className="function">
                    <Col className="gutter-row" span={8}>
                      <div className="receive">
                        <i style={{ display: 'inline' }} class="fab fa-gg"></i>
                        <p onClick={showModal}>ReceiveETH</p>
                      </div>
                    </Col>
                    <Col className="gutter-row" span={8}>
                      <div>
                        <i
                          style={{ display: 'inline' }}
                          class="fas fa-angle-double-right"
                        ></i>
                        <p onClick={sellShowModal}>Sell</p>
                      </div>
                    </Col>
                    <Col className="gutter-row" span={8}>
                      <div>
                        <i
                          style={{ display: 'inline' }}
                          class="fas fa-share-square"
                        ></i>
                        <p>Send</p>
                      </div>
                    </Col>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          <Col className="gutter-row" span={6}>
            <div style={style}>col-6</div>
          </Col>
          <Col className="gutter-row" span={6}>
            <div style={style}>col-6</div>
          </Col>
          <Col className="gutter-row" span={6}>
            <div style={style}>col-6</div>
          </Col>
        </Row>
      </div>

      {/* Modal for Recieve BTC */}

      <Modal
        style={{ textAlign: 'center' }}
        visible={visible}
        title="Recieve"
        onOk={handleCancel}
        onCancel={handleCancel}
      >
        <div>
          <i
            style={{
              fontSize: '30px',
              color: 'gold',
              paddingBottom: '10px'
            }}
            class="fab fa-bitcoin"
          ></i>
          <h3 style={{ paddingBottom: '10px' }}>Recieve BTC</h3>
          <p>Copy Wallet address below or scan barcode to receive bitcoin</p>
        </div>
      </Modal>

      {/* Modal for Send BTC */}

      <Modal
        style={{ textAlign: 'center' }}
        visible={sellShow}
        title="Sell"
        onOk={handleCancel}
        onCancel={handleCancel}
      >
        <div>
          <i
            style={{
              fontSize: '30px',
              color: 'gold',
              paddingBottom: '10px'
            }}
            class="fab fa-bitcoin"
          ></i>
          <h3 style={{ paddingBottom: '10px' }}>Sell BTC</h3>

          <p>Copy Wallet address below or scan barcode to receive bitcoin</p>
        </div>
      </Modal>
    </div>
  );
}

export default Wallet;
