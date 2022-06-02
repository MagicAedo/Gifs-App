import { Component, OnInit } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent  {

 

  buscar(busqueda:string){ 

    console.log(busqueda);

    this.gifsService.buscarGifs(busqueda);
  }
  
  get historialFromService():string[]{ 
    return this.gifsService.historial; 
  }

  constructor(private gifsService:GifsService){}


  
}
