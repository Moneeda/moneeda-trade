import Dinero from 'dinero.js'

export const formatConfig = (config, withDecimals) => {
  return Dinero({
    amount: config.amount,
    currency: config.currency,
  }).toFormat(withDecimals ? '$0.00' : '$0')
}

export const formatAmount = (amount, currency) => {
  if (currency === 'ETH') {
    return `${amount} ${currency}`
  }

  return Dinero({
    amount,
    currency,
  }).toFormat('$0.00')
}
