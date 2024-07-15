import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {
  Observable,
  map,
  catchError,
  of,
  switchMap,
  shareReplay,
  BehaviorSubject,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class onDemandFileService {
  onDataChanges = new BehaviorSubject<boolean>(false);
  constructor(
    private http: HttpClient,
    private translateService: TranslateService
  ) {}
  // getFileOnDemand(): Observable<any> {
  //   const lang = this.translateService.currentLang || this.translateService.defaultLang;
  //   const externalUrl = `https://raw.githubusercontent.com/Noman-1533/i18n/main/${lang}/faq.json`;
  //   // const localTranslations = this.translateService.getTranslation(language);

  //   return this.http.get(externalUrl).pipe(
  //     shareReplay(1),
  //     switchMap(externalTranslations => {
  //       // Get the existing translations and merge with external
  //       const existingTranslations = this.translateService.store.translations[lang] || {};
  //       console.log('Existing translations:', existingTranslations);

  //       const mergedTranslations = { ...existingTranslations, ...externalTranslations };
  //       // Set the merged translations
  //       this.translateService.setTranslation(lang, mergedTranslations, true);
  //       console.log(mergedTranslations)
  //       return mergedTranslations;
  //     }),
  //     catchError(error => {
  //       console.error('Error fetching external translations', error);
  //       return of({});
  //     })
  //   );
  // }

  private translationsCache: { [key: string]: any[] } = {};

  getFileOnDemand(fileName: string): Observable<any> {
    const lang =
      this.translateService.currentLang || this.translateService.defaultLang;
    const externalUrl = `https://raw.githubusercontent.com/Noman-1533/i18n/main/${lang}/${fileName}`;
    // console.log('a call for the file', fileName);
    // Check if the translations are already cached
    if (this.translationsCache[lang]) {
      // console.log('Returning cached translations for:', lang);
      return of(this.translationsCache[lang]);
    }
    return this.http.get<any[]>(externalUrl).pipe(
      // shareReplay(1),
      map((externalTranslations) => {
        // Get the existing translations and merge with external
        const existingTranslations =
          this.translateService.store.translations[lang] || {};
        // console.log(
        //   'Existing translations:',
        //   existingTranslations,
        //   externalTranslations
        // );
        const mergedTranslations = {
          ...existingTranslations,
          ...externalTranslations,
        };
        this.translationsCache[lang] = mergedTranslations;

        // Set the merged translations
        this.translateService.setTranslation(lang, mergedTranslations, true);

        // console.log(mergedTranslations);
        // Cache the merged translations

        // console.log(mergedTranslations);
        // this.onDataChanges.next(false);
        return of(mergedTranslations);
      }),
      catchError((error) => {
        console.error('Error fetching external translations', error);
        return of({});
      })
    );
  }
}
