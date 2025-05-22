import { Module } from '@nestjs/common';
import { TemplateModule } from './template/template.module';
import { CategoryModule } from './category/category.module';
import { ProjectModule } from './project/project.module';
import { CodebaseModule } from './codebase/codebase.module';
import { BuildModule } from './build/build.module';
import { ScreenModule } from './screen/screen.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TemplateModule,
    CategoryModule,
    ProjectModule,
    CodebaseModule,
    BuildModule,
    ScreenModule,
    AuthModule
  ]
})
export class AppModule {}
