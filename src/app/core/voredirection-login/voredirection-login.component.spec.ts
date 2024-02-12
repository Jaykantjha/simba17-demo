import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VORedirectionLoginComponent } from './voredirection-login.component';

describe('VORedirectionLoginComponent', () => {
  let component: VORedirectionLoginComponent;
  let fixture: ComponentFixture<VORedirectionLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VORedirectionLoginComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VORedirectionLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
