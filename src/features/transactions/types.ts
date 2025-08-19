export interface Filters {
  minDate?: string,
  maxDate?: string,
  card?: string[],
  minAmount?: number,
  maxAmount?: number,
  paymentMethod?: string[],
  installment?: string[],
}

export interface Transaction {
  id: string,
  amount: string
  date: string
  method: string
  type: string
}