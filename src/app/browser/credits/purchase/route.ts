import { redirect } from 'next/navigation';
import { NextRequest } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2022-11-15',
});

const price = process.env.STRIPE_PRICE_ID;
const fqdn = process.env.NEXT_PUBLIC_APP_FQDN;

export async function POST(request: NextRequest) {
  const headers = request.headers;
  const cookies = request.cookies;
  const userId = headers.get('x-user-id');
  const organization = cookies.get('_hub_org')?.value as string;

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price,
        quantity: 500,
        adjustable_quantity: {
          enabled: true,
          minimum: 500,
          maximum: 999999,
        },
      },
    ],
    mode: 'payment',
    success_url: `${fqdn}/credits/purchases`,
    cancel_url: `${fqdn}/credits/costs`,
    automatic_tax: { enabled: true },
    metadata: {
      organization_id: organization,
      user_id: userId,
    },
  });

  return redirect(session.url as string);
}
