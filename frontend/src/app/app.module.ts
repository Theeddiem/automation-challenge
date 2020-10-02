import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { ItemRowComponent } from './item-row/item-row.component'

@NgModule({
  declarations: [
    AppComponent,
    ItemRowComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
