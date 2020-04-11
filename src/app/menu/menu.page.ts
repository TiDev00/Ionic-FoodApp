import { Component, OnInit } from '@angular/core';
import { Plat } from '../Models/plat';
import { PlatsService } from '../service/plats.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'menu.page.html',
  styleUrls: ['menu.page.scss']
})
export class MenuPage{
  plats : Plat [];
  constructor(private api : PlatsService) {
    
  }
  ionViewWillEnter(){
    this.getPlats();
  }
  getPlats() : void
  {
    this.api.getPlats().subscribe(Response=>{
      this.plats = Response;
    });
  }
}
