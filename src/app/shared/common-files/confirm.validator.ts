import { AbstractControl } from '@angular/forms';

export function ConfirmedValidator(formGroup: AbstractControl) {
    const control = formGroup.get('user_password');
    const matchingControl = formGroup.get('confirm_password');
    if (matchingControl?.errors && !matchingControl.errors['ConfirmedValidator']) {
        return null;
    }
    if (control?.value !== matchingControl?.value) {
        return formGroup.get('confirm_password')?.setErrors({ confirm_password: true });
    }
}