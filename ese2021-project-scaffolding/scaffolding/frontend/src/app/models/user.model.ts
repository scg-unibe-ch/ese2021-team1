export class User {

  constructor(
    public userId: number,
    public username: string,
    public password: string,
    public firstName: string,
    public lastName: string,
    public email: string,
    public homeAddress: string,
    public streetNumber: number,
    public zipCode: number,
    public city: string,
    public birthday: string,
    public phoneNumber: string,
    public admin: boolean
  ) {}
}

