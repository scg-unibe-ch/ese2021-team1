import { describe } from 'mocha';
import { expect } from 'chai';
import {UserService} from '../services/user.service';

describe('Password Check', () => {
    const userService = new UserService();
   describe('correct Password', () => {
       expect(userService.passwordCheck(''))
           .to
           .equal(1);
   });
});
