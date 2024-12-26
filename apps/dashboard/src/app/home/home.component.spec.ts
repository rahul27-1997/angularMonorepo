import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { Router } from '@angular/router';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let router:Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
       providers: [provideHttpClient(), provideHttpClientTesting()]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should route to app 1 ', () => {
    const navigateSpy = jest.spyOn(router,'navigate');
    component.goToApp1();
    expect(navigateSpy).toHaveBeenCalledWith(['/shellapp']);
 });

 it('should route to app 2 ', () => {
  const navigateSpy = jest.spyOn(router,'navigate');
  component.goToApp2();
  expect(navigateSpy).toHaveBeenCalledWith(['/shellapp2']);
});


it('should logout', () => {
  const navigateSpy = jest.spyOn(router,'navigate');
  component.logout();
  expect(navigateSpy).toHaveBeenCalledWith(['']);
});
});
