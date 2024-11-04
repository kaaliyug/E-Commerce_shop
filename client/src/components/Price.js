import React from 'react'

export default function Price ({price, locale, currency}) {

    const formatPrice = () =>
    new Intl.NumberFormat(locale, {
        style: "currency",
        currency
    }).format(price)


  return (
    <div>{formatPrice()}</div>
  )
}

Price.defaultProps = {
    locale: "en-IN",
    currency: "INR"
}