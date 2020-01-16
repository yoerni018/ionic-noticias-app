import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Article } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {


  articles:Article[]=[];

  constructor(
    private storage: Storage
  ) { 
    console.log("Init service cargar favoritos");
    this.cargarFavoritos();
  }


  public guardarNoticia(article:Article){
    const existe = this.articles.find( art => art.title===article.title );
    if(!existe){
      this.articles.unshift(article);
      this.storage.set('favoritos',this.articles);
    }
  }

  public borrarNoticia(article:Article){
      this.articles = this.articles.filter( art =>  art.title!==article.title );
      this.storage.set('favoritos',this.articles);
  }


  async cargarFavoritos(){
    const favoritos = await this.storage.get('favoritos');
    if(favoritos){
      this.articles = favoritos;  
    }
  }


}
