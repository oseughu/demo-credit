import db from '#database/db'

export default class transactionService {
  static async deposit(amount: number, description: string, userId: string): Promise<void> {
    const user = await db.select('balance', 'email').from('users').where({ id: userId }).first()

    if (!user) {
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
      .where({ id: userId })
      .update({
        balance: +amount + +user.balance
      })
  }

  static async transfer(
    amount: number,
    description: string,
    userId: string,
    recipient: string
  ): Promise<void> {
    const sender = await db.select('balance', 'email').from('users').where({ id: userId }).first()
    const receiver = await db
      .select('balance', 'email')
      .from('users')
      .where({ email: recipient })
      .first()

    if (!sender) {
      throw new Error('user not found.')
    }

    if (!receiver) {
      throw new Error('recipient not found.')
    }

    if (+sender.balance < +amount) {
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
      .where({ email: recipient })
      .update({
        balance: +amount + +receiver.balance
      })

    await db('users')
      .where({ id: userId })
      .update({
        balance: +sender.balance - +amount
      })
  }

  static async withdrawal(amount: number, description: string, userId: string): Promise<void> {
    const user = await db.select('balance', 'email').from('users').where({ id: userId }).first()

    if (!user) {
      throw new Error('user not found.')
    }

    if (+user.balance < +amount) {
      throw new Error('insufficient funds. add more funds to your wallet')
    }

    await db('transactions').insert({
      amount,
      type: 'withdrawal',
      description,
      recipient: user.email,
      user_id: userId
    })

    await db('users')
      .where({ id: userId })
      .update({
        balance: +user.balance - +amount
      })
  }
}
