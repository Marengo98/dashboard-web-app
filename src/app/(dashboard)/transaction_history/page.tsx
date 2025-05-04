'use client';

import { useState } from 'react';
import { Container, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSort,
  faSortUp,
  faSortDown,
} from '@fortawesome/free-solid-svg-icons';

type Transaction = {
  date: string;
  type: string;
  method: string;
  account: string;
  amount: number;
  status: string;
};

const initialTransactions: Transaction[] = [
  {
    date: '15/04/2025 10:38:24',
    type: 'Withdraw',
    method: 'Crypto Wallet',
    account: 'MT5 5001542',
    amount: 200.0,
    status: 'Completed',
  },
  {
    date: '10/04/2025 16:28:23',
    type: 'Withdraw',
    method: 'Crypto Wallet',
    account: 'MT5 5001313',
    amount: 234.0,
    status: 'Completed',
  },
  {
    date: '09/04/2025 11:47:37',
    type: 'Transfer',
    method: '',
    account: 'MT5 5000996 → MT5 5001542',
    amount: 551.41,
    status: 'Approved → Approved',
  },
  {
    date: '09/04/2025 11:47:17',
    type: 'Transfer',
    method: '',
    account: 'MT5 5001188 → MT5 5000996',
    amount: 78.57,
    status: 'Approved → Approved',
  },
  {
    date: '08/04/2025 10:18:53',
    type: 'Withdraw',
    method: 'Crypto Wallet',
    account: 'MT5 5001542',
    amount: 100.0,
    status: 'Completed',
  },
  {
    date: '05/04/2025 14:20:00',
    type: 'Deposit',
    method: 'Wire Transfer',
    account: 'MT5 5001188',
    amount: 350.0,
    status: 'Completed',
  },
  {
    date: '01/04/2025 09:10:12',
    type: 'Withdraw',
    method: 'Crypto Wallet',
    account: 'MT5 5001313',
    amount: 50.0,
    status: 'Pending',
  },
];

type SortKey = keyof Transaction;

export default function TransactionHistory() {
  const [sortKey, setSortKey] = useState<SortKey>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const handleSort = (key: SortKey) => {
    if (key === sortKey) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  const getIcon = (key: SortKey) => {
    if (key !== sortKey) {
      return <FontAwesomeIcon icon={faSort} className="ms-2" />;
    }
    return (
      <FontAwesomeIcon
        icon={sortOrder === 'asc' ? faSortUp : faSortDown}
        className="ms-2"
      />
    );
  };

  const sortedTransactions = [...initialTransactions].sort((a, b) => {
    const aVal = a[sortKey];
    const bVal = b[sortKey];

    if (typeof aVal === 'number' && typeof bVal === 'number') {
      return sortOrder === 'asc' ? aVal - bVal : bVal - aVal;
    }

    return sortOrder === 'asc'
      ? String(aVal).localeCompare(String(bVal))
      : String(bVal).localeCompare(String(aVal));
  });

  return (
    <Container className="my-4">
      <h2 className="fw-bold text-primary mb-1">Transaction History</h2>
      <p className="text-muted mb-3">View the history of all your financial transactions</p>
      <hr />

      <Table responsive bordered hover variant="dark" className="text-white">
        <thead className="bg-primary">
          <tr>
            <th onClick={() => handleSort('date')} style={{ cursor: 'pointer' }}>
              Transaction date {getIcon('date')}
            </th>
            <th onClick={() => handleSort('type')} style={{ cursor: 'pointer' }}>
              Type {getIcon('type')}
            </th>
            <th onClick={() => handleSort('method')} style={{ cursor: 'pointer' }}>
              Method {getIcon('method')}
            </th>
            <th onClick={() => handleSort('account')} style={{ cursor: 'pointer' }}>
              Account {getIcon('account')}
            </th>
            <th onClick={() => handleSort('amount')} style={{ cursor: 'pointer' }}>
              Amount {getIcon('amount')}
            </th>
            <th onClick={() => handleSort('status')} style={{ cursor: 'pointer' }}>
              Status {getIcon('status')}
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedTransactions.map((tx, idx) => (
            <tr key={idx}>
              <td>{tx.date}</td>
              <td>{tx.type}</td>
              <td>{tx.method || '-'}</td>
              <td>{tx.account}</td>
              <td>{tx.amount.toFixed(2)}</td>
              <td>{tx.status}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
