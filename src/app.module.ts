import { Module } from '@nestjs/common';
import { TemplateModule } from './template/template.module';
import { CategoryModule } from './category/category.module';
import { ProjectModule } from './project/project.module';
import { BuildModule } from './build/build.module';

@Module({
  imports: [TemplateModule, CategoryModule, ProjectModule, BuildModule]
})
export class AppModule {}
