import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './portfolio-website/home/home.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
    {path:'portfolio-website',loadChildren:()=>import('./portfolio-website/portfolio-website.module').then(m=>m.PortfolioWebsiteModule)},
    { path: '', component: HomeComponent }, // Default route
    { path: '**', redirectTo: '' } // Wildcard route to handle undefined paths
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule {}