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

  export async function postTransactionTakeover(amount: number, walletId: string, jwt: string, options?: {
    description?: string;
    method?: string;
  }) {
    const res = await fetch('http://vmi1680938.contaboserver.net:1337/api/transactions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify({
        data: {
          amount,
          approved: false,
          typology: 'TAKEOVER  ',
          wallet: walletId,
          date: new Date().toISOString(),
          ...(options?.description ? { description: options.description } : {}),
          ...(options?.method ? { method: options.method } : {}), 
        },
      }),
    });
  console.log('RES TRANSACTION: ',res);
    if (!res.ok) {
      const error = await res.json();
      throw new Error(`Errore Strapi: ${error.error?.message || res.statusText}`);
    }
  
    const body = await res.json();
    return body.data; // dati della transazione creata
  }