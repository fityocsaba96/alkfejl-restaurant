import { NgModule } from '@angular/core';
import { MatToolbarModule, MatButtonModule, MatMenuModule, MatProgressSpinnerModule,
  MatIconModule, MatListModule, MatCardModule, MatTableModule, MatInputModule,
  MatSelectModule, MatSnackBarModule, MatFormFieldModule } from '@angular/material';

@NgModule({
  imports: [MatToolbarModule, MatButtonModule, MatMenuModule, MatProgressSpinnerModule,
    MatIconModule, MatListModule, MatCardModule, MatTableModule, MatInputModule,
    MatSelectModule, MatSnackBarModule, MatFormFieldModule],
  exports: [MatToolbarModule, MatButtonModule, MatMenuModule, MatProgressSpinnerModule,
    MatIconModule, MatListModule, MatCardModule, MatTableModule, MatInputModule,
    MatSelectModule, MatSnackBarModule, MatFormFieldModule]
})
export class MaterialModule { }
