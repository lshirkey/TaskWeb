import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectComponent } from './component/project/project.component';
import { TaskComponent } from './component/task/task.component';
import { UserComponent } from './component/user/user.component';
import { SearchComponent } from './component/search/search.component';

const routes: Routes = [
  { path: 'project', component: ProjectComponent },
  { path: 'task', component: TaskComponent},
  { path: 'user', component: UserComponent},
  { path: 'search', component: SearchComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
