import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { TranslateLoader } from '@ngx-translate/core';
import { Observable } from 'rxjs';

import { commonFileService } from './core/services/common-file.service';
// import { CoreService } from './core/services/core.service';

// @Injectable({
//   providedIn: 'root',
// })
// export class CustomTranslateService extends TranslateService {
//   public extraParams: any;
//   public lang: string;

//   constructor(translateLoader: TranslateLoader) {
//     super(null, translateLoader, null, null, null, null, null, null, null);
//   }

//   override use(lang: string, extraParams?: any): Observable<any> {
//     console.log(lang);
//     // console.log(extraParams)
//     // this.extraParams = extraParams;
//     return super.use(lang);
//   }

//   getExtraParams(): any {
//     return this.extraParams;
//   }
// }

// export class CustomTranslateHttpLoader implements TranslateLoader{
//   public currentRoute: string;
//   constructor(private http: HttpClient, private baseUrl: string,

//     // private translateService: TranslateService
//   ) {

//   }
//   route=inject(RouteService).getCurrentRoute()

//   public getTranslation(lang: string): Observable<any> {
//     console.log(this.route);
//     return this.route.subscribe((res) => {
//       this.currentRoute = res;
//       let urlPath = `${this.baseUrl}contents/${lang}`;
//       return this.http.get<any[]>(urlPath).pipe(
//         map((files) => {
//           // Filter out the FAQ file if not on the /faqs route
//           const filteredFiles = files.filter(file => this.currentRoute === '/faqs' ? true : file.name !== 'faq.json');
//           return filteredFiles.map((file) => file.download_url);
//         }),
//         switchMap((urls) => {
//           const requests = urls.map((url) => this.http.get(url));
//           return forkJoin(requests);
//         }),
//         switchMap((response) => {
//           // Initialize the combined translations
//           let combinedTranslations = response.reduce((acc, res) => ({ ...acc, ...res }), {});

//           // If on the /faqs route, fetch and merge the FAQ file
//           if (this.currentRoute === '/faqs') {
//             const faqFileUrl = `${this.baseUrl}contents/${lang}/faq.json`;
//             return this.http.get(faqFileUrl).pipe(
//               map((faqTranslations) => {
//                 return { ...combinedTranslations, ...faqTranslations };
//               }),
//               catchError(() => of(combinedTranslations)) // In case FAQ file is not found or any error occurs
//             );
//           }

//           return of(combinedTranslations);
//         })
//       );

//     })

//     // let currentRoute = this.translateService.extraParams;
//     // this.router.snapshot;
//     // console.log('form router ',currentRoute)

//   }
// }

// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { TranslateLoader } from '@ngx-translate/core';
// import { Observable, forkJoin } from 'rxjs';
// import { map, switchMap, tap } from 'rxjs/operators';

export class CustomTranslateHttpLoader implements TranslateLoader {
  constructor(private http: HttpClient, private baseUrl: string) {}
   commonService = inject(commonFileService);
  public getTranslation(lang: string): Observable<any> {
    return this.commonService.getCommonFiles(this.baseUrl, lang);
  }
}

// codes for logging and seeing the output

// export class CustomTranslateHttpLoader implements TranslateLoader {
//   constructor(private http: HttpClient, private baseUrl: string) { }

//   public getTranslation(lang: string): Observable<any> {
// this.http.get<any[]>(`${this.baseUrl}contents/${lang}`).pipe(
//   map((files) => {
//     console.log('files are =>', files);
//     files.map((file) => {
//       file.download_url;
//       console.log('file are', file)
//       console.log('download_url are =>', file.download_url);
//     });
//   })
// ).subscribe();
// Fetch the list of files in the language directory

// return this.http.get<any[]>(`${this.baseUrl}contents/${lang}`).pipe(
//   // Extract the file names and construct the URLs to fetch their content
//   map((files) => files.map((file) => file.download_url)),
//   // Fetch the content of each file
//   switchMap((urls) => {
//     const requests = urls.map((url) => {
//       console.log('single url => ',url)
//       return this.http.get(url)
//     });
//     console.log('urls are ', urls);
//     console.log("request ares =>",requests)
//     return forkJoin(requests);
//   }),
//   // Merge the content of all files into a single object
//   map((response) => {
//     console.log(response)
//     return response.reduce((acc, res) => {
//       console.log('acc=>', acc);
//       console.log('res', res);
//       return { ...acc, ...res };
//     }, {});
//   })
// );

// }

// code for getting all file using filename array

// import { HttpClient } from '@angular/common/http';
// import { TranslateLoader } from '@ngx-translate/core';
// import { Observable, forkJoin } from 'rxjs';
// import { map } from 'rxjs/operators';

// export class CustomTranslateHttpLoader implements TranslateLoader {
//   constructor(private http: HttpClient, private baseUrl: string, private files: string[]) {}

//   public getTranslation(lang: string): Observable<any> {
//     const requests = this.files.map(file => this.http.get(`${this.baseUrl}${lang}${file}`));

//     return forkJoin(requests).pipe(
//       map(response => {
//         return response.reduce((acc, res) => {
//           return { ...acc, ...res };
//         }, {});
//       })
//     );
//   }
// }

// export class CustomTranslateHttpLoader implements TranslateLoader {
//   public currentRoute: string;

//   constructor(private http: HttpClient, private baseUrl: string ) {}
//   routeService=inject(RouteService)
//   public getTranslation(lang: string): Observable<any> {
//     return this.routeService.getCurrentRoute().pipe(
//       switchMap((res) => {
//         this.currentRoute = res;
//         console.log('Form ts',this.currentRoute);
//         let urlPath = `${this.baseUrl}contents/${lang}`;
//         return this.http.get<any[]>(urlPath).pipe(
//           map((files) => {
//             // Filter out the FAQ file if not on the /faqs route
//             const filteredFiles = files.filter(file => this.currentRoute === '/faqs' ? true : file.name !== 'faq.json');
//             return filteredFiles.map((file) => file.download_url);
//           }),
//           switchMap((urls) => {
//             const requests = urls.map((url) => this.http.get(url));
//             return forkJoin(requests);
//           }),
//           switchMap((response) => {
//             // Initialize the combined translations
//             let combinedTranslations = response.reduce((acc, res) => ({ ...acc, ...res }), {});

//             // If on the /faqs route, fetch and merge the FAQ file
//             if (this.currentRoute === '/faqs') {
//               const faqFileUrl = `${this.baseUrl}contents/${lang}/faq.json`;
//               return this.http.get(faqFileUrl).pipe(
//                 map((faqTranslations) => {
//                   return { ...combinedTranslations, ...faqTranslations };
//                 }),
//                 catchError(() => of(combinedTranslations)) // In case FAQ file is not found or any error occurs
//               );
//             }

//             return of(combinedTranslations);
//           })
//         );
//       })
//     );
//   }
// }
