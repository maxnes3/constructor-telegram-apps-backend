import { Module } from '@nestjs/common';
import { TemplateModule } from './template/template.module';
import { CategoryModule } from './category/category.module';
import { ProjectModule } from './project/project.module';
import { CodebaseModule } from './codebase/codebase.module';
import { BuildModule } from './build/build.module';
import { ScreenModule } from './screen/screen.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TemplateModule,
    CategoryModule,
    ProjectModule,
    CodebaseModule,
    BuildModule,
    ScreenModule,
    AuthModule,
    UserModule
  ]
})
export class AppModule {}
