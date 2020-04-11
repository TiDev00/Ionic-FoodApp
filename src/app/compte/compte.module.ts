import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ComptePage } from './compte.page';
import { IonicStorageModule } from '@ionic/storage';



@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    IonicStorageModule.forRoot()
    ,
    RouterModule.forChild([{ path: '', component: ComptePage }])
  ],
  declarations: [ComptePage]
})
export class ComptePageModule {}
