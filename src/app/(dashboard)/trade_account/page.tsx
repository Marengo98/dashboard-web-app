
import { faMoneyBill, faUser, faWallet, faMoneyBillTransfer } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap';

export default async function TradeAccountPage() {

  const buttons = [
    {
      icon: faWallet,
      label: 'Deposit funds',
      href: '/deposit',
    },
    {
      icon: faMoneyBill,
      label: 'Withdraw Funds',
      href: '/withdraw',
    },
    {
      icon: faMoneyBillTransfer,
      label: 'Transaction History',
      href: '/transfer',
    },
  ];

  return (
    <Container fluid className="vh-100 d-flex align-items-start">
      <Col>
      <h2>Account Summary</h2>
        <Row className="w-100 mt-2">
          {buttons.map((btn, index) => (
            <Col className="p-1  ">
              <Button variant="primary" className="w-100 h-100 d-flex flex-column justify-content-center align-items-center" key={index}
                href={btn.href} >
                <Row></Row>
                <FontAwesomeIcon icon={btn.icon} size="2x" className="text-blue-600 mb-2" />
                <span>{btn.label}</span>
              </Button>
            </Col>

          ))}
        </Row>
        <Col className='mt-5'>
          <Row className="mb-2 align-items-center">
            <Col xs={2}><strong>Balance:</strong></Col>
            <Col xs={3}> <div className="p-2 bg-body-secondary text-white rounded justify-content-center d-flex">1.000.000$</div></Col>
          </Row>
          <Row className="mb-2 align-items-center">
            <Col xs={2}><strong>Profit:</strong></Col>
            <Col xs={3} lassName="mb-2  "> <div className="p-2 bg-body-secondary text-white rounded justify-content-center d-flex">1.000.000$</div></Col>
          </Row>
        </Col>
      </Col>
    </Container>
  );
}
