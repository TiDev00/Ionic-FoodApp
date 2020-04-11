import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { URL } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ImageService {

  
  constructor(private httpClient : HttpClient) { }
  UploadPhoto(image : any ): Observable<any> {
    return this.httpClient.post<any>(URL + "/upload",image).pipe();
  }
  getFiles():Observable<any[]>
  {
    return this.httpClient.get<any[]>(URL+"/upload/files/").pipe();
  }
  updateImage(id : number, image : any) : Observable <any>
  {
    return this.httpClient.put<any>(URL+'/upload/files/'+id, image).pipe();
  } 
}
