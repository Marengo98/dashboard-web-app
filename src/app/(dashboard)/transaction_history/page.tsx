'use client';

import { Container, Table, Pagination } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { getUserTransactions, getWalletTransactions } from '@/app/api/transaction/route';
import { useSession } from 'next-auth/react';

type Transaction = {
  date: string;
  type: string;
  method: string;
  account: string;
  amount: number;
  status: string;
};

// const initialTransactions: Transaction[] = [
//   {
//     date: '15/05/2025 10:38:24',
//     type: 'Withdraw',
//     method: 'Crypto Wallet',
//     account: 'MT5 5001542',
//     amount: 200.0,
//     status: 'Completed',
//   },
//   {
//     date: '10/05/2025 16:28:23',
//     type: 'Withdraw',
//     method: 'Crypto Wallet',
//     account: 'MT5 5001313',
//     amount: 234.0,
//     status: 'Completed',
//   },
//   {
//     date: '09/05/2025 11:47:37',
//     type: 'Transfer',
//     method: '',
//     account: 'MT5 5000996 → MT5 5001542',
//     amount: 551.41,
//     status: 'Approved → Approved',
//   },
//   {
//     date: '09/05/2025 11:47:17',
//     type: 'Transfer',
//     method: '',
//     account: 'MT5 5001188 → MT5 5000996',
//     amount: 78.57,
//     status: 'Approved → Approved',
//   },
//   {
//     date: '08/05/2025 10:18:53',
//     type: 'Withdraw',
//     method: 'Crypto Wallet',
//     account: 'MT5 5001542',
//     amount: 100.0,
//     status: 'Completed',
//   },
//   {
//     date: '05/04/2025 14:20:00',
//     type: 'Deposit',
//     method: 'Wire Transfer',
//     account: 'MT5 5001188',
//     amount: 350.0,
//     status: 'Completed',
//   },
//   {
//     date: '01/04/2025 09:10:12',
//     type: 'Withdraw',
//     method: 'Crypto Wallet',
//     account: 'MT5 5001313',
//     amount: 50.0,
//     status: 'Pending',
//   },{
//     date: '15/04/2025 10:38:24',
//     type: 'Withdraw',
//     method: 'Crypto Wallet',
//     account: 'MT5 5001542',
//     amount: 200.0,
//     status: 'Completed',
//   },
//   {
//     date: '10/04/2025 16:28:23',
//     type: 'Withdraw',
//     method: 'Crypto Wallet',
//     account: 'MT5 5001313',
//     amount: 234.0,
//     status: 'Completed',
//   },
//   {
//     date: '09/04/2025 11:47:37',
//     type: 'Transfer',
//     method: '',
//     account: 'MT5 5000996 → MT5 5001542',
//     amount: 551.41,
//     status: 'Approved → Approved',
//   },
//   {
//     date: '09/04/2025 11:47:17',
//     type: 'Transfer',
//     method: '',
//     account: 'MT5 5001188 → MT5 5000996',
//     amount: 78.57,
//     status: 'Approved → Approved',
//   },
//   {
//     date: '08/04/2025 10:18:53',
//     type: 'Withdraw',
//     method: 'Crypto Wallet',
//     account: 'MT5 5001542',
//     amount: 100.0,
//     status: 'Completed',
//   },
//   {
//     date: '05/04/2025 14:20:00',
//     type: 'Deposit',
//     method: 'Wire Transfer',
//     account: 'MT5 5001188',
//     amount: 350.0,
//     status: 'Completed',
//   },
//   {
//     date: '01/04/2025 09:10:12',
//     type: 'Withdraw',
//     method: 'Crypto Wallet',
//     account: 'MT5 5001313',
//     amount: 50.0,
//     status: 'Pending',
//   },
// ];

type SortKey = keyof Transaction;

const ITEMS_PER_PAGE = 5;

export default function TransactionHistory() {
  const [transactions, setTransactions] = useState([]);
  const [sortKey, setSortKey] = useState<SortKey>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const { data: session } = useSession()

  const userId = session?.user?.id
  const jwt = session?.user?.jwt

  useEffect(() => {
    const fetchData = async () => {
      try {
        if(!userId || !jwt)return;
        const txs = await getUserTransactions(userId.toString(), jwt);
        setTransactions(txs);
      } catch (err) {
        console.error('Errore:', err);
      }
    };

    fetchData();
  }, [userId, jwt]);

  const handleSort = (key: SortKey) => {
    if (key === sortKey) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
    setCurrentPage(1); // reset pagina su nuovo ordinamento
  };

  const getIcon = (key: SortKey) => {
    if (key !== sortKey) return <FontAwesomeIcon icon={faSort} className="ms-2" />;
    return (
      <FontAwesomeIcon
        icon={sortOrder === 'asc' ? faSortUp : faSortDown}
        className="ms-2"
      />
    );
  };

  const sortedTransactions = [...transactions].sort((a, b) => {
    const aVal = a[sortKey];
    const bVal = b[sortKey];

    if (typeof aVal === 'number' && typeof bVal === 'number') {
      return sortOrder === 'asc' ? aVal - bVal : bVal - aVal;
    }

    return sortOrder === 'asc'
      ? String(aVal).localeCompare(String(bVal))
      : String(bVal).localeCompare(String(aVal));
  });

  const totalPages = Math.ceil(sortedTransactions.length / ITEMS_PER_PAGE);
  const paginatedTransactions = sortedTransactions.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const renderPagination = () => (
    <Pagination className="mt-3">
      <Pagination.Prev
        onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
        disabled={currentPage === 1}
      />
      {[...Array(totalPages)].map((_, idx) => (
        <Pagination.Item
          key={idx + 1}
          active={idx + 1 === currentPage}
          onClick={() => setCurrentPage(idx + 1)}
        >
          {idx + 1}
        </Pagination.Item>
      ))}
      <Pagination.Next
        onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
        disabled={currentPage === totalPages}
      />
    </Pagination>
  );

  return (
    <Container className="my-4">
        <h2>
        Transaction History 
      </h2>
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
            {/* <th onClick={() => handleSort('account')} style={{ cursor: 'pointer' }}>
              Account {getIcon('account')}
            </th> */}
            <th onClick={() => handleSort('amount')} style={{ cursor: 'pointer' }}>
              Amount {getIcon('amount')}
            </th>
            <th onClick={() => handleSort('status')} style={{ cursor: 'pointer' }}>
              Status {getIcon('status')}
            </th>
          </tr>
        </thead>
        <tbody>
          {paginatedTransactions.map((tx, idx) => (
            <tr key={idx}>
              <td>{tx.date}</td>
              <td>{tx.typology}</td>
              <td>{tx.method || '-'}</td>
              {/* <td>{tx.account}</td> */}
              <td>{tx.amount}</td>
              <td>{tx.approved}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      {totalPages > 1 && renderPagination()}
    </Container>
  );
}
