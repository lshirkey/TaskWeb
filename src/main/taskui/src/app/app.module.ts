import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { SearchComponent } from './component/search/search.component';
import { TaskComponent } from './component/task/task.component';
import { ProjectComponent } from './component/project/project.component';
import { UserComponent } from './component/user/user.component';
import { UserpipePipe } from './pipe/userpipe.pipe';
import { SortuserpipePipe } from './pipe/sortuserpipe.pipe';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    TaskComponent,
    ProjectComponent,
    UserComponent,
    UserpipePipe,
    SortuserpipePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
