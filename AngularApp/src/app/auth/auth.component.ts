import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  form: FormGroup;
  public invalidLogin = false;
  public formSubmitAttemp = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
    this.form = this.fb.group({
      username: ['', Validators.email],
      password: ['', Validators.required]
    });
  }
  ngOnInit() {}

  onSubmit() {
    if(this.form.valid){
        const username = this.form.get('username')?.value;
        const password = this.form.get('password')?.value;
        //Calling authenticationService() from another class
        this.authService.authenticationService(username, password).subscribe(
          (res) => {
            //And comeback here later
            this.router.navigate(['admin/dashboard']);
          },
          () => {
            this.invalidLogin = true;
          }
      );
    }
    else{
      this.formSubmitAttemp = true;
    }   
  }
}
