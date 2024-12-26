import { ComponentFixture, TestBed } from '@angular/core/testing';
import { App1HomeComponent } from './app1-home.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';

describe('App1HomeComponent', () => {
  let component: App1HomeComponent;
  let fixture: ComponentFixture<App1HomeComponent>;
  let mockStore: any;
  let mockModalRef: any;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App1HomeComponent],
      providers: [provideMockStore({}),provideHttpClient(), provideHttpClientTesting()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(App1HomeComponent);
    component = fixture.componentInstance;
    mockStore = {
      select: jest.fn()
    }
    // mockStore = TestBed.inject(MockStore);
    mockModalRef = {
      close: jest.fn()
    };
    component.rowData = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getproducts', () => {
    const storeSpy = jest.spyOn(component.store, 'dispatch')
    component.getProducts();
    fixture.detectChanges();
    expect(storeSpy).toHaveBeenCalledTimes(1);
  });

  it('should call addProduct', () => {
    const storeSpy = jest.spyOn(component.store, 'dispatch')
    component.addProduct();
    fixture.detectChanges();
    expect(storeSpy).toHaveBeenCalledTimes(1);
  });

  it('should call deleteProduct', () => {
    const storeSpy = jest.spyOn(component.store, 'dispatch')
    component.deleteProduct(1);
    fixture.detectChanges();
    expect(storeSpy).toHaveBeenCalledTimes(1);
  });

  it('should call submit', () => {
    const storeSpy = jest.spyOn(component.store, 'dispatch');
    component.modalRef = mockModalRef;
    component.submit();
    fixture.detectChanges();
    expect(storeSpy).toHaveBeenCalledTimes(1);
  });

  it('should set rowdata to empty array if response is empty',()=>{
    mockStore.select.mockReturnValue(of([]));

    component.setRowData();

    expect(component.rowData).toEqual([]);
  })

  it('should set rowdata to empty array if response is null',()=>{
    mockStore.select.mockReturnValue(of(null));

    component.setRowData();

    expect(component.rowData).toEqual([]);
  })
});
