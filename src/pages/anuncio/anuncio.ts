
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';


/**
 * Generated class for the AnuncioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-anuncio',
  templateUrl: 'anuncio.html',
})
export class AnuncioPage {

  //usuario: Array<UsuarioModel> = new Array<UsuarioModel>();


  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CadastroPage');
  }

 // async listar(): Promise<void> {
    //try{
    //  let listar = await this.usuarioSrv.listar();
   //   console.log(listar);
    //  if(listar.success){
    //    this.usuario = listar.data;
    //  }
  //  }catch (error){
   //   console.log('Problema na listagem' + error);
  //  }
 // }

}
