import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AnuncioPage } from './anuncio';

@NgModule({
  declarations: [
    AnuncioPage,
  ],
  imports: [
    IonicPageModule.forChild(AnuncioPage),
  ],
})
export class AnuncioPageModule {}
