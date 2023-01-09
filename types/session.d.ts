declare module 'express-session' {
  export interface session {
    jwt: string
  }
}

export {}