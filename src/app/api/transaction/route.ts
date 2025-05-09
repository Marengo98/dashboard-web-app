import { getUserTransactions, postTransactionTakeover } from "@/utils/strapi";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { amount, walletId, jwt, description, method } = body;

    if (!amount || !walletId || !jwt) {
      return new Response(
        JSON.stringify({ error: 'Dati obbligatori mancanti: amount, walletId, jwt' }),
        { status: 400 }
      );
    }

    const tx = await postTransactionTakeover(amount, walletId, jwt, {
      description,
      method,
    });

    return new Response(JSON.stringify({ success: true, data: tx }), { status: 200 });

  } catch (err) {
    console.error('❌ Errore nel POST /api/transaction:', err);
    return new Response(JSON.stringify({ error: 'Errore server' }), { status: 500 });
  }
}

// /src/app/api/proxy/transactions/route.ts
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');
  const jwt = searchParams.get('jwt');

  if (!userId || !jwt) {
    return new Response(JSON.stringify({ error: 'Missing userId or jwt' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const txs = await getUserTransactions(userId.toString(), jwt);
    return new Response(JSON.stringify(txs), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Server error', details: String(err) }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

