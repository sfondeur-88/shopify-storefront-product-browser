/**
 * Formats a price amount and currency code into a display string for the UI.
 * Handles edge cases like invalid or non-numeric amount values.
 */
export const formatPrice = (amount: string, currencyCode: string): string => {
  const parsedAmount = parseFloat(amount);

  if (isNaN(parsedAmount)) {
    return `$0.00 ${currencyCode}`;
  }

  return `$${parsedAmount.toFixed(2)} ${currencyCode}`;
};