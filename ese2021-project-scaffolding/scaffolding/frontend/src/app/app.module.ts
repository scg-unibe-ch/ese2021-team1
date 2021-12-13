import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoItemComponent } from './todo-list/todo-item/todo-item.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatListModule } from '@angular/material/list';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { UserComponent } from './user/user.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PasswordModalComponent } from './password-modal/password-modal.component';
import { WallComponent } from './wall/wall.component';
import { PostComponent } from './wall/post/post.component';
import {OverlayModule} from "@angular/cdk/overlay";
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AddPostComponent } from './add-post/add-post.component';
import {MatMenuModule} from "@angular/material/menu";
import {MatIconModule} from "@angular/material/icon";
import {MatSelectModule} from "@angular/material/select";
import { StoreComponent } from './store/store.component';
import {FlexLayoutModule} from "@angular/flex-layout";
import { ProductComponent } from './product/product.component';
import { AddProductComponent } from './add-product/add-product.component';
import {MatGridListModule} from "@angular/material/grid-list";
import { CartComponent } from './cart/cart.component';
import { ProfilPageComponent } from './profil-page/profil-page.component';
import {MatSidenavModule} from "@angular/material/sidenav";
import { CheckoutComponent } from './checkout/checkout.component';
import { DetailedPostComponent } from './detailed-post/detailed-post.component';
import { CommentComponent } from './comment/comment.component';
import {CdkTableModule} from "@angular/cdk/table";
import {DetailedProductComponent} from "./detailed-product/detailed-product.component";
import { PReviewComponent } from './p-review/p-review.component';

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    TodoItemComponent,
    UserComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    PasswordModalComponent,
    WallComponent,
    PostComponent,
    routingComponents,
    AddPostComponent,
    StoreComponent,
    ProductComponent,
    AddProductComponent,
    CartComponent,
    ProfilPageComponent,
    CheckoutComponent,
    DetailedPostComponent,
    DetailedProductComponent,
    PReviewComponent,
    CommentComponent,
  ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        MatToolbarModule,
        MatTabsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatListModule,
        FormsModule,
        MatCheckboxModule,
        OverlayModule,
        AppRoutingModule,
        MatMenuModule,
        MatIconModule,
        MatSelectModule,
        FlexLayoutModule,
        MatGridListModule,
        MatSidenavModule,
        CdkTableModule
    ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
