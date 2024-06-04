import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { NavComponent } from './nav.component';
import { AuthService } from '../services/auth.service';
// RouterTestingModule is depreciated, but Angular documentation on replacing the method for testing with provideRoute is lacking at the time of this test creation. see more at https://v17.angular.io/api/router/testing/RouterTestingModule It seems like some refactoring in the nav component is necessary to implement a new testing method for route handling.
import { RouterTestingModule } from "@angular/router/testing";

describe('NavComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;
  // create a spy to see how often the auth is run
  const mockedAuthService = jasmine.createSpyObj('AuthService', [
    'createUser', 'logout'
  ], {
    // set auth to always true with rxjs of method
    isAuthenticatedWithDelay$: of(true)
  })

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavComponent, RouterTestingModule],
      providers: [
        { provide: AuthService, useValue: mockedAuthService }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should logout', () => {
    // logout li is third in the nav list
    const logoutLink = fixture.debugElement.query(By.css('li:nth-child(3) a'))

    expect(logoutLink).withContext('Not logged in').toBeTruthy();
    //Test the click functionality for logging out
    logoutLink.triggerEventHandler('click');

    const service = TestBed.inject(AuthService);

    expect(service.logout).withContext('Could not click logout link').toHaveBeenCalledTimes(1);
  })
});
