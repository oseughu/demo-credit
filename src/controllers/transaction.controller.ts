import db from '#database/db'
import transactionService from '#services/transaction.service'
import { IGetUserAuthInfoRequest } from '#utils/interface'
import { Response } from 'express'

let balance: number

export default class transactionController {
  static async deposit(req: IGetUserAuthInfoRequest, res: Response): Promise<void> {
    const { amount, description } = req.body
    const { id } = req.user
    const user = await db.select().from('users').where('id', '=', `${id}`).first()

    if (!user) {
      res.status(404)
      throw new Error('user not found')
    }

    await transactionService.deposit(amount, description, id, res)

    balance = +req.user.balance + +amount

    res.status(201).send({
      message: 'deposit successful',
      amount: amount.toLocaleString(),
      balance: balance.toLocaleString()
    })
  }

  static async transfer(req: IGetUserAuthInfoRequest, res: Response): Promise<void> {
    const { amount, description, recipient, confirmRecipient } = req.body
    const { id } = req.user

    if (recipient !== confirmRecipient) {
      res.status(400)
      throw new Error('recipients do not match')
    }

    // fees can be implemented here

    await transactionService.transfer(amount, description, id, recipient, res)

    balance = +req.user.balance - +amount

    res.status(201).send({
      message: 'transfer successful',
      recipient,
      amount: amount.toLocaleString(),
      balance: balance.toLocaleString()
    })
  }

  static async withdrawal(req: IGetUserAuthInfoRequest, res: Response): Promise<void> {
    const { amount, description, recipient, confirmRecipient } = req.body
    const { id } = req.user

    if (recipient !== confirmRecipient) {
      res.status(400)
      throw new Error('recipients do not match')
    }

    await transactionService.withdrawal(amount, description, id, recipient, res)

    balance = +req.user.balance - +amount

    res.status(201).send({
      message: 'withdrawal successful',
      recipient,
      amount: amount.toLocaleString(),
      balance: balance.toLocaleString()
    })
  }
}
