import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal/modal.component';
import { TabsContainerComponent } from './tabs-container/tabs-container.component';
import { TabComponent } from './tab/tab.component';
import { InputComponent } from './input/input.component';

@NgModule({
  declarations: [],
  imports: [CommonModule, ModalComponent, TabsContainerComponent, TabComponent, InputComponent],
  exports: [ModalComponent, TabsContainerComponent, TabComponent, InputComponent],
})
export class SharedModule {}
