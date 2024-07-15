import { Component, OnDestroy, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CustomTranslateHttpLoader } from '../custom-translate-http-loader';
import { ActivatedRoute, Router } from '@angular/router';
import { commonFileService } from '../core/services/common-file.service';
import { onDemandFileService } from '../core/services/on-demand-file.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrl: './language-selector.component.css',
})
export class LanguageSelectorComponent implements OnInit, OnDestroy {
  @Output() languages: string[] = ['bn', 'en','de','fr'];
  faqs: any[];
  currentRoute: any;
  languageChangeSubscription: Subscription;
  onDemandFileSubscription: Subscription;
  constructor(
    public translate: TranslateService,
    private router: Router,
    private activeRoute: ActivatedRoute,

    private commonFileService: commonFileService,
    private onDemandFile: onDemandFileService
  ) {}
  ngOnInit(): void {
    this.loadLanguage();

    this.languageChangeSubscription = this.translate.onLangChange.subscribe(
      () => {
        const routeName = this.activeRoute.snapshot['_routerState'].url;
        // console.log('typeof route name => ', typeof routeName);
        // console.log(fileNameForRoute);
        let fileNameForRoute;
        fileNameForRoute = routeName.substr(1, 3) + '.json';
        if (routeName === '/faqs') {
          this.onDemandFile.onDataChanges.next(true);
          this.onDemandFileSubscription = this.onDemandFile
            .getFileOnDemand(fileNameForRoute)
            .subscribe((newFaqs) => {
              this.translate.setTranslation(
                this.translate.currentLang || 'en',
                newFaqs,
                true
              );
              this.onDemandFile.onDataChanges.next(false);
            });
        }
      }
    );
  }
  loadLanguage() {
    const lang = 'en';
    this.translate.use(lang);

    // console.log(this.translate.currentLang)

    // this.translate.get('FAQS').subscribe((res) => {
    //   this.faqs = res;
    //   // console.log(res);
    // });
    // console.log(this.faqs)
  }
  changeLanguage(event: Event) {
    const lang = (event.target as HTMLSelectElement).value;
    this.translate.use(lang);

    // if (this.activeRoute.snapshot['_routerState'].url === '/faqs') {
    //   this.commonFileService.fileName = 'faq.json';
    // }
    //   this.getFaqs.getFileOnDemand().subscribe(
    //     (res) => {
    //       setTimeout(() => {

    //         console.log(res);
    //       }, 10);
    //     }
    //   );
    // }
    // console.log('form faqs',this.activeRoute.snapshot);

    // this.router.navigate([route]);
    // console.log(route);
    // this.router.navigateByUrl(route, { skipLocationChange: true }).then(() => {
    //   this.router.navigate([this.router.url]);
    // });

    // this.translate.use(lang);
    // setTimeout(() => {
    // console.log(this.translate.currentLang)
    // }, 50);
    // localStorage.setItem('lang', lang);
  }
  ngOnDestroy(): void {
    this.onDemandFileSubscription.unsubscribe();
    this.languageChangeSubscription.unsubscribe();
  }
}
