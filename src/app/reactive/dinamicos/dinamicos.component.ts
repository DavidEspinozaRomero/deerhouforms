import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Persona {
  nombre: string;
  favoritos: Favorito[];
}

interface Favorito {
  id: number;
  nombre: string;
}


@Component({
  selector: 'app-dinamicos',
  templateUrl: './dinamicos.component.html',
  styles: [
  ]
})
export class DinamicosComponent implements OnInit {

  nuevoJuego: string = '';

  persona: Persona = {
    nombre: 'Fernando',
    favoritos: [
      { id: 1, nombre: 'Metal Gear' },
      { id: 2, nombre: 'Death Stranding' },
    ]
  }

  miFormulario:FormGroup = this.fb.group({
    nombre: [ '', [Validators.required, Validators.minLength(3)] ],
    // favoritos: this.fb.array( [
    //   [ '', [Validators.required, Validators.minLength(3)] ],
    //   [ '', [Validators.required, Validators.min(0)] ],
    // ], Validators.required)
    favoritos: this.fb.array( [
      ['Metal Gear'],
      ['Death Stranding'],
    ], Validators.required)
  })

  
  get favArr() { return this.miFormulario.get('favoritos') as FormArray }
    

  constructor( private fb:FormBuilder) { }

  ngOnInit(): void {
  }

  campoesValido(campo:string) {
    return this.miFormulario.controls[campo].errors && 
    this.miFormulario.touched
  }


  agregarJuego() {
    const nuevoFavorito: Favorito = {
      id: this.persona.favoritos.length + 1,
      nombre: this.nuevoJuego
    }

    this.persona.favoritos.push({ ...nuevoFavorito });
    this.nuevoJuego = '';
  }

  eliminar( index: number ) {
    this.persona.favoritos.splice(index, 1);
  }

  guardar() {
    if (this.miFormulario.invalid) {
      this.miFormulario.markAllAsTouched()
      return
    }
    console.log(this.miFormulario.value);
    this.miFormulario.reset()
  }
}
