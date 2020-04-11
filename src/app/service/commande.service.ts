import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Commande } from '../Models/commande';
import { Observable } from 'rxjs';
import { URL } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {

  constructor(private httpClient : HttpClient) { }
  postCommande(commande : Commande ): Observable<Commande> {
    return this.httpClient.post<Commande>(URL + "/commandes",commande).pipe();
  }
  getCommandes():Observable<Commande[]>
  {
    return this.httpClient.get<Commande[]>(URL+"/commandes").pipe();
  }

}
