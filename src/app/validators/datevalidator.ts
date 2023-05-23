import { AbstractControl } from '@angular/forms';
export function DateValidator() {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const inputDate = (new Date(control.value)).setHours(0, 0, 0, 0);
    const currentDate = (new Date()).setHours(0, 0, 0, 0);
    if (inputDate == currentDate) {
      return { freeze: true };
    }

    return null;
  }
}
