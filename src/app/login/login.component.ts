import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../_services/index';
import { AlertService } from '../_alert/index';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    error = '';

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
		private alertService: AlertService) { }

    ngOnInit() {
        this.authenticationService.logout();
    }

    login() {
        this.loading = true;
        this.authenticationService.login(this.model.username, this.model.password)
			.subscribe(
				user => {
					if (!!user) {
						this.router.navigate(['/'])
					} else {
						this.alertService.error('User not found');
						this.loading = false;
					}
				},
				error => {
					this.alertService.error(error);
				});
    }
}
