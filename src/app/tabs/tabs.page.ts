import { Component } from '@angular/core';
import { Storage} from '@ionic/storage';
import { Utilisateur } from '../Models/utilisateur';
@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
    user : Utilisateur;
    role : string ="";
  constructor(private storage : Storage) {
  }
  ionViewWillEnter(){
    console.log(this.role);
    this.getRole();
  }

  getRole():void {
    this.storage.get('user').then((val)=>{
     this.role=val.user.role.name;
    })
  }
}
