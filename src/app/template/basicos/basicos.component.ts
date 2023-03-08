import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-basicos',
  templateUrl: './basicos.component.html',
  styleUrls: ['./basicos.component.css']
})
export class BasicosComponent {
  @ViewChild('miFormulario') miFormulario!: NgForm;

  initForm = {
    producto:'RTX',
    precio:10,
    existencias:10
  }
  constructor(){}

nombreValido():boolean{
  return this.miFormulario?.controls['producto']?.invalid && this.miFormulario?.controls['producto']?.touched
}
precioValido():boolean{
  return this.miFormulario?.controls['precio']?.value < 0 && this.miFormulario?.controls['precio']?.touched
 
}
guardar(){
  console.log('Posteo Correcto');
  this.miFormulario.resetForm({
    producto:'Algo',
    precio:0,
    existencias:0
  }
  );
}
}
