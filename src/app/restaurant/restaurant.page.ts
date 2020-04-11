import { Component, OnInit } from '@angular/core';
import { Plat } from '../Models/plat';
import { PlatsService } from '../service/plats.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.page.html',
  styleUrls: ['./restaurant.page.scss'],
})
export class RestaurantPage {
  plats : Plat [];
  selectedCheckbox: any;
  constructor(private api : PlatsService, public toastController: ToastController,
    private route: Router) {
    
   }

   ionViewWillEnter() {
    this.getPlats();
    this.selectedCheckbox = {};
  }
  getPlats() : void
  {
    this.api.getPlats().subscribe(Response=>{
      this.plats = Response;
    });
  }
  getChanged(e){
    if(!this.selectedCheckbox[e])
    {    
      this.selectedCheckbox[e] = true;
    }
    else{
      this.selectedCheckbox[e] = false;
    }
    console.log(this.selectedCheckbox);
  }
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: 'success',
      position: 'top'
    });
    toast.present();
  }
  ajouterPlatJour(): void {
    for (let plat of this.plats) {
      this.api.updatePlat(plat.id,plat).subscribe(plat=> {
        this.presentToast("Plat(s) ajouté(s) avec succès dans le menu du jour .");
        this.route.navigateByUrl('/members/home');
      })
  };
}

}
