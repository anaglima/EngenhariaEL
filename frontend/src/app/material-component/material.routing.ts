import { Routes } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { ManageConstructionComponent } from './manage-construction/manage-construction.component';
import { RouteGuardService } from '../services/route-guard.service';
import { ManageMaterialComponent } from './manage-material/manage-material.component';
import { ManageUserComponent } from './manage-user/manage-user.component';



export const MaterialRoutes: Routes = [
  {
    path:'construction',
    component:ManageConstructionComponent,
    canActivate:[RouteGuardService],
    data:{
      expectedRole:['admin']
    }
  },

  {
    path:'material',
    component:ManageMaterialComponent,
    canActivate:[RouteGuardService],
    data:{
      expectedRole:['admin']
    }
  },

  {
    path:'user',
    component:ManageUserComponent,
    canActivate:[RouteGuardService],
    data:{
      expectedRole:['admin']
    }
  }
];
