import { Injectable } from '@angular/core';
import {Utilisateur} from '../Models/utilisateur';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { URL } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  redirectUrl: string ="/members";
  isAuth: boolean;
  constructor(private http: HttpClient){}

  login(user: Utilisateur): Observable<any>{
    return this.http.post(URL+'/auth/local',user).pipe();
  }

  register(user: any){
    return this.http.post(URL+'/auth/local/register',user).pipe();
  }
  forgotPassword(compte : any){
    return this.http.post(URL+'/auth/forgot-password',compte).pipe();
  }

}
