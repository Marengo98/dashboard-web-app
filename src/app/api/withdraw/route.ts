// app/api/withdraw/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const data = await req.json();

  // console.log('Withdrawal request received:', data);

  // Qui potresti:
  // - salvare nel DB
  // - inviare a Strapi o un altro backend
  // - fare validazioni

  return NextResponse.json({ success: true });
}
