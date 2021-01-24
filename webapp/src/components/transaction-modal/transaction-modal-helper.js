export const setInitialTransaction = transaction => {
  return {
    description: transaction?.description || '',
    paymentOption: transaction?.debit ? 'debit' : 'credit',
    amount: transaction?.amount || 0,
    ...transaction
  };
};

export const prepareTransaction = ({paymentOption, amount, ...rest}) => ({
  ...rest,
  debit: paymentOption === 'debit',
  credit: paymentOption === 'credit',
  amount: parseFloat(amount)
});