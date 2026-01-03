import { Component, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './contacto.html',
  styleUrls: ['./contacto.css']
})
export class Contacto implements OnDestroy {

  formulario!: FormGroup;
  enviado = false;

  private destroy$ = new Subject<void>();
  private resetTimer: ReturnType<typeof setTimeout> | null = null;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {
    this.formulario = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      mensaje: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  enviar(): void {
  if (this.formulario.invalid) {
    this.formulario.markAllAsTouched();
    return;
  }

  this.http.post('https://primersitiowebconback-back-production.up.railway.app/contacto', this.formulario.value)
    .subscribe({
      next: () => {
        this.enviado = true;
        this.formulario.reset();
        this.cdr.detectChanges();

        if (this.resetTimer) {
          clearTimeout(this.resetTimer);
        }

        this.resetTimer = setTimeout(() => {
          this.enviado = false;
          this.cdr.detectChanges();
        }, 4000);
      },
      error: (err) => {
        console.error(err);
        alert('Error del servidor');
      }
    });
}


  ngOnDestroy(): void {
    if (this.resetTimer) {
      clearTimeout(this.resetTimer);
    }

    this.destroy$.next();
    this.destroy$.complete();
  }
}
