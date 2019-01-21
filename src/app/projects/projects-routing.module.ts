import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewProjectComponent } from './projects/new-project/new-project.component';
import { ProjectComponent } from './projects/project/project.component';
import { ProjectsComponent } from './projects/projects.component';

const routes: Routes = [
    {
        path: '',
        component: ProjectsComponent
    },
    {
        path: 'new',
        component: NewProjectComponent
    },
    {
        path: ':id',
        component: ProjectComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProjectsRoutingModule {}
