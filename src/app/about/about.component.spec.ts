import { TestBed, ComponentFixture } from "@angular/core/testing";
import { AboutComponent } from "./about.component";


describe('About Component', () => {
  // init Component fixture with generic and use beforeEach to create a new instance of the component for testing.
  let component: AboutComponent;
  let fixture: ComponentFixture<AboutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(AboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});