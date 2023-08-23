export default function currencify(amount, currency) {
  if (currency === "$" || currency === "€") {
    return currency + amount.toString();
  } else {
    return amount.toString() + " " + currency;
  }
}
