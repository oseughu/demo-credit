import db from '#database/db'
import { Response } from 'express'

const checkValidAmount = (amount: any, res: Response) => {
  if (isNaN(+amount)) {
    res.status(400)
    throw new Error('please input a valid amount')
  }
}
const checkValidAccountNumber = (recipient: any, res: Response) => {
  if (isNaN(+recipient) || recipient.length !== 10) {
    res.status(400)
    throw new Error('please input a valid account number')
  }
}

const checkBalance = (amount: number, sender: any, res: Response) => {
  if (+sender.balance < +amount) {
    res.status(400)
    throw new Error('insufficient funds. add more funds to your wallet')
  }
}

export default class transactionService {
  static async deposit(
    amount: number,
    description: string,
    userId: string,
    res: Response
  ): Promise<void> {
    const user = await db
      .select('balance', 'email')
      .from('users')
      .where('id', '=', `${userId}`)
      .first()

    checkValidAmount(amount, res)

    if (!user) {
      res.status(404)
      throw new Error('user not found.')
    }

    await db('transactions').insert({
      amount,
      type: 'deposit',
      description,
      recipient: user.email,
      user_id: userId
    })

    await db('users')
      .where('id', '=', `${userId}`)
      .update({
        balance: +amount + +user.balance
      })
  }

  static async transfer(
    amount: number,
    description: string,
    userId: string,
    recipient: string,
    res: Response
  ): Promise<void> {
    const sender = await db.select('balance', 'email').from('users').where({ id: userId }).first()
    const receiver = await db
      .select('balance', 'email')
      .from('users')
      .where('email', '=', `${recipient}`)
      .first()

    if (!sender) {
      res.status(404)
      throw new Error('sender not found.')
    }

    if (!receiver) {
      res.status(404)
      throw new Error('recipient not found.')
    }

    if (sender.email === receiver.email) {
      res.status(400)
      throw new Error('you cannot transfer funds to yourself.')
    }

    checkBalance(amount, sender, res)
    checkValidAmount(amount, res)

    await db('transactions').insert({
      amount,
      type: 'transfer',
      description,
      recipient,
      user_id: userId
    })

    await db('users')
      .where('id', '=', `${userId}`)
      .update({
        balance: +sender.balance - +amount
      })

    await db('users')
      .where({ email: recipient })
      .update({
        balance: +amount + +receiver.balance
      })
  }

  static async withdrawal(
    amount: number,
    description: string,
    userId: string,
    recipient: string,
    res: Response
  ): Promise<void> {
    const user = await db
      .select('balance', 'email')
      .from('users')
      .where('id', '=', `${userId}`)
      .first()

    if (!user) {
      res.status(404)
      throw new Error('user not found.')
    }

    checkBalance(amount, user, res)
    checkValidAmount(amount, res)
    checkValidAccountNumber(recipient, res)

    await db('users')
      .where('id', '=', `${userId}`)
      .update({
        balance: +user.balance - +amount
      })

    await db('transactions').insert({
      amount,
      type: 'withdrawal',
      description,
      recipient,
      user_id: userId
    })
  }
}
