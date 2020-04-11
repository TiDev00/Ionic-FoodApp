import { Component, OnInit } from '@angular/core';

import {FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ToastController } from '@ionic/angular';
import {Router } from '@angular/router';
import { AuthServiceService } from '../service/auth-service.service';
import { UtilsService } from '../utils.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  isLogin = true;
  Form: FormGroup;
  
  constructor(private service : AuthServiceService,
  private utils: UtilsService,
  private formBuilder: FormBuilder, private toastController: ToastController,
  private route : Router,
  private storage: Storage) { }

  ngOnInit() {
    this.Form = this.formBuilder.group({
      'identifier' : [null, [Validators.required,Validators.email]],
      'password' : [null, [Validators.required]],
      'username' : [null, [Validators.required,Validators.minLength(3)]],
      'email' : [null, [Validators.required,Validators.email]],
      'nom' : [null, [Validators.required]],
      'prenom' : [null, [Validators.required]],
      'phone' : [null, [Validators.required]]
        });
      }
  
  
  async login(userInfo : any){
    console.log(this.service.redirectUrl);
    const res =await this.service.login(userInfo).subscribe(data=>{
    this.service.isAuth = true;
    window.localStorage.setItem('token',data.jwt);
    this.storage.set('user',data);
    
    this.route.navigateByUrl(this.service.redirectUrl);
    console.log(data);
    },error=>{
      console.log(error);
    this.utils.presentToast("Nom d'utilisateur ou mot de passe incorrect",'danger');
    
    });
  }
  onSwitchAuthMode() {
    this.isLogin = !this.isLogin;
  }
  register(userInfo: any) {
    this.service.register(userInfo).subscribe(data=>{
      this.utils.presentToast('Inscription réussie','success');
      this.route.navigateByUrl('login');
    },error=>{
      switch (error.error.message[0].messages[0].id){
          case "Auth.form.error.email.taken":
          this.utils.presentToast('Email déjà utilisé!','danger');
          break;
          case "Auth.form.error.username.taken":
          this.utils.presentToast("Nom d'utilisateur déjà utilisé!",'danger');
          break;
          default:
          this.utils.presentToast('Une erreur est survenue!','danger');
          break;
      }
  });
}
authenticate(userInfo: any,isLogin : boolean) {
  if(!isLogin)
  this.login(userInfo)
  else
  this.register(userInfo)
}
}

