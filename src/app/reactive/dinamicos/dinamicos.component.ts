import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';

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
  styles: [],
})
export class DinamicosComponent implements OnInit {
  nuevoJuego: string = '';

  persona: Persona = {
    nombre: 'Fernando',
    favoritos: [
      { id: 1, nombre: 'Metal Gear' },
      { id: 2, nombre: 'Death Stranding' },
    ],
  };

  miFormulario: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    favoritos: this.fb.array(
      [
        // ['Metal Gear'], ['Death Stranding']
      ],
      Validators.required
    ),
  });

  nuevoFavorito: FormControl = this.fb.control('', [
    Validators.required,
    Validators.minLength(3),
  ]);

  get favArr() {
    return this.miFormulario.get('favoritos') as FormArray;
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}

  campoesValido(campo: string) {
    return (
      this.miFormulario.controls[campo].errors && this.miFormulario.touched
    );
  }

  agregarJuego() {
    if (this.nuevoFavorito.invalid) {
      return;
    }
    this.favArr.push(
      this.fb.control(this.nuevoFavorito.value, [
        Validators.required,
        Validators.minLength(3),
      ])
    );
    this.nuevoFavorito.reset();
  }

  eliminar(index: number) {
    this.favArr.removeAt(index);
    // this.persona.favoritos.splice(index, 1);
  }

  guardar() {
    if (this.miFormulario.invalid) {
      this.miFormulario.markAllAsTouched();
      return;
    }
    console.log(this.miFormulario.value);
    // this.miFormulario.reset()
  }
}
