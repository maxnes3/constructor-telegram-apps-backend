import { Injectable } from '@nestjs/common';
import { TemplateService } from '@template/index';
import { ProjectRequestDto } from './dto';
import { Response } from 'express';
import {
  ArchivatorHelper,
  ComponentHelper,
  ConfigHelper,
  FileSystemHelper,
  TerminalHelper
} from './helpers';
import { ConfigService } from '@/config/config.service';
import { ScreenService } from '@/screen/screen.service';
import { ScreenCreateDto } from '@/screen/dto';
import { JSReactComponentExport } from './types';

@Injectable()
export class ProjectService {
  constructor(
    private screenService: ScreenService,
    private templateService: TemplateService,
    private configService: ConfigService
  ) {}

  // TODO: Implement this method
  async saveProject(data: ProjectRequestDto) {
    return data;
  }

  async getProjectConfig(os: string, res: Response) {
    const ProjectName = `project-configs-${os}`;

    const rootProjectPath = await FileSystemHelper.createDirectory(
      `./${ConfigHelper.getWorkDirectory()}/${ProjectName}`
    );

    const sourcePath = await FileSystemHelper.createDirectory(
      `${rootProjectPath}/src`
    );

    await this.generateConfigRootFiles({
      rootPath: rootProjectPath,
      sourcePath: sourcePath,
      browserOS: os
    });

    await this.sendBackProjectZip({
      projectName: ProjectName,
      path: rootProjectPath,
      res
    });
  }

  async downloadProjectZip(data: ProjectRequestDto, res: Response) {
    const { name, screens, browserOS } = data;

    const formatedProjectName = name.trim().replace(' ', '');

    const rootProjectPath = await FileSystemHelper.createDirectory(
      `./${ConfigHelper.getWorkDirectory()}/${formatedProjectName}`
    );

    const sourcePath = await FileSystemHelper.createDirectory(
      `${rootProjectPath}/src`
    );

    await this.generateConfigRootFiles({
      rootPath: rootProjectPath,
      sourcePath: sourcePath,
      browserOS: browserOS
    });

    const generatedScreens = await this.generateScreensSlice({
      path: sourcePath,
      screens
    });

    await this.generateApplicationSlice({
      path: sourcePath,
      screens: generatedScreens
    });

    await this.buildProject({ path: rootProjectPath });

    await this.sendBackProjectZip({
      projectName: formatedProjectName,
      path: rootProjectPath,
      res
    });
  }

  private async writeReactComponentFiles({
    path,
    files
  }: {
    path: string;
    files: Omit<JSReactComponentExport, 'formatedName'>;
  }) {
    await Promise.all(
      Object.keys(files).map((fileKey) => {
        if (files[fileKey]) {
          const componentFile = files[fileKey];
          FileSystemHelper.writeFile({
            filePath: `${path}/${componentFile.file}`,
            fileContent: componentFile.code
          });
        }
      })
    );
  }

  private async generateConfigRootFiles({
    rootPath,
    sourcePath,
    browserOS
  }: {
    rootPath: string;
    sourcePath: string;
    browserOS?: string;
  }) {
    const configsFiles = await this.configService.getForOS(browserOS);
    await Promise.all(
      configsFiles.map((config) => {
        const path = config.isSource ? sourcePath : rootPath;
        FileSystemHelper.writeFile({
          filePath: `${path}/${config.name}`,
          fileContent: config.code
        });
      })
    );
  }

  private async generateComponentsSlice({
    path,
    templatesId
  }: {
    path: string;
    templatesId: string[];
  }) {
    const rootComponentsDirectory = `${path}/components`;
    await FileSystemHelper.createDirectory(rootComponentsDirectory);

    const projectTemplates =
      await this.templateService.getTemplatesByIds(templatesId);

    const projectGeneratedComponents = projectTemplates.map((template) =>
      ComponentHelper.generateReactComponet({
        name: template.name,
        jsx: template.prototype.jsx,
        scss: template.prototype.scss,
        createIndex: true
      })
    );

    for (const component of projectGeneratedComponents) {
      const { formatedName, ...files } = component;

      const componentDirectory = `${rootComponentsDirectory}/${formatedName}`;
      await FileSystemHelper.createDirectory(componentDirectory);

      await this.writeReactComponentFiles({ path: componentDirectory, files });
    }

    const barrelExports = ComponentHelper.generateExports(
      projectGeneratedComponents.map((component) => ({
        name: component.formatedName,
        path: `./${component.formatedName}`
      }))
    );
    await FileSystemHelper.writeFile({
      filePath: `${rootComponentsDirectory}/index.js`,
      fileContent: barrelExports
    });

    return projectGeneratedComponents.map(
      (component) => component.formatedName
    );
  }

  private async generateScreensSlice({
    path,
    screens
  }: {
    path: string;
    screens: ScreenCreateDto[];
  }) {
    const rootScreensDirectory = `${path}/screens`;
    await FileSystemHelper.createDirectory(rootScreensDirectory);

    for (const screen of screens) {
      const screenDirectory = `${rootScreensDirectory}/${screen.name.trim().replace(' ', '')}`;
      await FileSystemHelper.createDirectory(screenDirectory);

      const screenComponentsData = await this.generateComponentsSlice({
        path: screenDirectory,
        templatesId: screen.templatesIds
      });

      const componentsDependencies = screenComponentsData.map(
        (componentName) => ({
          name: componentName,
          path: `./components/${componentName}`
        })
      );

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { formatedName, ...files } =
        ComponentHelper.generateScreenComponent({
          name: screen.name,
          templates: componentsDependencies
        });
      await this.writeReactComponentFiles({ path: screenDirectory, files });
    }

    return screens.map((screen) => {
      const screenName = screen.name.trim().replace(' ', '');
      return {
        name: screenName,
        isStartScreen: screen.isStartScreen,
        path: `../screens/${screenName}`
      };
    });
  }

  private async generateApplicationSlice({
    path,
    screens
  }: {
    path: string;
    screens: { name: string; path: string; isStartScreen: boolean }[];
  }) {
    const rootApplicationDirectory = `${path}/app`;
    await FileSystemHelper.createDirectory(rootApplicationDirectory);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { formatedName, ...files } =
      ComponentHelper.generateApplicationComponent({
        screens
      });
    await this.writeReactComponentFiles({
      path: rootApplicationDirectory,
      files
    });
  }

  private async buildProject({ path }: { path: string }) {
    const buildCommands = [
      'npm cache clean --force',
      'npm install',
      'npm run lint:fix',
      'npm run build'
    ];
    for (const command of buildCommands) {
      await TerminalHelper.executeCommand({
        command,
        path
      });
    }

    await FileSystemHelper.removeDirectory(`${path}/node_modules`);
    await FileSystemHelper.removeDirectory(`${path}/dist`);
    await FileSystemHelper.removeFile(`${path}/package-lock.json`);
  }

  private async sendBackProjectZip({
    projectName,
    path,
    res
  }: {
    projectName: string;
    path: string;
    res: Response;
  }) {
    const zipFilePath = await ArchivatorHelper.archivateByPath(path);
    res.download(zipFilePath, `${projectName}.zip`, async (error) => {
      try {
        if (error) {
          throw new Error(`Error sending file: ${error}`);
        }
      } finally {
        await FileSystemHelper.removeDirectory(path);
        await FileSystemHelper.removeDirectory(zipFilePath);
      }
    });
  }
}
