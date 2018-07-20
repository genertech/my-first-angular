import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/internal/Observable";

const TIME_OUT = 10 * 1000;

@Injectable({
  providedIn: 'root'
})
export class ImageCommonService {

  constructor(private http: HttpClient) { }

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
