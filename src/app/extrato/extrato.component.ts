import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';

import { Transacao } from './extrato.interfaces';
import { ExtratoService } from './extrato.service';

@Component({
  selector: 'app-extrato',
  templateUrl: './extrato.component.html',
  styleUrls: ['./extrato.component.scss']
})
export class ExtratoComponent implements OnInit {

  transacoes!: Transacao[];
  estaCarregando!: boolean;
  erroNoCarregamento!: boolean;
  
  constructor(
    private extratoService: ExtratoService
    ) { }

  ngOnInit() {
    this.carregarExtrato();   
  }
  
  carregarExtrato() {
    this.estaCarregando = true;
    this.erroNoCarregamento = false;
    
    this.extratoService.getTransacoes()
      .pipe(
        finalize(() => this.estaCarregando = false)
      )
      .subscribe (
        response => this.onSuccess(response),
        error =>this.onError(error),        
      );
    }
    
    onSuccess(response: Transacao[]){
      this.transacoes = response;
    }

    onError(error: any) {
      this.erroNoCarregamento = true;
    }  
  }
