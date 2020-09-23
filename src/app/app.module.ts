import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ArkivListComponent } from './arkiv-list/arkiv-list.component';

@NgModule({
  declarations: [
    AppComponent,
    ArkivListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  exports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
