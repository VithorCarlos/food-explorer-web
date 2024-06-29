export function formatCurrency(currency: number) {
  if (currency) {
    return Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(currency);
  }
  return null;
}
