import { Component, input, output } from '@angular/core';
import { ButtonsComponent } from '../buttons/buttons.component';

@Component({
  selector: 'app-table',
  imports: [ButtonsComponent],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent {
  columns = input<any[]>([]);
  data = input<any[]>([]);

  //datos paginacion
  page = input<number>(1);
  totalPages = input<number>(1);
  pageChange = output<number>();

  edit = output<any>();
  delete = output<any>();

  onEdit(item: any) {
    this.edit.emit(item); //  Emitimos el producto
  }

  onDelete(item: any) {
    this.delete.emit(item);
  }
}
