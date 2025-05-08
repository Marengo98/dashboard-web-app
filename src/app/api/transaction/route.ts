export async function getWalletTransactions(walletId: number, jwt: string) {
    const res = await fetch(
      `http://vmi1680938.contaboserver.net:1337/api/wallets/${walletId}?populate[transactions][populate]=*`,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
  
    if (!res.ok) throw new Error('Errore nel recupero delle transazioni');
  
    return res.json().then(data => data.data.attributes.transactions.data);
  }

  export async function getUserTransactions(userId: string, jwt: string) {
    const params = new URLSearchParams({
      populate: '*',
      'filters[user][id]': userId.toString(),
    });
  
    const res = await fetch(`http://vmi1680938.contaboserver.net:1337/api/wallets?${params.toString()}`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
  
    if (!res.ok) {
      throw new Error('Errore nel recupero del wallet');
    }
  
    const data = await res.json();
    console.log('Data: ', data);
    const wallet = data.data?.[0];
  
    if (!wallet) {
      throw new Error('Nessun wallet trovato per questo utente');
    }
  
    return wallet.attributes.transactions.data; // ✅ solo transazioni
  }