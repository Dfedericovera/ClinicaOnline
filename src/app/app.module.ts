import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuPrincipalComponent } from './pages/menu-principal/menu-principal.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { MarketingComponent } from './components/marketing/marketing.component';
import { FeaturettesComponent } from './components/featurettes/featurettes.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupProfessionalComponent } from './pages/signup-professional/signup-professional.component';
import { SignupPatientComponent } from './pages/signup-patient/signup-patient.component';
import { SignupAdministratorComponent } from './pages/signup-administrator/signup-administrator.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuPrincipalComponent,
    HeaderComponent,
    FooterComponent,
    CarouselComponent,
    MarketingComponent,
    FeaturettesComponent,
    LoginComponent,
    SignupProfessionalComponent,
    SignupPatientComponent,
    SignupAdministratorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
