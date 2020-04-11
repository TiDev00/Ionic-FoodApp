import { Component } from '@angular/core';
import { Storage} from '@ionic/storage';
import { Router } from '@angular/router';
import { UtilisateurService } from '../service/utilisateur.service';
import { AuthServiceService } from '../service/auth-service.service';
import { AlertController } from '@ionic/angular';
import { FormGroup } from '@angular/forms';
import { ImageService } from '../service/image.service';
import { Images } from '../Models/images';
import { URL } from 'src/environments/environment';

import {
  Plugins,
  Capacitor,
  CameraSource,
  CameraResultType
} from '@capacitor/core';
import { UtilsService } from '../utils.service';



@Component({
  selector: 'app-compte',
  templateUrl: 'compte.page.html',
  styleUrls: ['compte.page.scss']
})

export class ComptePage {
   user : any;
   id:number;
   form: FormGroup;
  images:Images[];
  image:any = URL;
  imageData;

  constructor(private utils: UtilsService,
    private storage : Storage,
    private route : Router, 
    private api : UtilisateurService,
    private service:AuthServiceService,
    private apiImage : ImageService, 
    private alrCtrl : AlertController
     ) { 
      
  }
  async ionViewWillEnter(){
  let obs =await  this.storage.get('user').then((val)=>{
      this.id=val.user.id;
      this.getUtilisateur(this.id);
      this.getFiles();
      })     
  }
  
  getUtilisateur(id : number) {

      let obs =  this.api.getUtilisateur(id).subscribe(reponse=> {
        this.user = reponse;
     })
  }
  async getFiles() {

    let obs = await this.apiImage.getFiles().subscribe(reponse=> {
      this.images=reponse;
      for(let image of this.images){
        console.log(image.related);
        for(let user of image.related){
          if(this.id===user.id){
          this.image+=image.url;
          }
        }
      }
   })
  }
  logout():void{
    window.localStorage.removeItem('token');
    this.storage.set('auth',false);
  
    this.route.navigateByUrl('login')
  }
  capture(){
    
    if (!Capacitor.isPluginAvailable('Camera')) {
      return;
    }
    Plugins.Camera.getPhoto({
      quality: 50,
      source: CameraSource.Prompt,
      correctOrientation: true,
      resultType: CameraResultType.DataUrl
    })
      .then(imageData => {
        this.imageData =imageData.dataUrl;
        this.upload();
      })
      .catch(error => {
        console.log(error);
        return false;
      });

  }
    async upload(){
    const date = new Date().valueOf();
    // Replace extension according to your media type
    const imageName = date + '.jpeg';
    // call method that creates a blob from dataUri
    const fr = new FileReader();
    const imageBlob = this.dataURLtoBlob(this.imageData);
    const imageFile = new File([imageBlob], imageName, { type: this.imageData.type });
    let  postData = new FormData();
    postData.append('ref',"user");
    postData.append('source','users-permissions');
    postData.append('field','avatar');
    postData.append('files', imageFile);
    let attente =await this.storage.get('user').then((val)=>{
      console.log(val.user.id);
      let id :string = val.user.id ;
      postData.append('refId',id);
      });
  let data = await this.apiImage.UploadPhoto(postData).subscribe((result) => {
    this.utils.presentToast("Image enregistré avec succes",'success');
    window.location.reload(true);
    });
  }
 
  dataURLtoBlob(dataurl) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
  while(n--){
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], {type:mime});
  }
  
  
 
}
