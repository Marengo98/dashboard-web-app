'use client';

import { Container, Row, Col, Card, ListGroup, Badge } from 'react-bootstrap';

export default function DepositFunds() {
  return (
    <Container className="my-4">
      <h2>
        Deposit Funds <small className="text-muted">and start trading now</small>
      </h2>

      <p className="mt-3 fw-semibold">Complete your deposit in 3 easy steps:</p>

      <Row className="mb-4">
        <Col md>
          <Card border="success">
            <Card.Body>
              <Badge bg="success" className="mb-2">STEP 1</Badge>
              <Card.Text>
                Please click on your preferred payment method from the available options below.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md>
          <Card border="info">
            <Card.Body>
              <Badge bg="info" className="mb-2">STEP 2</Badge>
              <Card.Text>
                Fill in your details (account number, deposit currency, deposit amount) and click the
                <strong> “Complete Payment”</strong> button.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md>
          <Card border="primary">
            <Card.Body>
              <Badge bg="primary" className="mb-2">STEP 3</Badge>
              <Card.Text>
                Complete your payment.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <h5 className="mb-3">STEP 1: Select your preferred payment method</h5>

      <ListGroup>
        <ListGroup.Item>Wire Transfer</ListGroup.Item>
        <ListGroup.Item>Deposit with BTC, ETH, USDT or LTC</ListGroup.Item>
      </ListGroup>
    </Container>
  );
}
