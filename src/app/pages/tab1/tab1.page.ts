import { Component, OnInit } from '@angular/core';
import { NoticiasService } from 'src/app/services/noticias.service';
import { Article } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  articles: Article[] = [];

  constructor(
    private noticiasService: NoticiasService
  ) {

  }

  public ngOnInit() {
    this.cargarNoticias();
  }

  public loadData(event) {
    this.cargarNoticias(event);
  }

  private cargarNoticias(event?) {
    this.noticiasService.getTopHeadlines().subscribe((response) => {

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




}
