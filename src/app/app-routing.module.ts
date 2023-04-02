import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsComponent } from './component/details/details.component';
import { HomeComponent } from './component/home/home.component';
import { PanierComponent } from './panier/panier.component';
import { RgpdComponent } from './component/rgpd/rgpd.component';

const routes: Routes = [
{path: '', component: HomeComponent},
{path: 'details', component: DetailsComponent},
{path: 'panier', component: PanierComponent},
{path: 'rgpd', component: RgpdComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
