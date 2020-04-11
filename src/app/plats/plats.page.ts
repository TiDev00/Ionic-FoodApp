import { Component, OnInit, AfterContentInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlatsService } from '../service/plats.service';
import { Plat } from '../Models/plat';

@Component({
  selector: 'app-tab2',
  templateUrl: 'plats.page.html',
  styleUrls: ['plats.page.scss']
})
export class Tab2Page {
 
  ionViewDidEnter(){
    this.getPlats();

  }

  plats : Plat [];
  constructor(private route : Router, private api : PlatsService) {

    this.getPlats();
  }

  modifierPlat (id:any):void
  {
    this.route.navigate(['members/plats/modifier',id]);
  }

  getPlats() : void
  {
    this.api.getPlats().subscribe(Response=>{
      this.plats = Response;
    });
  }
  delete(plat:Plat):void
  {
    this.api.deletePlat(plat.id).subscribe(plat =>{
      this.getPlats();
    });
  }
}
