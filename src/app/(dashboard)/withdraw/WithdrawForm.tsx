'use client';

import { useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';

type Account = {
    id: string;
    balance: number;
    currency: string;
};

export default function WithdrawalForm({ accounts }: { accounts: Account[] }) {
    const [formData, setFormData] = useState({
        method: 'Bank Wire (Normal bank wire)',
        amount: '',
        source: accounts[0]?.id ?? '',
        comment: '',
    });

    const [validated, setValidated] = useState(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;

        if (!form.checkValidity()) {
            e.stopPropagation();
            setValidated(true);
            return;
        }

        const res = await fetch('/api/withdraw', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });

        if (res.ok) {
            alert('Withdrawal request submitted!');
        } else {
            alert('Error submitting withdrawal');
        }
    };

    return (
        <Container fluid className="p-4 bg-dark text-white rounded shadow-sm">
            <h5 className="mb-4 text-white">Create a withdrawal request</h5>

            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row className="mb-3 align-items-start">
                    <Col md={4}>
                        <Form.Group controlId="withdrawalMethod">
                            <Form.Label className="text-white">Withdrawal Method</Form.Label>
                            <Form.Select
                                name="method"
                                value={formData.method}
                                onChange={handleChange}
                                required
                                className="bg-secondary text-white border-0"
                            >
                                <option>Bank Wire (Normal bank wire)</option>
                                <option>Crypto Wallet</option>
                            </Form.Select>
                            <Form.Control.Feedback
                                type="invalid"
                                className={validated && !formData.method ? 'd-block' : 'd-block invisible'}
                            >
                                Please select a withdrawal method.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>

                    <Col md={3}>
                        <Form.Group controlId="amount">
                            <Form.Label className="text-white">Amount</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="0"
                                name="amount"
                                value={formData.amount}
                                onChange={handleChange}
                                required
                                min="0.01"
                                className="bg-secondary text-white border-0"
                            />
                            <Form.Control.Feedback
                                type="invalid"
                                className={validated && !formData.amount ? 'd-block' : 'd-block invisible'}
                            >
                                Please enter a valid amount.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>

                    <Col md={2}>
                        <Form.Group controlId="currency">
                            <Form.Label className="text-white">Currency</Form.Label>
                            <Form.Control
                                plaintext
                                readOnly
                                defaultValue="EUR"
                                className="bg-secondary text-white border-0 px-3 rounded"
                                style={{ height: '38px', lineHeight: '38px' }}
                            />
                        </Form.Group>
                    </Col>

                    <Col md={4}>
                        <Form.Group controlId="source">
                            <Form.Label className="text-white">Source</Form.Label>
                            <Form.Select
                                name="source"
                                value={formData.source}
                                onChange={handleChange}
                                required
                                className="bg-secondary text-white border-0"
                            >
                                {accounts.map((acc) => (
                                    <option key={acc.id}>
                                        {acc.id} | {acc.balance.toFixed(2)} {acc.currency}
                                    </option>
                                ))}
                            </Form.Select>
                            <Form.Control.Feedback
                                type="invalid"
                                className={validated && !formData.source ? 'd-block' : 'd-block invisible'}
                            >
                                Please select a source account.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col>
                        <Form.Group controlId="comment">
                            <Form.Label className="text-white">Your comment (optional)</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Optional comment..."
                                name="comment"
                                value={formData.comment}
                                onChange={handleChange}
                                className="bg-secondary text-white border-0"
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col className="text-end">
                        <Button variant="primary" type="submit">
                            Proceed
                        </Button>
                    </Col>
                </Row>
            </Form>

        </Container>
    );
}
