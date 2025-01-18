/* eslint-disable */
import axios from 'axios';
import { showAlerts } from './alerts';

const stripe = Stripe(
  'pk_test_51QfnooCfAOwMWzsJLRdfwGxysywVQdV86Lr70PDhTv3qZIKFD9kr1APbl3rM745UuzyeFcd7i4cyFuDNDmT22fMD00fXOnUjLO'
);

export const bookTour = async tourId => {
  try {
    //1) get checkout session from API
    const session = await axios(
      `http://127.0.0.1:3000/api/v1/bookings/checkout-session/${tourId}`
    );
    console.log(session);

    //2)create cheackout form + charge the credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id
    });
  } catch (err) {
    console.log(err);
    showAlerts('error', err);
  }
};
