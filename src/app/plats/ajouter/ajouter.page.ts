import { Component, OnInit } from '@angular/core';
import { Plat } from 'src/app/Models/plat';
import { PlatsService } from 'src/app/service/plats.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ajouter',
  templateUrl: './ajouter.page.html',
  styleUrls: ['./ajouter.page.scss'],
})
export class AjouterPage implements OnInit {

  plat: Plat;
  constructor(private service: PlatsService, public toastController: ToastController,
    private route: Router) {
    this.plat = new Plat();
  }

  ngOnInit() {
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
  ajouterPlat(): void {
    this.service.postPlat(this.plat).subscribe(plat => {
      this.presentToast("Plat ajouté avec succès.");
      this.route.navigate(['/members/plats']);
    }, error => {

    })
  }

}
