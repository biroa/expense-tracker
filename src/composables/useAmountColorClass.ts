export default function useAmountColorClass(amount: number): string {
  if (amount > 0) {
    return 'text-positive';
  } else if (amount < 0) {
    return 'text-negative';
  }
  return 'text-grey-6';
}
