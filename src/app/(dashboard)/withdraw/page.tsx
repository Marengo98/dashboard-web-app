import WithdrawalForm from './WithdrawForm';

export default function WithdrawPage() {
  // eventuali fetch lato server (es. lista conti, user, etc.)
  const userAccounts = [
    { id: 'MT5 5000542', balance: 0.3, currency: 'EUR' },
  ];

  return (
    <main className="p-3">
      <WithdrawalForm accounts={userAccounts} />
    </main>
  );
}
