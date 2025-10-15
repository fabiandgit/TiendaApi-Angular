import { Component, input } from '@angular/core';

@Component({
  selector: 'app-table',
  imports: [],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent {
  nameColumns = input<string[]>(['']);
}
