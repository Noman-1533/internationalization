
import { Injectable, inject } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, ResolveFn } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { onDemandFileService } from './core/services/on-demand-file.service';
// import { CoreService } from './core/services/core.service';




// @Injectable({
//   providedIn:'root'
// })
// export class getFaqsService{
//   constructor(private http: HttpClient, private translateService: TranslateService) { }
//   public getFileOnDemand(): Observable<any> {
//     const lang = this.translateService.currentLang || this.translateService.defaultLang;
//     const externalUrl = `https://raw.githubusercontent.com/Noman-1533/i18n/main/${lang}/faq.json`;
//     // const localTranslations = this.translateService.getTranslation(language);
  
//     return this.http.get(externalUrl).pipe(
//       map(externalTranslations => {
//         // Get the existing translations and merge with external
//         const existingTranslations = this.translateService.store.translations[lang] || {};
//         console.log('Existing lang:', lang);
//         console.log('Existing translations:', existingTranslations);
           
//         const mergedTranslations = { ...existingTranslations, ...externalTranslations };
//         // Set the merged translations
//         this.translateService.setTranslation(lang, mergedTranslations, true);
//         console.log(mergedTranslations)
//         return mergedTranslations;
//       }),
//       catchError(error => {
//         console.error('Error fetching external translations', error);
//         return of({});
//       })
//     );
//   }
// }

 
// @Injectable({
//   providedIn: 'root'
// })
// export class faqsResolver implements Resolve<any> {
 
//   constructor(
//     // private http: HttpClient, private translateService: TranslateService
//     private faqs: onDemandFileService

//   ) { }
 
//   resolve(route: ActivatedRouteSnapshot): Observable<any> {
//     return this.faqs.getFileOnDemand();
//     // const lang = this.translateService.currentLang || this.translateService.defaultLang;
//     // const externalUrl = `https://raw.githubusercontent.com/Noman-1533/i18n/main/${lang}/faq.json`;
//     // // const localTranslations = this.translateService.getTranslation(language);
 
//     // return this.http.get(externalUrl).pipe(
//     //     map(externalTranslations => {
//     //       // Get the existing translations and merge with external
//     //       const existingTranslations = this.translateService.store.translations[lang] || {};
//     //       console.log('Existing translations:', existingTranslations);
          
//     //       const mergedTranslations = { ...existingTranslations, ...externalTranslations };
//     //       // Set the merged translations
//     //       this.translateService.setTranslation(lang, mergedTranslations, true);
//     //       console.log(mergedTranslations)
//     //       return mergedTranslations;
//     //     }),
//     //     catchError(error => {
//     //       console.error('Error fetching external translations', error);
//     //       return of({});
//     //     })
//     //   );
//   }
// }
export const faqsResolver: ResolveFn<any> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
  ) => {
  const faqs = inject(onDemandFileService);
  return faqs.getFileOnDemand('faq.json');
}
