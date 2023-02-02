import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardComponent } from './card/card.component';
import { DevelopersComponent } from './developers/developers.component';
import { SaveOrEditComponent as SaveOrEditComponentDev } from './developers/save-or-edit/save-or-edit.component';
import { SaveOrEditComponent as SaveOrEditComponentIssue } from './issues/save-or-edit/save-or-edit.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { BackEndUrlInterceptor } from './interceptors/backend-url.interceptor';
import { IssuesComponent } from './issues/issues.component';
import { MaterialModule } from './material.module';
import { PrioritiesComponent } from './priorities/priorities.component';
import { SnackbarComponent } from './snackbar/snackbar.component';
import { StatusesComponent } from './statuses/statuses.component';
import { TypesComponent } from './types/types.component';
import { PlanComponent } from './plan/plan.component';

@NgModule({
    declarations: [
        AppComponent,
        CardComponent,
        TypesComponent,
        StatusesComponent,
        PrioritiesComponent,
        DevelopersComponent,
        PlanComponent,
        IssuesComponent,
        SnackbarComponent,
        SaveOrEditComponentDev,
        SaveOrEditComponentIssue,
    ],
    imports: [FormsModule, ReactiveFormsModule, BrowserModule, BrowserAnimationsModule, MaterialModule, AppRoutingModule, HttpClientModule],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: BackEndUrlInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
