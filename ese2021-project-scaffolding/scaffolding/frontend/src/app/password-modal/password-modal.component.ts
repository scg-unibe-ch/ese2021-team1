import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-password-modal',
  templateUrl: './password-modal.component.html',
  styleUrls: ['./password-modal.component.css']
})
export class PasswordModalComponent implements OnInit {

  @Input() showPassReqs: boolean = false
  @Input() passwordInput: string = ''

    // passwordReqs[min 8 char, capital & small letters, a number, a special char]
  passwordReqs: boolean[] = [false, false, false, false];

  constructor() { }

  ngOnInit(): void {
  }

    
  checkPassword(data: any): boolean {
    // passwordReqs[min 8 char, capital & small letters, a number, a special char]
    this.passwordReqs[0] = data.length >= 8;
    this.passwordReqs[1] = (/[a-z]/.test(data)) && (/[A-Z]/.test(data));
    this.passwordReqs[2] = /\d/.test(data);
    let specChars = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/
    this.passwordReqs[3] = specChars.test(data);
    if (!this.passwordReqs.includes(false)) {
      return true
    } else {
      return false
    }
  }
  

}
