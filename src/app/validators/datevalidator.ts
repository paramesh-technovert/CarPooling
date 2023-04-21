import { AbstractControl } from '@angular/forms';
export function DateValidator(){
  return (control: AbstractControl): { [key: string]: any } | null => {
           const inputDate = new Date(control.value);
            const currentDate = new Date();
            if (inputDate < currentDate) {
                //console.log(inputDate.toISOString(),currentDate.toISOString())
              return { InvalidDate: true };
            }
        
            return null;
          }
}
