import { NgModule } from '@angular/core';
import { MatToolbarModule, MatButtonModule, MatMenuModule, MatProgressSpinnerModule, MatIconModule } from '@angular/material';

@NgModule({
  imports: [MatToolbarModule, MatButtonModule, MatMenuModule, MatProgressSpinnerModule, MatIconModule],
  exports: [MatToolbarModule, MatButtonModule, MatMenuModule, MatProgressSpinnerModule, MatIconModule]
})
export class MaterialModule { }
