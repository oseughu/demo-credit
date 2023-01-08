import transactionService from '#services/transaction.service'
import { IGetUserAuthInfoRequest } from '#utils/interface'
import { Response } from 'express'

let balance: number

export default class transactionController {
  static async deposit(req: IGetUserAuthInfoRequest, res: Response): Promise<void> {
    try {
      const { amount, description } = req.body
      const { id } = req.user

      await transactionService.deposit(amount, description, id)

      balance = +req.user.balance + +amount

      res.status(201).send({
        status: 'ok',
        message: 'deposit successful.',
        amount,
        balance: balance.toLocaleString()
      })
    } catch (err) {
      console.log(err)
      res.status(500).json('error processing deposit, please try again.')
    }
  }

  static async transfer(req: IGetUserAuthInfoRequest, res: Response): Promise<void> {
    try {
      const { amount, description, recipient, confirmRecipient } = req.body
      const { id } = req.user

      if (recipient !== confirmRecipient) {
        throw new Error('recipients do not match')
      }

      // fees can be implemented here

      await transactionService.transfer(amount, description, id, recipient)

      balance = +req.user.balance - +amount

      res.send({
        status: 'ok',
        message: 'transfer successful.',
        amount,
        recipient,
        balance: balance.toLocaleString()
      })
    } catch (err) {
      console.log(err)
      res.status(500).json('error processing transfer, please try again.')
    }
  }

  static async withdrawal(req: IGetUserAuthInfoRequest, res: Response): Promise<void> {
    try {
      const { amount, description } = req.body
      const { id } = req.user

      await transactionService.withdrawal(amount, description, id)

      balance = +req.user.balance - +amount

      res.send({
        status: 'ok',
        message: 'withdrawal successful.',
        amount,
        balance: balance.toLocaleString()
      })
    } catch (err) {
      console.log(err)
      res.status(500).json('error processing withdrawal, please try again.')
    }
  }
}