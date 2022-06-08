import {
	HttpHandler,
	HttpInterceptor,
	HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize } from 'rxjs/operators';

import { AuthService } from './auth.service';
import { SpinnerService } from '../spinner/spinner.service';

@Injectable({
	providedIn: 'root',
})
export class TokenInterceptorService implements HttpInterceptor {
	constructor(
		private authService: AuthService,
		private spinnerService: SpinnerService
	) {}

	intercept(req: HttpRequest<any>, next: HttpHandler) {
		this.spinnerService.showSpinner();

		const tokenizeReq = req.clone({
			setHeaders: {
				Authorization: `Bearer ${this.authService.getToken()}`,
			},
		});

		return next
			.handle(tokenizeReq)
			.pipe(finalize(() => this.spinnerService.hideSpinner()));
	}
}
