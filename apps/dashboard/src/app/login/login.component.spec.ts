import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
    let router:Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent,ReactiveFormsModule],
      providers: [provideHttpClient(), provideHttpClientTesting(),FormBuilder]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should go to homepage on login if form is valid', () => {
    const navigateSpy = jest.spyOn(router,'navigate');

    component.form.controls['firstName'].setValue('rahul');
    component.form.controls['lastName'].setValue('test');
    component.form.controls['email'].setValue('test@test.com');
    component.submit()

    expect(navigateSpy).toHaveBeenCalledWith(['/home111']);
  });

  it('should not go to homepage on login if form is invalid', () => {
    const navigateSpy = jest.spyOn(router,'navigate');

    component.form.controls['firstName'].setValue('null');
    component.form.controls['lastName'].setValue('null');
    component.form.controls['email'].setValue('null');
    component.submit()

    expect(navigateSpy).not.toHaveBeenCalledWith(['/home']);
  });
});
