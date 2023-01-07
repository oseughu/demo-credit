import transactionService from '#services/transaction.service'
import { IGetUserAuthInfoRequest } from '#utils/interface'
import { Response } from 'express'

export default class transactionController {
  static async deposit(req: IGetUserAuthInfoRequest, res: Response): Promise<void> {
    try {
      const { amount, description } = req.body
      const { id } = req.user

      await transactionService.deposit(amount, description, id)
      res.status(201).send({ status: 'ok', message: 'deposit successful.' })
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

      await transactionService.transfer(amount, description, id, recipient)
      res.send({ status: 'ok', message: 'transfer successful.' })
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
      res.send({ status: 'ok', message: 'withdrawal successful.' })
    } catch (err) {
      console.log(err)
      res.status(500).json('error processing withdrawal, please try again.')
    }
  }
}
