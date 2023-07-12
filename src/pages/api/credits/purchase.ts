import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2022-11-15',
});

const price = process.env.STRIPE_PRICE_ID;
const fqdn = process.env.NEXT_PUBLIC_APP_FQDN;

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  if (request.method === 'POST') {
    try {
      const headers: any = request.headers;
      const cookies: any = request.cookies;
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

      response.redirect(303, session.url as string);
    } catch (err: any) {
      response.status(err.statusCode || 500).json(err.message);
    }
  } else {
    response.setHeader('Allow', 'POST');
    response.status(405).end('Method Not Allowed');
  }
}
