import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';


const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        children: [
          
            {
              path: '',
              loadChildren: () => import('../home/home.module').then( m => m.HomePageModule)
            }
        ]
      },
      
  {
    path: 'restaurant',
    children: [
      {
      path : '',
    loadChildren: () => 
    import('../restaurant/restaurant.module').then( m => m.RestaurantPageModule)
      }
    ]
  },
      {
        path: 'plats',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../plats/plats.module').then(m => m.Tab2PageModule)
          },
          {
            path: 'ajouter',
            loadChildren: () =>
              import('../plats/ajouter/ajouter.module').then(m => m.AjouterPageModule)
          },
          {
            path: 'modifier/:id',
            loadChildren: () =>
              import('../plats/modifier/modifier.module').then(m => m.ModifierPageModule)
          }
        ]
      },
      {
        path: 'compte',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../compte/compte.module').then(m => m.ComptePageModule)
          },
          {
            path: 'modifier',
            loadChildren: () => import('../compte/modifier/modifier.module').then( m => m.ModifierPageModule)
          }
        ]
      },
        {
          path: 'commande',
          loadChildren: () => import('../commande/commande.module').then( m => m.CommandePageModule)
        },
      {
        path: '',
        redirectTo: '/members/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/members/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
