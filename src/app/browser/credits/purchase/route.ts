import { redirect } from 'next/navigation';
import { headers, cookies } from 'next/headers';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2022-11-15',
});

const price = process.env.STRIPE_PRICE_ID;
const fqdn = process.env.NEXT_PUBLIC_APP_FQDN;

export async function POST() {
  const headersList = headers();
  const cookiesList = cookies();
  const userId = headersList.get('x-user-id');
  const organization = cookiesList.get('_hub_org')?.value as string;

  console.log(headersList, cookiesList, userId, organization);

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price,
        quantity: 100,
        adjustable_quantity: {
          enabled: true,
          minimum: 100,
          maximum: 999999,
        },
      },
    ],
    mode: 'payment',
    success_url: `${fqdn}/credits/purchased`,
    cancel_url: `${fqdn}/credits/cost`,
    automatic_tax: { enabled: true },
    metadata: {
      organization_id: organization,
      user_id: userId,
    },
  });

  return redirect(session.url as string);
}