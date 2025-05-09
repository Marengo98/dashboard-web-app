import { postTransactionTakeover } from "@/utils/strapi";

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
