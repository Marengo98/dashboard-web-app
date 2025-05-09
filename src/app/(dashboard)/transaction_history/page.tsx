'use client';

import { Container, Table, Pagination } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { getUserTransactions } from '@/utils/strapi';

type Transaction = {
  date: string;
  type: string;
  method: string;
  account: string;
  amount: number;
  status: string;
};

type SortKey = keyof Transaction;

const ITEMS_PER_PAGE = 10;

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
        if (!userId || !jwt) return;
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
    var aVal = a.attributes[sortKey];
     var bVal = b.attributes[sortKey];
    
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
            <th 
           // onClick={() => handleSort('type')} style={{ cursor: 'pointer' }}
            >
              Type 
              {/* {getIcon('type')} */}
            </th>
            <th
            // onClick={() => handleSort('method')} style={{ cursor: 'pointer' }}
             >
              Method 
              {/* {getIcon('method')} */}
            </th>
            {/* <th onClick={() => handleSort('account')} style={{ cursor: 'pointer' }}>
              Account {getIcon('account')}
            </th> */}
            <th onClick={() => handleSort('amount')} style={{ cursor: 'pointer' }}>
              Amount {getIcon('amount')}
            </th>
            <th 
            //onClick={() => handleSort('status')} style={{ cursor: 'pointer' }}
            >
              Status
              {/* Status {getIcon('status')} */}
            </th>
          </tr>
        </thead>
        <tbody>
          {paginatedTransactions.map((tx, idx) => {
            //console.log('🧾 Transazione:', tx) // 👈 stampa ogni transazione
            return (
              <tr key={idx}>
                <td>{tx.attributes.date}</td>
                <td>{tx.attributes.typology.trim() === 'TAKEOVER'? 'Withdraw' : 'Deposit'}</td>
                <td>{tx.attributes.method === 'bank' ? 'Bank Wire' : 'Crypto Wallet'}</td>
                <td>{tx.attributes.amount}</td>
                <td>{tx.attributes.approved ? 'Completed' : 'Pending'}</td>
              </tr>
            )
          })}
        </tbody>
      </Table>

      {totalPages > 1 && renderPagination()}
    </Container>
  );
}
