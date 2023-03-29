import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsComponent } from './component/details/details.component';
import { HomeComponent } from './component/home/home.component';
import { PanierComponent } from './panier/panier.component';

const routes: Routes = [
{path: '', component: HomeComponent},
{path: 'details', component: DetailsComponent},
{path: 'panier', component: PanierComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
