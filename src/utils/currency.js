/**
 * Format currency in Indian Rupees format
 * @param {number} amount - The amount to format
 * @returns {string} Formatted currency string with ₹ symbol
 */
export const formatINR = (amount) => {
  if (!amount && amount !== 0) return '₹0.00';
  
  // Convert to number if string
  const num = typeof amount === 'string' ? parseFloat(amount) : amount;
  
  // Format with Indian locale
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(num);
};

/**
 * Format large numbers in Indian style (Lakhs/Crores)
 * @param {number} amount - The amount to format
 * @returns {string} Formatted string with lakhs/crores notation
 */
export const formatINRCompact = (amount) => {
  if (!amount && amount !== 0) return '₹0';
  
  const num = typeof amount === 'string' ? parseFloat(amount) : amount;
  
  if (num >= 10000000) { // 1 Crore
    return `₹${(num / 10000000).toFixed(2)} Cr`;
  } else if (num >= 100000) { // 1 Lakh
    return `₹${(num / 100000).toFixed(2)} L`;
  } else if (num >= 1000) { // 1 Thousand
    return `₹${(num / 1000).toFixed(2)} K`;
  }
  
  return formatINR(num);
};
