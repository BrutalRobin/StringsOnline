import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { ForsideComponent } from './forside/forside.component';
import { LoginComponent } from './login/login.component';
import { ProduktlisteComponent } from './produktliste/produktliste.component';
import { OrdreHistorikComponent } from './ordre-historik/ordre-historik.component';
import { VarekurvComponent } from './varekurv/varekurv.component';
import { KasseComponent } from './kasse/kasse.component';
import { ProduktsideComponent } from './produktside/produktside.component';
import { BrandComponent } from './brand/brand.component';
import { TakComponent } from './tak/tak.component';
import { SearchComponent } from './search/search.component';
import { KviteringComponent } from './kvitering/kvitering.component';
import { BetingelserComponent } from './betingelser/betingelser.component';


const routes: Routes = [
  { path: '', redirectTo: 'Forside', pathMatch: 'full' },
{ path: 'Forside', component: ForsideComponent, pathMatch: 'full' },
{ path: 'Login', component: LoginComponent, },
{ path: 'Produktliste/:group/:subgroup', component: ProduktlisteComponent,  pathMatch: 'full' },
{ path: 'Ordrerhistorik', component: OrdreHistorikComponent, },
{ path: 'Varekurv', component: VarekurvComponent, },
{ path: 'Kasse', component: KasseComponent, },
{ path: 'Produktside/:group/:subgroup/:id', component: ProduktsideComponent, },
{ path: 'Brand/:id', component: BrandComponent, },
{ path: 'Tak/:id', component: TakComponent, },
{ path: 'Kvitering/:id', component: KviteringComponent, },
{ path: 'Search/:keyword', component: SearchComponent, },
{ path: 'Betingelser', component: BetingelserComponent, },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
