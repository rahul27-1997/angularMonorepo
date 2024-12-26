import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataServiceService } from '../services/data-service.service';
import { Store } from '@ngrx/store';
import { loadProducts,addProduct, deleteProduct } from '../store/app1.actions';
import { AppState } from '../store/app1.state';
import { selectProducts } from '../store/app1.selectors';
import { AllCommunityModule, ColDef, GridApi, GridOptions, ModuleRegistry } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyFieldConfig, FormlyFormOptions, FormlyModule } from '@ngx-formly/core';
import { DeleteRenderer } from '../cell-renderers/delete-renderer.component';
import { CapitalPipe } from 'libs/src/lib/utils/capital.pipe'

ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
  selector: 'app-app1-home',
  imports: [CommonModule,AgGridAngular,NgbModule, ReactiveFormsModule,
    FormlyBootstrapModule,FormlyModule],
    providers: [CapitalPipe],
  templateUrl: './app1-home.component.html',
  styleUrl: './app1-home.component.scss',
})
export class App1HomeComponent implements OnInit{

  dataService = inject(DataServiceService);

  public paginationPageSize = 10;

  public paginationPageSizeSelector: number[] | boolean = [10,20];

  rowData = [];

  modalRef: any;

  colDefs: ColDef[] = [
    { field: "title" },
    {field: "image",
      cellRenderer: (params:any) => {
       if(params.value){
        return `<img style="height: 40px; width: 40px" src=${params.value} />`
       }else{
       return `No Preview`
       }
      },
      cellClass: ['d-flex','justify-content-center','align-items-center']
    },
    { field: "category",
      cellRenderer: (params:any) => {
        return `<div>${this.capitalPipe.transform(params.value)}</div>`;
   }
    },
    { field: "price" },
    { field: "description",
      cellRenderer: (params:any) => {
        return `<div>${this.capitalPipe.transform(params.value)}</div>`;
   }
     },
    {
      headerName: 'Action',
      cellRenderer: DeleteRenderer,
      cellClass: ['d-flex','justify-content-center','align-items-center']
   }
  ];

  defaultColDef: ColDef = {
    flex: 1,
  };

  form:FormGroup = new FormGroup({});
  model: any = {};
  options: FormlyFormOptions = {
    formState: {
      awesomeIsForced: false,
    },
  };
  fields: FormlyFieldConfig[] = [
    {
      key: 'title',
      type: 'input',
      props: {
        label: 'Title',
        placeholder: 'Enter title'
      },
    },
    {
      key: 'price',
      type: 'number',
      props: {
        label: 'Price',
        placeholder: 'Enter price'
      },
    },
    {
      key: 'category',
      type: 'input',
      props: {
        label: 'category',
        placeholder: 'Enter category'
      }
    },
    {
      key: 'description',
      type: 'input',
      props: {
        label: 'Description',
        placeholder: 'Enter Description'
      }
    }
  ];
  gridOptions!: any;
  
  constructor(public store: Store<AppState>,private modalService: NgbModal,private capitalPipe:CapitalPipe){
    this.gridOptions = <GridOptions>{
      context: {
          componentParent: this
      }
  };
  }

  ngOnInit(): void {
    this.setRowData();
  }

  setRowData(){
    this.store.select(selectProducts).subscribe((res)=>{
      if(res && res.length>0){
        this.rowData = res;
      }else{
        this.rowData = [];
      }
    })
  }

  getProducts(){
    this.store.dispatch(loadProducts());
  }

  addProduct(){
    const product = {title: "fsf", category: 'New Todo', price: 100,description: 'dsaff' };
    this.store.dispatch(addProduct({product}));
  }

  deleteProduct(idPassed:number){
    this.store.dispatch(deleteProduct({id: idPassed}));
  }
  
  openModal(content:any) {
    console.log("open modall called")
    this.modalRef = this.modalService.open(content);
  }

  submit(){
    const product = {...this.model,id:Math.floor(Math.random() * 100)};
    this.store.dispatch(addProduct({product}));
    this.form.reset()
    this.modalRef.close();
  }
}
