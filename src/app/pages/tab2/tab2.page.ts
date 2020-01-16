import { Component, ViewChild, OnInit } from '@angular/core';
import { IonSegment } from '@ionic/angular';
import { NoticiasService } from 'src/app/services/noticias.service';
import { Article } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {


  @ViewChild(IonSegment, null) segment: IonSegment;

  categorias = [
    'business',
    'entertainment',
    'general',
    'health',
    'science',
    'sports',
    'technology'
  ];

  articles: Article[] = [];

  constructor(
    private noticiasService: NoticiasService
  ) { }

  ngOnInit() {
    this.segment.value=this.categorias[0];
    this.cargarNoticias(this.categorias[0]);
  }

  cambioCategoria(event) {
      this.articles=[];
      this.cargarNoticias(event.detail.value);
  }

  private cargarNoticias(categoria: string, event? ) {
    this.noticiasService.getTopHeadlinesCategory(categoria).subscribe((response) => {

      if(response.articles.length===0 && event){
        event.target.disabled=true;
        event.target.complete();
        return;
      }
      this.articles.push(...response.articles);
      if(event){
        event.target.complete();
      }
    });
  }

  public loadData(event){
    this.cargarNoticias(this.segment.value, event);
  }

}
