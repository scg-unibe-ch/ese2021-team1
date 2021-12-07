/**
  * @param userId
  * @param username
  * @param password
  * @param firstName
  * @param lastName
  * @param email
  * @param homeAddress
  * @param streetNumber
  * @param zipCode
  * @param city
  * @param birthday
  * @param phoneNumber
  * @param admin
  */
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

