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
    { icon: faMoneyBillTransfer, label: 'Transaction History', href: '/transaction_history' },
  ];

  return (
    <Container className="py-4">
      <Row className="align-items-center justify-content-between mb-4">
        <Col xs={12} md="auto">
          <h4 className="mb-2 mb-md-0">
            Benvenuto{user?.username ? `, ${user.username}` : ''}
          </h4>
        </Col>
        <Col xs="auto">
          <Button variant="outline-danger" onClick={() => signOut({ callbackUrl: '/login' })}>
            <FontAwesomeIcon icon={faRightFromBracket} className="me-2" />
            Logout
          </Button>
        </Col>
      </Row>

      <h2 className="mb-3">Account Summary</h2>

      <Row className="gy-3">
        {buttons.map((btn, index) => (
          <Col key={index} xs={12} md={4}>
            <Button
              variant="primary"
              className="w-100 h-100 d-flex flex-column justify-content-center align-items-center py-4"
              href={btn.href}
            >
              <FontAwesomeIcon icon={btn.icon} size="2x" className="mb-2" />
              <span>{btn.label}</span>
            </Button>
          </Col>
        ))}
      </Row>

      <Row className="mt-5 gy-3">
        <Col xs={12} md={6}>
          <strong>Balance:</strong>
          <div className="p-2 mt-1 bg-body-secondary text-white rounded text-center">
            {user?.balance ?? '0.00'} €
          </div>
        </Col>
        <Col xs={12} md={6}>
          <strong>Number account:</strong>
          <div className="p-2 mt-1 bg-body-secondary text-white rounded text-center">
            {user?.account_number ?? '-'}
          </div>
        </Col>
      </Row>
    </Container>
  );
}
