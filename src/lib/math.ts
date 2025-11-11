export const impliedOdds = (price: number) => price * 100;

export const estPayout = (stake: number, price: number) =>
  stake * (1 / price);

export const fee = (stake: number) => stake * 0.02;

export const estProfit = (stake: number, price: number) =>
  estPayout(stake, price) - stake - fee(stake);
