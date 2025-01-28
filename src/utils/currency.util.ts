export const formatCurrency = (amount: number, currency: string = 'USD'): string => {
  const objFilter = {
    USD: 'en-US',
  } as const;

  return new Intl.NumberFormat(objFilter[currency as keyof typeof objFilter], { style: 'currency', currency, minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(amount);
}