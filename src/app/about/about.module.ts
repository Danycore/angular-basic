import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AboutRoutingModule } from './about-routing.module';
import { AboutComponent } from './about/about.component';
import { LinksComponent } from './about/links/links.component';
import { InfoComponent } from './about/info/info.component';
import { AuthorsComponent } from './about/authors/authors.component';
import { AuthorComponent } from './about/authors/author/author.component';

@NgModule({
    declarations: [AboutComponent, LinksComponent, InfoComponent, AuthorsComponent, AuthorComponent],
    imports: [CommonModule, AboutRoutingModule]
})
export class AboutModule {}
