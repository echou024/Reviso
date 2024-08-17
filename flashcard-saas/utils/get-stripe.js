import { loadStripe } from '@stripe/stripe-js';

let stripePromise;

const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(pk_test_51PoftH09JncIcYUGTzF7ItYmoWDqc4fVgfMPejnmBKJilnsMaa2kMUujQVlneYGk6bHCBrX8ZXeCCA7K92AIKSHL00NsuSFz3Q);
  }
  return stripePromise;
};

export default getStripe;
