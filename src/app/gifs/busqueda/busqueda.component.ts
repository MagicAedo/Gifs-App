import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent {

  @ViewChild('txtEnter') txtEnter!:ElementRef<HTMLInputElement>; 

  constructor(private gifsService:GifsService) { }

  buscar() { 
    const value:string =this.txtEnter.nativeElement.value 
    if(value.trim().length === 0){ 
      return;
    }
 
    this.gifsService.buscarGifs(value)
    this.txtEnter.nativeElement.value = ''; 
  }


  //Funcionalidad Empty input sin viewchild
  // buscar(txt: HTMLInputElement) {
  //   console.log(txt.value);
  //   txt.value = '';
  // }


}