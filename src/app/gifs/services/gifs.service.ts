import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private _historial: string[] = [];
  api_key:string =  'Z5E1i5LNM5bbqG1YzUGxQUjC4bqLvNUh'; 
  servicioUrl: string = 'https://api.giphy.com/v1/gifs';

  //Cambiar ANY por su tipo correspondiente
  public resultados: Gif[] = [];

  constructor(private http: HttpClient) {
    this._historial = JSON.parse(localStorage.getItem('historial')!) || []

    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || {}

    // if(localStorage.getItem('historial')){ 
    //   this._historial = JSON.parse(localStorage.getItem('historial')!);
    // }


  }



  public get historial(): string[] {
    return [...this._historial];
  }

  buscarGifs(query: string) {
    query = query.trim().toLocaleLowerCase();

    if (!this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0, 10);

      localStorage.setItem('historial', JSON.stringify(this._historial))

    }
    /*
    Esta es una forma de hacerla con JS tradicional
    fetch('https://api.giphy.com/v1/gifs/search?api_key=Z5E1i5LNM5bbqG1YzUGxQUjC4bqLvNUh&q=jojos&limit=10')
      .then((resp) => {
        resp.json().then(
          (data) => {
            console.log(data);
          }

        )
      })
    utilizando buscarGifs como una Async function
    const resp = await fetch('https://api.giphy.com/v1/gifs/search?api_key=Z5E1i5LNM5bbqG1YzUGxQUjC4bqLvNUh&q=jojos&limit=10');
    const data = await resp.json(); 
    console.log(data); */
    //ahora utilizando el modulo HttpClient



    const params = new HttpParams()
    .set('api_key',this.api_key)
    .set('limit','10')
    .set('q',query);

    this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search`,{params})
      .subscribe((resp) => {
        this.resultados = resp.data;
        localStorage.setItem('resultados', JSON.stringify(this.resultados));
      })

  }

}
