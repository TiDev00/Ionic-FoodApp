import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommandeService } from '../service/commande.service';
import { Commande } from '../Models/commande';
import { Plat } from '../Models/plat';
import { Storage} from '@ionic/storage';

@Component({
  selector: 'app-commande',
  templateUrl: './commande.page.html',
  styleUrls: ['./commande.page.scss'],
})
export class CommandePage{
  dateDuJour= new Date();
  commandes :Commande[];
  plats: Plat[]
  commandesDuJour : Commande[];
  constructor(private route : Router, private api : CommandeService,  private storage: Storage,) {
    
  }
  ionViewWillEnter(){
    this.getCommandes();
     
  }

  
  async getCommandes() 
  {

    let obs = await this.api.getCommandes().subscribe(Response=>{
      this.commandes = Response;
    });

  }

  

}
