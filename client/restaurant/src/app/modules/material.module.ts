import { NgModule } from '@angular/core';
import { MatToolbarModule, MatButtonModule, MatMenuModule, MatProgressSpinnerModule,
  MatIconModule, MatListModule, MatCardModule, MatTableModule, MatInputModule, MatSelectModule } from '@angular/material';

@NgModule({
  imports: [MatToolbarModule, MatButtonModule, MatMenuModule, MatProgressSpinnerModule,
    MatIconModule, MatListModule, MatCardModule, MatTableModule, MatInputModule, MatSelectModule],
  exports: [MatToolbarModule, MatButtonModule, MatMenuModule, MatProgressSpinnerModule,
    MatIconModule, MatListModule, MatCardModule, MatTableModule, MatInputModule, MatSelectModule]
})
export class MaterialModule { }
