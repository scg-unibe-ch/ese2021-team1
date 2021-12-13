import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { StoreComponent} from "./store/store.component";
import {WallComponent} from "./wall/wall.component";
import {ProfilPageComponent} from "./profil-page/profil-page.component";
import {CheckoutComponent} from "./checkout/checkout.component";
import {PostComponent} from "./wall/post/post.component";
import {DetailedPostComponent} from "./detailed-post/detailed-post.component";
import {DetailedProductComponent} from "./detailed-product/detailed-product.component";

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'store', component: StoreComponent},
  { path: 'user/:username', component: ProfilPageComponent},
  { path: 'checkout', component: CheckoutComponent},
  { path: 'post/:id', component: DetailedPostComponent},
  { path: 'store/product/:id', component: DetailedProductComponent},
  { path: '', component: WallComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [RegisterComponent, LoginComponent, StoreComponent]
