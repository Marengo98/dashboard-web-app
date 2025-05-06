'use client';

import { useSession, signOut } from 'next-auth/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faWallet,
  faMoneyBill,
  faMoneyBillTransfer,
  faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';
import { Container, Row, Col, Button } from 'react-bootstrap';

export default function TradeAccountClient() {
  const { data: session } = useSession();
  const user = session?.user;

  const buttons = [
    { icon: faWallet, label: 'Deposit funds', href: '/deposit' },
    { icon: faMoneyBill, label: 'Withdraw Funds', href: '/withdraw' },
    { icon: faMoneyBillTransfer, label: 'Transaction History', href: '/transfer' },
  ];

  return (
    <Container>
    

      <Col>
      <h2>Account Summary</h2>
      <Row className="w-100 align-items-center justify-content-between mb-4">
        <Col>
          <h4 className="mb-0">Benvenuto{user?.username ? `, ${user.username}` : ''} 👋</h4>
        </Col>
        <Col xs="auto">
          <Button variant="outline-danger" onClick={() => signOut({ callbackUrl: '/login' })}>
            <FontAwesomeIcon icon={faRightFromBracket} className="me-2" />
            Logout
          </Button>
        </Col>
      </Row>
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
