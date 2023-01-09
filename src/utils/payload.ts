import 'dotenv/config'

export default class payload {
  // static register() {
  //   return {
  //     firstName: 'John',
  //     lastName: 'Smith',
  //     email: 'test@test.com',
  //     password: 'test12345'
  //   }
  // }

  static login() {
    return {
      email: '007@gmail.com',
      password: process.env.USER
    }
  }
}
