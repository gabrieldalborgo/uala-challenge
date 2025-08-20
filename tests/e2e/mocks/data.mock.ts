const transactionsMock = {
  "transactions": [
    {
      "id": "1",
      "amount": 1500.50,
      "createdAt": "2024-01-15T10:30:00Z",
      "paymentMethod": "link",
      "card": "visa",
      "installments": 1
    },
    {
      "id": "2", 
      "amount": 2500.75,
      "createdAt": "2024-01-14T15:45:00Z",
      "paymentMethod": "qr",
      "card": "mastercard",
      "installments": 3
    },
    {
      "id": "3",
      "amount": 800.25,
      "createdAt": "2024-01-13T09:20:00Z", 
      "paymentMethod": "mpos",
      "card": "visa",
      "installments": 1
    },
    {
      "id": "4",
      "amount": 3200.00,
      "createdAt": "2024-01-12T14:10:00Z",
      "paymentMethod": "pospro", 
      "card": "mastercard",
      "installments": 6
    },
    {
      "id": "5",
      "amount": 1200.80,
      "createdAt": "2024-01-11T11:05:00Z",
      "paymentMethod": "link",
      "card": "amex",
      "installments": 1
    }
  ],
  "metadata": {
    "cards": [
      {
        "value": "visa",
        "label": "Visa"
      },
      {
        "value": "mastercard", 
        "label": "Mastercard"
      },
      {
        "value": "amex",
        "label": "Amex"
      }
    ],
    "paymentMethods": [
      {
        "value": "link",
        "label": "Link de pago"
      },
      {
        "value": "qr",
        "label": "Código QR"
      },
      {
        "value": "mpos",
        "label": "mPOS"
      },
      {
        "value": "pospro",
        "label": "POS Pro"
      }
    ]
  }
}

export async function mockDataEndpoint(page) {
  await page.route('**/api/data', async route => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(transactionsMock),
    });
  });
}
