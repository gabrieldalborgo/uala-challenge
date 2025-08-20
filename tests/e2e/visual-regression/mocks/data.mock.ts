const transactionsMock = {
  "transactions": [],
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

export async function mockDataEndpoint(page, delayMs = 0, errorType = 'none') {
  await page.route('**/api/data', async route => {
    if (delayMs > 0) {
      await new Promise(resolve => setTimeout(resolve, delayMs));
    }

    switch (errorType) {
      case 'server_error':
        await route.fulfill({
          status: 500,
          contentType: 'application/json',
          body: JSON.stringify({ error: 'Internal Server Error' }),
        });
        break;
      default:
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify(transactionsMock),
        });
    }
  });
}