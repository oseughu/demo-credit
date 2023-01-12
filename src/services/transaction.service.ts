import db from '#database/db'
import { Response } from 'express'

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

    if (+sender.balance < +amount) {
      res.status(400)
      throw new Error('insufficient funds. add more funds to your wallet')
    }

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

    if (+user.balance < +amount) {
      res.status(400)
      throw new Error('insufficient funds. add more funds to your wallet')
    }

    await db('transactions').insert({
      amount,
      type: 'withdrawal',
      description,
      recipient,
      user_id: userId
    })

    await db('users')
      .where('id', '=', `${userId}`)
      .update({
        balance: +user.balance - +amount
      })
  }

  static async userTransactions(userId: string, res: Response) {
    const transactions = await db
      .select(
        'transactions.id',
        'transactions.amount',
        'transactions.description',
        'transactions.type',
        'transactions.recipient'
      )
      .from('transactions')
      .join('users', 'transactions.user_id', `users.id`)
      .where('transactions.user_id', '=', `${userId}`)
      .limit(5)
      .offset(1)

    if (!transactions) {
      res.status(404)
      throw new Error('user not found.')
    }

    return transactions
  }

  static async singleUserTransaction(userId: string, transactionId: string, res: Response) {
    const transaction = await db
      .select(
        'transactions.id',
        'transactions.amount',
        'transactions.description',
        'transactions.type',
        'transactions.recipient'
      )
      .from('transactions')
      .join('users', 'transactions.user_id', `users.id`)
      .where('transactions.user_id', '=', `${userId}`)
      .andWhere('transactions.id', '=', `${transactionId}`)
      .first()

    if (!transaction) {
      res.status(404)
      throw new Error('user not found.')
    }

    return transaction
  }
}
