import { Component, ViewChild, ElementRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { RestaurantService } from '../service/restaurant.service';
import { ModalController } from '@ionic/angular';
import { Plat } from '../Models/plat';
import { PlatsService } from '../service/plats.service';
import { CartPage } from '../cart/cart.page';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage{
cart = [];
plats : Plat [];
cartItemCount : BehaviorSubject<number>;


@ViewChild('cart', {static: false, read: ElementRef})fab: ElementRef;
  constructor(
    private service : RestaurantService,
    private modalCtrl : ModalController,
    private api : PlatsService
  ) { }
  ionViewWillEnter(){
    this.getPlats();
    this.cart = this.service.getCart();
    this.cartItemCount=this.service.getCartItemCount();
  }
  getPlats() : void
  {
    this.api.getPlats().subscribe(Response=>{
      this.plats = Response;
    });
  }
  
  addToCart(plat){
    this.service.addProduct(plat)

  }

  async openCart() {
    this.animateCSS('bounceOutLeft', true);
 
    let modal = await this.modalCtrl.create({
      component: CartPage,
      cssClass: 'cart-modal'
    });
    modal.onWillDismiss().then(() => {
      this.fab.nativeElement.classList.remove('animated', 'bounceOutLeft')
      this.animateCSS('bounceInLeft');
    });
    modal.present();
  }
 
  animateCSS(animationName, keepAnimated = false) {
    const node = this.fab.nativeElement;
    node.classList.add('animated', animationName)
    
    //https://github.com/daneden/animate.css
    function handleAnimationEnd() {
      if (!keepAnimated) {
        node.classList.remove('animated', animationName);
      }
      node.removeEventListener('animationend', handleAnimationEnd)
    }
    node.addEventListener('animationend', handleAnimationEnd)
  }
}
