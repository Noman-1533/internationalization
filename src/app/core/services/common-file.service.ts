import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map, switchMap, forkJoin } from "rxjs";

@Injectable({
  providedIn:'root'
})
export class commonFileService{
  constructor(private http: HttpClient) { }
  fileName = '';

  getCommonFiles(baseUrl: string, lang: string): Observable<any> {
    
    
    const token = '';
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });


    return this.http.get<any[]>(`${baseUrl}contents/${lang}`, { headers }).pipe(
      map((files) =>
        files
          .filter((file) => {
              return file.name !== 'faq.json';
          })
              .map((file) => file.download_url)
          ),
          switchMap((urls) => {
            const requests = urls.map((url) => this.http.get(url));
            return forkJoin(requests);
          }),
          map((response) => {
            return response.reduce((acc, res) => {
              return { ...acc, ...res };
            }, {});
          })
        );
  }
  
  
}
