import { AbstractControl } from "@angular/forms"

export function NameValidator(){
    return (control: AbstractControl): { [key: string]: any } | null => {
        if(control.value.trim()==0){
            return {WhiteSpace:true}
        }
        return null;
    }
}