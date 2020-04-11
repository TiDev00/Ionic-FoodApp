import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Utilisateur } from '../Models/utilisateur';
import { URL } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  constructor(private http: HttpClient) { }
  getUtilisateur(id :number):Observable<Utilisateur>
  {
    return this.http.get<Utilisateur>(URL+'/users/'+id).pipe();
  }
  
}
