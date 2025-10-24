import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-table',
  imports: [],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent {
  columns = input<any[]>([]);
  data = input<any[]>([]);

  edit = output<any>();
  delete = output<any>();

  onEdit(item: any) {
    this.edit.emit(item); //  Emitimos el producto
  }

  onDelete(item: any) {
    this.delete.emit(item);
  }
}
