import { Injectable } from '@angular/core';
import {Subject} from "rxjs/internal/Subject";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/internal/Observable";


const TIME_OUT = 10 * 60 * 1000;

@Injectable({
  providedIn: 'root'
})
export class EquipStructureDataService {


  constructor(private http: HttpClient) {
  }

  public getEquipStructure(id: number | string): Observable<any> {

    return this.http.get(`/blueScreen/equipStructure`, {
      params: {sn: `${id}`},
      headers: new HttpHeaders({timeout: `${TIME_OUT}`})
    })

  }

  public getAreaParams(areaId: number | string): Observable<any> {
    return this.http.get(`/blueScreen/equipStructure/areaParams`, {
      params: {areaId: `${areaId}`},
      headers: new HttpHeaders({timeout: `${TIME_OUT}`})
    });
  }

  public getImageBlobFromUrl(url: string):Observable<any> {
    return this.http.get(url, {
      headers: new HttpHeaders({timeout: `${TIME_OUT}`}),
      responseType: "blob"});

  }

  public blobImage2DataURLObservable(imageBlob: Blob): Observable<any> {

    const fileReader = new FileReader();

    // init read
    fileReader.readAsDataURL(imageBlob);

    return Observable.create(observer => {

      // if success
      fileReader.onloadend = ev => {

        observer.next(fileReader.result);
      }

    });
  }

  public imageDataURL2ImageObservable(imageDataURL: any): Observable<HTMLImageElement> {

    let image = new Image();
    image.src = imageDataURL;

    // init
    return Observable.create(observer => {

      // if success
      image.onload = ev => {
        observer.next(image);
      }
    });
  }

}
