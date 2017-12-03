import { NgModule } from '@angular/core';
import { MatToolbarModule, MatButtonModule, MatMenuModule, MatProgressSpinnerModule,
  MatIconModule, MatListModule, MatCardModule } from '@angular/material';

@NgModule({
  imports: [MatToolbarModule, MatButtonModule, MatMenuModule, MatProgressSpinnerModule,
    MatIconModule, MatListModule, MatCardModule],
  exports: [MatToolbarModule, MatButtonModule, MatMenuModule, MatProgressSpinnerModule,
    MatIconModule, MatListModule, MatCardModule]
})
export class MaterialModule { }
