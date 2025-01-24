import { Module } from '@nestjs/common';
import { TemplateModule } from './template/template.module';
import { CategoryModule } from './category/category.module';
import { PrototypeModule } from './prototype/prototype.module';
import { ProjectModule } from './project/project.module';

@Module({
  imports: [TemplateModule, CategoryModule, PrototypeModule, ProjectModule]
})
export class AppModule {}
