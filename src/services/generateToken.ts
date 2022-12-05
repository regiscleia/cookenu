import * as jwt from "jsonwebtoken";

export interface AutheticationData {
  id: string;
}
export class Autheticator {
  public generate(input: AutheticationData): string {
    const token = jwt.sign(input, process.env.JWT_KEY as string, {
      expiresIn: process.env.ACCESS_EXPIRES,
    });
    return token;
  }
  public getTokenData(token: string): AutheticationData {
    const data = jwt.verify(token, process.env.JWT_KEY as string);
    return data as AutheticationData;
  }
}
