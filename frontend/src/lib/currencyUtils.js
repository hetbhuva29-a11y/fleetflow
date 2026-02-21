export const CONVERSION_RATE = 83;
export const CURRENCY_SYMBOL = '₹';

/**
 * Formats a value in Indian Rupees.
 * @param {number} value 
 * @returns {string}
 */
export const formatCurrency = (value) => {
  if (value === undefined || value === null) return `${CURRENCY_SYMBOL}0.00`;
  const num = typeof value === 'number' ? value : parseFloat(value);
  if (isNaN(num)) return `${CURRENCY_SYMBOL}0.00`;
  return `${CURRENCY_SYMBOL}${num.toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`;
};

/**
 * Formats a value that is already in INR (or just adds the symbol).
 * @param {number} value 
 * @returns {string}
 */
export const formatValue = (value) => {
  if (value === undefined || value === null) return `${CURRENCY_SYMBOL}0.00`;
  const num = typeof value === 'number' ? value : parseFloat(value);
  if (isNaN(num)) return `${CURRENCY_SYMBOL}0.00`;
  return `${CURRENCY_SYMBOL}${num.toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`;
};
