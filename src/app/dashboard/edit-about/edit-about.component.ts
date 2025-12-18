// edit-about.component.ts
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { AboutService } from '../../core/services/about.service';

@Component({
  selector: 'app-edit-about',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
  ],
  templateUrl: './edit-about.component.html',
  styleUrl: './edit-about.component.css',
})
export class EditAboutComponent implements OnInit {
  aboutForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    facebookLink: new FormControl('', [Validators.required]),
  });

  constructor(private _aboutS: AboutService, private _snackBar: MatSnackBar) {}
  ngOnInit(): void {
    this._aboutS.getAbout().subscribe({
      next: (res) => {
        const about = res.data[0];
        this.aboutForm.patchValue({
          title: about.title,
          facebookLink: about.facebookLink,
        });
      },
    });
  }

  get title() {
    return this.aboutForm.get('title');
  }

  get facebookLink() {
    return this.aboutForm.get('facebookLink');
  }

  onSubmit() {
    if (this.aboutForm.invalid) {
      this.aboutForm.markAllAsTouched();
      return;
    }

    const data = {
      title: this.title!.value!,
      facebookLink: this.facebookLink!.value!,
    };

    this._aboutS.updateAbout(data).subscribe({
      next: () => {
        this._snackBar.open('Updated successfully!', 'Close', {
          duration: 3000,
        });
      },
      error: () => {
        this._snackBar.open('Update failed, try again!', 'Close', {
          duration: 3000,
        });
      },
    });
  }
}
