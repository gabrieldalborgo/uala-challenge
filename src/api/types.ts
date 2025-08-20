export interface TransactionDto {
  id: string
  amount: number
  card: string
  installments: number
  createdAt: string
  updatedAt: string
  paymentMethod: string
}

interface SimpleItem {
  value: string
  label: string
}

export interface PaymentMethodDto extends SimpleItem { } // eslint-disable-line @typescript-eslint/no-empty-object-type

export interface CardDto extends SimpleItem { } // eslint-disable-line @typescript-eslint/no-empty-object-type

export interface ResponseDto {
  transactions: TransactionDto[]
  metadata: {
    paymentMethods: PaymentMethodDto[]
    cards: CardDto[]
  }
}

export interface TransactionsFilters {
  minDate?: string,
  maxDate?: string,
  card?: string[],
  minAmount?: number,
  maxAmount?: number,
  paymentMethod?: string[],
  installment?: string[],
}