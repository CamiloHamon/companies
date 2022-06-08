import { AbstractControl } from '@angular/forms';

export class MyValidations {
	static equalsPassword(control: AbstractControl) {
		const password: string = control.get('pass')?.value;
		const confirmPassword: string = control.get('confirmPassword')?.value;

		if (password !== confirmPassword) {
			control.get('confirmPassword')!.setErrors({ NoPassswordMatch: true });
		}
		return null;
	}
}
