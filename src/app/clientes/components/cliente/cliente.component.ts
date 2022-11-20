import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Cliente } from '../../models/cliente';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements AfterViewInit {

  displayedColumns: string[] = ['idCliente', 'nome', 'telefone', 'acoes'];

  cliente: Cliente[] = [];

  id: number = 0;

  dataSource = new MatTableDataSource<Cliente>(this.cliente);

  formCliente: FormGroup = this.fb.group({
    nome: ['', [Validators.required]],
    telefone: ['', [Validators.required, Validators.maxLength(11)]]
  });

  constructor(
    private fb: FormBuilder,
    private _liveAnnouncer: LiveAnnouncer
  ) { }

  busca(event: Event) {
    const valorBusca = (event.target as HTMLInputElement).value;
    this.dataSource.filter = valorBusca.trim().toLowerCase();
  }

  @ViewChild(MatSort) sort: MatSort

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  mudarBusca(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  deletarCliente(c: Cliente) {
    this.cliente = this.cliente.filter(i => i !== c);
    this.dataSource = new MatTableDataSource<Cliente>(this.cliente);
  }

  salvar(): void {
    const c: Cliente = this.formCliente.value;

    c.idCliente = this.id + 1;

    this.id = c.idCliente;

    this.cliente.push(c);

    console.log(this.cliente);

    this.dataSource._updateChangeSubscription();

    this.formCliente.reset();
  }
}