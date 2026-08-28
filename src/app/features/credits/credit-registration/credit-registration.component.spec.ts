import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreditRegistrationComponent } from './credit-registration.component';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('CreditRegistrationComponent', () => {
  let component: CreditRegistrationComponent;
  let fixture: ComponentFixture<CreditRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreditRegistrationComponent, NoopAnimationsModule],
      providers: [provideHttpClient(), provideRouter([])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreditRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
