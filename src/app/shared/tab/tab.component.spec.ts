import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TabComponent } from './tab.component';
import { By } from '@angular/platform-browser';

describe('TabComponent', () => {
  let component: TabComponent;
  let fixture: ComponentFixture<TabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have .hidden class', () => {
    // access via browser
    const element = fixture.debugElement.query(
      By.css('.hidden')
    );
    // access DOM API - no access to browser (potentially less reliable)
    const element2 = fixture.nativeElement.querySelector('.hidden');
    // we don't need to use Angular to select from the DOM but not reliable since it doesn't use the fixture.
    const element3 = document.querySelector('.hidden');

    expect(element).toBeTruthy();
  })
  it('should not have .hidden class', () => {
    // change active property to true
    component.active = true;
    fixture.detectChanges();

    const element = fixture.debugElement.query(
      By.css('.hidden')
    );

    // check if the inverted bool is true
    expect(element).not.toBeTruthy();
  })
});
