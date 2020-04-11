
import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { RestaurantService } from '../service/restaurant.service';
import { Plat } from '../Models/plat';
import { CommandeService } from '../service/commande.service';
import { Commande } from '../Models/commande';


 
@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
 
  cart: Plat[] = [];
  commande : Commande;
  constructor(private cartService: RestaurantService,
     private modalCtrl: ModalController, 
     
     private commandeservice : CommandeService,
    public toastController: ToastController,
  
    private service : RestaurantService,)  {
      this.commande = new Commande();
     }
 
  ngOnInit() {
    this.cart = this.cartService.getCart();
  }
 
  decreaseCartItem(product) {
    this.cartService.decreaseProduct(product);
  }
 
  increaseCartItem(product) {
    this.cartService.addProduct(product);
  }
 
  removeCartItem(product) {
    this.cartService.removeProduct(product);
  }
 
  getTotal() {
    return this.cart.reduce((i, j) => i + j.prix * j.quantite, 0);
  }
 
  close() {
    this.modalCtrl.dismiss();
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

  async AntipresentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: 'danger',
      position: 'top'
    });
    toast.present();
  }
 
  async checkout() {
    // Perfom PayPal or Stripe checkout process
    if(this.cart.length > 0){
    this.commande.platsCommandes=this.cart;
    this.commande.dateCommande= new Date().toLocaleDateString();
    this.commandeservice.postCommande(this.commande).subscribe(plat => {
      this.presentToast("Merci pour votre votre commande!");
      this.cart.splice(0,this.cart.length);
      this.service.getCartItemCount().next( this.service.getCartItemCount().value -  this.service.getCartItemCount().value);
      
    }, error => {
      console.log(error);
    })
  }
  else{
    this.AntipresentToast("Aucun repas à commander");
  }
   
  }
}