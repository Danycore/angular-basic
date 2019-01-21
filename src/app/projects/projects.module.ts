import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProjectsRoutingModule } from './projects-routing.module';
import { NewProjectComponent } from './projects/new-project/new-project.component';
import { ProjectComponent } from './projects/project/project.component';
import { ProjectsComponent } from './projects/projects.component';

@NgModule({
    declarations: [ProjectsComponent, ProjectComponent, NewProjectComponent],
    imports: [CommonModule, ProjectsRoutingModule]
})
export class ProjectsModule {}
