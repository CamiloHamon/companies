import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
	providedIn: 'root',
})
export class FormsService {
	constructor() {}

	public removeSpaces(nameInput: string, currentForm: FormGroup) {
		const expRegular = /(\s{2,})/g;
		currentForm.get(nameInput)?.valueChanges.subscribe((newValue) => {
			const trimmed = newValue.replace(expRegular, '').trimStart();
			currentForm.get(nameInput)?.setValue(trimmed, { emitEvent: false });
		});
	}

	public removeSpacesEmail(form: FormGroup) {
		form.get('email')?.valueChanges.subscribe((newValue) => {
			const trimmed = newValue.replace(/\s+/g, '');
			form.get('email')?.setValue(trimmed, { emitEvent: false });
		});
	}
}
