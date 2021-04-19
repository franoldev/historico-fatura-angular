import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'Itaú Gastos Cartão';
  palavra = 'CARRO';
  favoriteColor = 'green';

 constructor() {}
   
   
 //eventoRecebido($event) {
  // console.log('AppComponent: EVENTO RECEBIDO!', $event);}//
 
 //onValorAtualizadoNoContador() {
   //console.log('onValorAtualizadoNoContador: ', novoValor); }//

}
