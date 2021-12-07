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
        super(0, '', '','','','','',0,0,'','','',false);
        this.userId = this.userId
        this.username = this.username
        this.password = this.password
        this.firstName = this.firstName
        this.lastName = this.lastName
        this.email = this.email
        this.homeAddress = this.homeAddress
        this.streetNumber = this.streetNumber
        this.zipCode = this.zipCode
        this.city = this.city
        this.birthday = this.birthday
        this.phoneNumber = this.phoneNumber
        this.admin = this.admin
    }
}
