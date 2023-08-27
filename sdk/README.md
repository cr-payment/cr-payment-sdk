# CrPayment SDK Package

This SDK contain the utility functions to interact with CrPayment API.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)

## Installation

To use this package in your project, you can install it via npm or yarn.

### Using npm

```bash
npm install @thenhatat/cr-payment-sdk
```

### Using yarn

```bash
yarn add @thenhatat/cr-payment-sdk
```

## Usage

Once the package is installed, you can import and use it in your TypeScript or JavaScript code.

```typescript
import {CrPayment} from "@thenhatat/cr-payment-sdk";

const crPayment = new CrPayment({
    api_keys: {
        public_api_key: 'string',
        private_api_key: 'string'
    },
    network: 'testnet'
});

// For creating payment
const session_1 = await crPayment.session.create({
    itemId: '1',
    amount: '1'
});

// For get status of payment
const session_2 = await crPayment.session.getPaymentState({
    session_id: sessionId
})
```
