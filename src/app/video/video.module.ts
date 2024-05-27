import { NgModule } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { environment } from '../../environments/environment.development';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
    NgClass,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule
  ]
})
export class VideoModule { }
