import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { SideNavOuterToolbarModule, SideNavInnerToolbarModule, SingleCardModule } from './layouts';
import { FooterModule, LoginFormModule } from './shared/components';
import { AuthService, ScreenService, AppInfoService } from './shared/services';
import { NotAuthorizedContainerModule } from './not-authorized-container';
import { AppRoutingModule } from './app-routing.module';
import { DxBoxModule, DxButtonModule, DxCheckBoxModule, DxDataGridModule, DxFormModule, DxPopupModule, DxSelectBoxModule, DxTemplateModule, DxTextBoxModule, DxValidatorModule } from 'devextreme-angular';
import { AltaCompetenciaComponent } from './pages/alta-competencia/alta-competencia.component';
import { DataService } from './data.service';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    AltaCompetenciaComponent
  ],
  imports: [
    BrowserModule,
    SideNavOuterToolbarModule,
    SideNavInnerToolbarModule,
    SingleCardModule,
    FooterModule,
    LoginFormModule,
    NotAuthorizedContainerModule,
    AppRoutingModule,
    DxDataGridModule,
    DxButtonModule,
    DxFormModule,
    DxPopupModule,
    DxValidatorModule,
    DxSelectBoxModule,
    DxTextBoxModule,
    DxTemplateModule,
    DxCheckBoxModule,
    DxBoxModule,
    HttpClientModule
  ],
  providers: [AuthService, ScreenService, AppInfoService, DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
