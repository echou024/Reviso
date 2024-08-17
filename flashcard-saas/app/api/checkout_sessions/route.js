import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe("sk_test_51PoftH09JncIcYUGFntScZWyKU33moUi6V8OBcoP49ilIM1Ow09gbHWoeHbdp5BW41D1FTW8pyNujCDZl9SXWG2X003Cvf8xq3", {
  apiVersion: '2022-11-15',
});

export async function POST(req) {
  try {
    const params = {
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: { name: 'Pro subscription' },
          unit_amount: 1000,
          recurring: { interval: 'month' }
        },
        quantity: 1,
      }],
      success_url: `${req.headers.get('Referer')}result?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get('Referer')}result?session_id={CHECKOUT_SESSION_ID}`,
    };

    const checkoutSession = await stripe.checkout.sessions.create(params);

    return NextResponse.json(checkoutSession, { status: 200 });
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: { message: error.message } }), {
      status: 500,
    });
  }
}
