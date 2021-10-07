import { User } from "./user.model";

export class UserRegister extends User {

    constructor(
    public firstName: string,
    public lastName: string,
    public email: string,
    public homeAddress: string,
    public streetNumber: number,
    public zipCode: number,
    public city: string,
    public birthday: String,
    public phoneNumber: number
  ) {
        super(0, '', '');
        this.userId = this.userId
        this.username = this.username
        this.password = this.password
    }
    
}