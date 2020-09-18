import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RatingModule } from 'ng-starrating';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ForsideComponent } from './forside/forside.component';
import { LoginComponent } from './login/login.component';
import { ProduktlisteComponent } from './produktliste/produktliste.component';
import { OrdreHistorikComponent } from './ordre-historik/ordre-historik.component';
import { VarekurvComponent } from './varekurv/varekurv.component';
import { KasseComponent } from './kasse/kasse.component';
import { ProduktsideComponent } from './produktside/produktside.component';
import { BrandComponent } from './brand/brand.component';
import { SidenavComponent } from './snippets/sidenav/sidenav.component';
import { FooterComponent } from './snippets/footer/footer.component';
import { HeaderComponent } from './snippets/header/header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TakComponent } from './tak/tak.component';
import { SearchComponent } from './search/search.component';
import { KviteringComponent } from './kvitering/kvitering.component';
import { BetingelserComponent } from './betingelser/betingelser.component';

@NgModule({
  declarations: [
    AppComponent,
    ForsideComponent,
    LoginComponent,
    ProduktlisteComponent,
    OrdreHistorikComponent,
    VarekurvComponent,
    KasseComponent,
    ProduktsideComponent,
    BrandComponent,
    SidenavComponent,
    FooterComponent,
    HeaderComponent,
    TakComponent,
    SearchComponent,
    KviteringComponent,
    BetingelserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RatingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
