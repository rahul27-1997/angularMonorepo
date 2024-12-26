import { Component } from '@angular/core';

import type { ICellRendererAngularComp } from 'ag-grid-angular';
import type { ICellRendererParams } from 'ag-grid-community';

interface CustomButtonParams extends ICellRendererParams {
    onClick: () => void;
}

@Component({
    standalone: true,
    template: `<button class="btn btn-danger" (click)="invokeParentMethod()">Delete</button>`,
})
export class DeleteRenderer implements ICellRendererAngularComp {
    params:any
    onClick!: () => void;
    agInit(params: CustomButtonParams): void {
        this.onClick = params.onClick;
        this.params = params;
    }
    refresh(params: CustomButtonParams) {
        return true;
    }

    public invokeParentMethod() { this.params.context.componentParent.deleteProduct(this.params.data.id) } 
}