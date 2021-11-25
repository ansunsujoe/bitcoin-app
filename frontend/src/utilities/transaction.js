const commissionRates = {
  "silver": 0.03,
  "gold": 0.01
}

export function roundDecimal(number, x) {
  return Math.round(number * Math.pow(10, x)) / Math.pow(10, x)
}

export function getCommission(btcRate, amount, commissionType, tier) {
  if (commissionType === "USD") {
    return roundDecimal(btcRate * amount * commissionRates[tier], 2);
  }
  return roundDecimal(amount * commissionRates[tier], 2);
}