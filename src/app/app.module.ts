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
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormProfessionalComponent } from './components/form-professional/form-professional.component';
import { FormAdministratorComponent } from './components/form-administrator/form-administrator.component';
import { FormPatientComponent } from './components/form-patient/form-patient.component';
import { PatientListComponent } from './components/patient-list/patient-list.component';
import { AdministratorListComponent } from './components/administrator-list/administrator-list.component';
import { ProfessionalListComponent } from './components/professional-list/professional-list.component';
import { PatientDetailComponent } from './components/patient-detail/patient-detail.component';
import { ProfessionalDetailComponent } from './components/professional-detail/professional-detail.component';
import { AdministratorDetailComponent } from './components/administrator-detail/administrator-detail.component';

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
    SignupAdministratorComponent,
    FormProfessionalComponent,
    FormAdministratorComponent,
    FormPatientComponent,
    PatientListComponent,
    AdministratorListComponent,
    ProfessionalListComponent,
    PatientDetailComponent,
    ProfessionalDetailComponent,
    AdministratorDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    FormsModule,
    ReactiveFormsModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
