export const validSignUp = {
  firstName: 'John',
  lastName: 'Smith',
  email: 'test@test.com',
  password: 'test12345',
  confirmPassword: 'test12345'
}

export const invalidSignUp = {
  firstName: 'John',
  lastName: 'Smith',
  email: 'test@test.com',
  password: 'test123',
  confirmPassword: 'test12345'
}

export const validLogin = {
  email: 'test@test.com',
  password: 'test12345'
}

export const invalidLogin = {
  email: 'test@test.com',
  password: 'test1234'
}

export const validDeposit = {
  amount: 500000000,
  description: 'pleasure allowance'
}

export const invalidDeposit = {
  amount: 'abcd',
  description: 'allowee'
}

export const validTransfer = {
  amount: '50000',
  description: 'tithe',
  recipient: '007@gmail.com',
  confirmRecipient: '007@gmail.com'
}

export const invalidTransfer400 = {
  amount: 'Smith',
  description: 'dash',
  recipient: '007@gmail.com',
  confirmRecipient: '007@gmail.com'
}

export const invalidTransfer404 = {
  amount: '50000',
  description: 'salary',
  recipient: 'superman@gmail.com',
  confirmRecipient: 'superman@gmail.com'
}

export const validWithdrawal = {
  amount: 20000,
  description: 'seed funding',
  recipient: '0500596130',
  confirmRecipient: '0500596130'
}

export const invalidWithdrawal = {
  amount: 5000,
  description: 'series A',
  recipient: '0000',
  confirmRecipient: '0000'
}
