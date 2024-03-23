import { Component, ContentChildren, AfterContentInit, QueryList } from '@angular/core';
import { TabComponent } from '../tab/tab.component';
import { CommonModule, NgFor } from '@angular/common';
@Component({
  selector: 'app-tabs-container',
  standalone: true,
  imports: [CommonModule, NgFor],
  templateUrl: './tabs-container.component.html',
  styleUrl: './tabs-container.component.css',
})
export class TabsContainerComponent implements AfterContentInit {
  @ContentChildren(TabComponent) tabs: QueryList<TabComponent> = new QueryList();

  ngAfterContentInit(): void {
  
    console.log(this.tabs);
  }
}
