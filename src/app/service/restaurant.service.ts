import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Plat } from '../Models/plat';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
private plats : Plat[];  
private cart = [];
private cartItemCount = new BehaviorSubject(0);
  constructor() { }
 
  getProducts(){
    return this.plats;
  }
  getCart(){
    return this.cart
  }
  getCartItemCount (){
    return this.cartItemCount;
  }
  addProduct(plat){
    let added = false;
    for(let p of this.cart){
      if(p.id === plat.id){
        p.quantite +=1;
       
        added = true;
        break;
      }
    }
    if(!added){
      this.cart.push(plat);
    }
    this.cartItemCount.next(this.cartItemCount.value + 1)
  }

  decreaseProduct (plat){
    for(let [index,p] of this.cart.entries()){
      if(p.id === plat.id){
        p.quantite -=1;
        if(p.quantite==0){
          this.cart.splice(index,1);
        }
      }
    }
    
    this.cartItemCount.next(this.cartItemCount.value - 1);
  }

  removeProduct(plat){
    for(let [index,p] of this.cart.entries()){
      if(p.id === plat.id){
        this.cartItemCount.next(this.cartItemCount.value - p.quantite);
        this.cart.splice(index,1)
    }
  }

  }
}
