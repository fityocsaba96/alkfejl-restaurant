import { NgModule } from '@angular/core';
import { MatToolbarModule, MatButtonModule, MatMenuModule, MatProgressSpinnerModule,
  MatIconModule, MatListModule, MatCardModule, MatTableModule, MatInputModule,
  MatSelectModule, MatSnackBarModule, MatFormFieldModule, MatDialogModule } from '@angular/material';

@NgModule({
  imports: [MatToolbarModule, MatButtonModule, MatMenuModule, MatProgressSpinnerModule,
    MatIconModule, MatListModule, MatCardModule, MatTableModule, MatInputModule,
    MatSelectModule, MatSnackBarModule, MatFormFieldModule, MatDialogModule],
  exports: [MatToolbarModule, MatButtonModule, MatMenuModule, MatProgressSpinnerModule,
    MatIconModule, MatListModule, MatCardModule, MatTableModule, MatInputModule,
    MatSelectModule, MatSnackBarModule, MatFormFieldModule, MatDialogModule]
})
export class MaterialModule { }
