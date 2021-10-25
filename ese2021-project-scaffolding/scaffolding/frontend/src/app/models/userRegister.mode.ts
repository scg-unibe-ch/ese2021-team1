import { User } from "./user.model";

export class UserRegister extends User {

    constructor(
    public firstName: string | any,
    public lastName: string | any,
    public email: string | any,
    public homeAddress: string | any,
    public streetNumber: number | any,
    public zipCode: number | any,
    public city: string | any,
    public birthday: String | any,
    public phoneNumber: number | any
  ) {
        super(0, '', '');
        this.userId = this.userId
        this.username = this.username
        this.password = this.password
    }
    
}