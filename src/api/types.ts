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

export interface PaymentMethodDto extends SimpleItem { }

export interface CardDto extends SimpleItem { }

export interface ResponseDto {
  transactions: TransactionDto[]
  metadata: {
    paymentMethods: PaymentMethodDto[]
    cards: CardDto[]
  }
}