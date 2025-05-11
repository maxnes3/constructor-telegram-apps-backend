import { Module } from '@nestjs/common';
import { TemplateModule } from './template/template.module';
import { CategoryModule } from './category/category.module';
import { ProjectModule } from './project/project.module';
import { BuildModule } from './build/build.module';
import { ConfigModule } from './config/config.module';
import { ScreenModule } from './screen/screen.module';

@Module({
  imports: [TemplateModule, CategoryModule, ProjectModule, BuildModule, ConfigModule, ScreenModule]
})
export class AppModule {}
