import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioModel } from '../../app/models/usuarioModel';
import 'rxjs/add/operator/map';
/*
  Generated class for the UsuariolProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UsuariolProvider {
      private url_l = 'https://localhost:3000/api/usuario/'

  constructor(public http: HttpClient) {
    console.log('Hello UsuariolProvider Provider');
  }


  getAll(usuario: UsuarioModel){
    return new Promise((resolve, reject) =>{

      let lista_url = this.url_l + 'listar';
      this.http.get(lista_url)
      .subscribe((result: any)=>{
        resolve(result.json());
      },
      (error)=>{
        reject(error.json());
      })
    });
  }
}
