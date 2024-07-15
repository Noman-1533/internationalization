import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CustomTranslateHttpLoader} from '../custom-translate-http-loader';
import { ActivatedRoute } from '@angular/router';
import { onDemandFileService } from '../core/services/on-demand-file.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css'],
})
export class FaqComponent implements OnInit, OnDestroy {
  dataLoading: boolean = false;
  dataChangesSubscription: Subscription;
  faqs: any[] = [];
  title: string;
  isOpen: Map<string, boolean> = new Map<string, boolean>();
  constructor(public translate: TranslateService,private route:ActivatedRoute,private onDemandFile:onDemandFileService) {}

  ngOnInit(): void {

    // console.log('form faq',data);
    // this.faqs = this.translate.instant('FAQS');
    // this.title = this.translate.instant('TITLE');
    // this.translate.onLangChange.subscribe(() => {
    //   // if (!this.translate.getLangs().find(this.translate.currentLang.toString))
    //   {
    //     this.onDemandFile.getFileOnDemand('faq.json').subscribe((newFaqs) => {
    //       this.translate.setTranslation(this.translate.currentLang || 'en', newFaqs, true);
    //     })
    //   }
    // })
    
    // this.loadFaqs();
    // console.log(this.translate.currentLang);
    // let currentRoute = this.route.snapshot['_routerState'].url;
    // let data = this.route.data;
    this.dataChangesSubscription = this.onDemandFile.onDataChanges.subscribe((res) => {
      // console.log(res);
      this.dataLoading = res;
    })
    

  }

  

  loadFaqs() {
    // this.translate.get('FAQS').subscribe((faqs: any[]) => {
    //   this.faqs = faqs.map((faq) => ({ ...faq, isOpen: false }));
    // });
  }

  

  toggleFAQ(index: number) {
    let key = "Q" + index;
   
    if (!this.isOpen.has(key)) {
      this.isOpen.set(key, true);
    }
    else {
      const value = this.isOpen.get(key);
      this.isOpen.set(key, !value);
    }
    // this.faqs[index].isOpen = !this.faqs[index].isOpen;
  }

  ngOnDestroy(): void {
    this.dataChangesSubscription.unsubscribe();
  }
}
