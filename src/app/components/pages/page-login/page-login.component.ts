import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-page-login',
  templateUrl: './page-login.component.html',
  styleUrls: ['./page-login.component.scss']
})
export class PageLoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
  ) {
      // redirect to home if already logged in
      if (this.authenticationService.currentUserValue) {
          this.router.navigate(['/']);
      }

      // Set up login form.
      this.loginForm = this.formBuilder.group({
          username: ['', Validators.required],
          password: ['', Validators.required]
      });
   }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }

    const form = this.loginForm.controls;
    this.authenticationService.login(form.username.value, form.password.value).subscribe((data) => {
        this.router.navigate(['/']);
    },
    (error) => {
        //TODO: Set up error handling if login fails.
        alert('Could not login.');
        console.log(error);
    });
  }
}
