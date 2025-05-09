'use client';

import { Container, Table, Pagination } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { getUserTransactions } from '@/utils/strapi';

type Transaction = {
  id: number;
  attributes: {
    date: string;
    typology: string;
    method?: string;
    amount: number;
    approved: boolean;
  };
};

type SortKey = keyof Transaction['attributes'];
const ITEMS_PER_PAGE = 10;

export default function TransactionHistory() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [sortKey, setSortKey] = useState<SortKey>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const { data: session } = useSession();

  const userId = session?.user?.id;
  const jwt = session?.user?.jwt;

  useEffect(() => {
    const fetchData = async () => {
      if (!userId || !jwt) return;
      try {
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
    setCurrentPage(1);
  };

  const getIcon = (key: SortKey) => {
    if (key !== sortKey) return <FontAwesomeIcon icon={faSort} className="ms-2" />;
    return <FontAwesomeIcon icon={sortOrder === 'asc' ? faSortUp : faSortDown} className="ms-2" />;
  };

  const sortedTransactions = [...transactions].sort((a, b) => {
    let aVal = a.attributes[sortKey];
    let bVal = b.attributes[sortKey];

    if (sortKey === 'approved') {
      aVal = aVal ? 'Completed' : 'Pending';
      bVal = bVal ? 'Completed' : 'Pending';
    }

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
      <Pagination.Prev onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))} disabled={currentPage === 1} />
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
      <h2>Transaction History</h2>
      <p className="text-muted mb-3">View the history of all your financial transactions</p>
      <hr />

      <Table responsive bordered hover variant="dark" className="text-white">
        <thead className="bg-primary">
          <tr>
            <th onClick={() => handleSort('date')} style={{ cursor: 'pointer' }}>
              Transaction Date {getIcon('date')}
            </th>
            <th>
              Type 
            </th>
            <th >
              Method 
            </th>
            <th onClick={() => handleSort('amount')} style={{ cursor: 'pointer' }}>
              Amount {getIcon('amount')}
            </th>
            <th onClick={() => handleSort('approved')} style={{ cursor: 'pointer' }}>
              Status {getIcon('approved')}
            </th>
          </tr>
        </thead>
        <tbody>
          {paginatedTransactions.map((tx) => (
            <tr key={tx.id}>
              <td>{tx.attributes.date}</td>
              <td>{tx.attributes.typology.trim() === 'TAKEOVER' ? 'Withdraw' : 'Deposit'}</td>
              <td>{tx.attributes.method === 'bank' ? 'Bank Wire' : 'Crypto Wallet'}</td>
              <td>{tx.attributes.amount}</td>
              <td>{tx.attributes.approved ? 'Completed' : 'Pending'}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      {totalPages > 1 && renderPagination()}
    </Container>
  );
}
