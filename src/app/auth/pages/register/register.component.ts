import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { emailPattern, nombreApellidoPattern, noPuedeSerStrider } from '../../../shared/validator/validaciones';
import { ValidatorService } from '../../../shared/validator/validator.service';
import { EmailValidatorService } from '../../../shared/validator/email-validator.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  miFormulario:FormGroup= this.fb.group({
    nombre:['',[Validators.required,Validators.pattern(this.validator.nombreApellidoPattern)]],
    email:['',[Validators.required,Validators.pattern(this.validator.emailPattern)],[this.emailValidator]],
    username:['',[Validators.required,this.validator.noPuedeSerStrider]],
    password:['',[Validators.required,Validators.minLength(6)]],
    password2:['',[Validators.required]],
},
{
  validators:[this.validator.camposIguales('password','password2')]
}
);

get emailErrorMsg():string{
 const errors = this.miFormulario.get('email')?.errors;
 if(errors?.['required']){
  return 'Email es obligatorio';
 }else if(errors?.['pattern']){
  return 'El valor ingresado no tiene formato de correo'
 }else if(errors?.['emailTomado']){
  return 'El email ya fue tomado'
 }
 return '';
 
}

constructor(private fb: FormBuilder,
            private validator:ValidatorService,
            private emailValidator:EmailValidatorService ){}
  ngOnInit(): void {
    this.miFormulario.reset({
      nombre: 'Mauricio Chavarria',
      email: 'test1@test.com',
      username:'test1',
      password:'123456',
      password2:'123456'
    })
  }
  
  campoNoValido(campo:string){
    return this.miFormulario.get(campo)?.invalid 
            && this.miFormulario.get(campo)?.touched;
  }

  // emailRequired(){
  //   return this.miFormulario.get('email')?.errors?.['required'] 
  //           && this.miFormulario.get('email')?.touched;
  // }
  // emailFormato(){
  //   return this.miFormulario.get('email')?.errors?.['pattern'] 
  //           && this.miFormulario.get('email')?.touched;
  // }
  // emailTomado(){
  //   return this.miFormulario.get('email')?.errors?.['emailTomado'] 
  //           && this.miFormulario.get('email')?.touched;
  // }
  submitFormulario(){
    console.log(this.miFormulario.value);
    this.miFormulario.markAllAsTouched();
  }

}
