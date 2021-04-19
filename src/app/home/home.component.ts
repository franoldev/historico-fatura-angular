import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';

import { Transacao } from '../extrato/extrato.interfaces';
import { ExtratoService } from '../extrato/extrato.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  transacoes!: Transacao[];
  mesTotal!: any[];
  estaCarregando!: boolean;
  erroNoCarregamento!: boolean;
  
  constructor(
    private extratoService: ExtratoService
    ) { }

  ngOnInit() {
    this.carregarExtrato(); 
    this.inicializa(); 
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
    
    inicializa(){
      this.transacoes.map((x) => {
        this.somaValores(x)
      })
    }

    somaValores(item:Transacao){

      let nPosition: number = 0;
  
      nPosition = this.mesTotal.findIndex( x => x.mes === item.mes_lancamento)
  
      if (nPosition >= 0){
        this.mesTotal[nPosition].valor += item.valor;
      }else
      {
        this.mesTotal.push({
          mes: item.mes_lancamento,
          valor:item.valor
        })
      }
    }

  }
  
  
