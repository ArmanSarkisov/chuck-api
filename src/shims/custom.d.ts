type TokenType = {
  userId: string;
  email: string;
}
declare namespace Express {
  export interface Request {
    userInfo?: TokenType
  }
}