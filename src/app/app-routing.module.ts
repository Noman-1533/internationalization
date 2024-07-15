import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderBoxComponent } from './header-box/header-box.component';
import { FaqComponent } from './faq/faq.component';
import { ContactComponent } from './contact/contact.component';
import { faqsResolver } from './faqs.resolver';

const routes: Routes = [
  { path: '', component: HeaderBoxComponent },
  {
    path: 'home', component: HeaderBoxComponent,
    
  },
  {
    path: 'faqs', component: FaqComponent,
    resolve: {faqs:faqsResolver}
  },
  {
    path: 'contact', component: ContactComponent,
    
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
