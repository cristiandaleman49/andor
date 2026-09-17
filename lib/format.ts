/* Formato de precios de ANDORPETS: euros, sin céntimos en esta fase. Un único
   formateador para que card y detalle nunca difieran. */
const priceFormatter = new Intl.NumberFormat("es-ES", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

export function formatPrice(price: number) {
  return priceFormatter.format(price);
}