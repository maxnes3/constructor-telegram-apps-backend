import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { TemplateService } from '@template/index';
import { ProjectRequestDto } from './dto';
import { Response } from 'express';
import {
  ArchivatorHelper,
  ComponentHelper,
  BuildHelper,
  FileSystemHelper,
  TerminalHelper
} from './helpers';
import { BuildService } from '@/build/build.service';
import { ScreenService } from '@/screen/screen.service';
import { ScreenCreateDto } from '@/screen/dto';
import { JSReactComponentExport } from './types';
import { LoggerService } from '@logger/index';

const PROJECT_TEMPLATE_NAME = '__project_template';

@Injectable()
export class ProjectService implements OnModuleInit, OnModuleDestroy {
  constructor(
    private readonly screenService: ScreenService,
    private readonly templateService: TemplateService,
    private readonly buildService: BuildService,
    private readonly logger: LoggerService
  ) {
    this.logger.setContext(ProjectService.name);
  }

  async onModuleDestroy() {
    await this.removeNodeModules();
  }

  async onModuleInit() {
    await this.pullNodeModules();
  }

  async pullNodeModules() {
    this.logger.debug('Build Projects Build Template');
    const rootProjectPath = await FileSystemHelper.createDirectory(
      `./${BuildHelper.getWorkDirectory()}/${PROJECT_TEMPLATE_NAME}`
    );
    const sourcePath = await FileSystemHelper.createDirectory(
      `${rootProjectPath}/src`
    );
    await this.generateBuildRootFiles({
      rootPath: rootProjectPath,
      sourcePath: sourcePath
    });

    const buildCommands = ['npm cache clean --force', 'npm install'];
    for (const command of buildCommands) {
      this.logger.debug(`Execute command: ${command}`);
      await TerminalHelper.executeCommand({
        command,
        path: rootProjectPath
      });
    }

    const nodeModulesPath = `${rootProjectPath}/node_modules`;
    await FileSystemHelper.removeDirectory(nodeModulesPath);
  }

  async removeNodeModules() {
    const projectTemplatePath = `./${BuildHelper.getWorkDirectory()}/${PROJECT_TEMPLATE_NAME}`;
    this.logger.debug(
      `Removing ${PROJECT_TEMPLATE_NAME} directory at path: ${projectTemplatePath}`
    );
    await FileSystemHelper.removeDirectory(projectTemplatePath);
  }

  // TODO: Implement this method
  async saveProject(data: ProjectRequestDto) {
    return data;
  }

  async getProjectBuild(os: string, res: Response) {
    const ProjectName = `project-builds-${os}`;
    this.logger.debug(`Start build build project: ${ProjectName}`);

    const rootProjectPath = await FileSystemHelper.createDirectory(
      `./${BuildHelper.getWorkDirectory()}/${ProjectName}`
    );
    this.logger.debug(`Create root project path: ${rootProjectPath}`);

    const sourcePath = await FileSystemHelper.createDirectory(
      `${rootProjectPath}/src`
    );
    this.logger.debug(`Create src project path: ${sourcePath}`);

    await this.generateBuildRootFiles({
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

    const formatedProjectName = name.trim().replace(/ /g, '');
    const hash = Date.now().toString(36);
    const uniqueProjectDirName = `${formatedProjectName}_${hash}`;

    const rootProjectPath = `./${BuildHelper.getWorkDirectory()}/${uniqueProjectDirName}`;
    await FileSystemHelper.copyDirectory({
      src: `./${BuildHelper.getWorkDirectory()}/${PROJECT_TEMPLATE_NAME}`,
      dest: rootProjectPath
    });

    const sourcePath = await FileSystemHelper.createDirectory(
      `${rootProjectPath}/src`
    );

    await this.generateBuildRootFiles({
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

  private async generateBuildRootFiles({
    rootPath,
    sourcePath,
    browserOS
  }: {
    rootPath: string;
    sourcePath: string;
    browserOS?: string;
  }) {
    this.logger.debug(`Pull build files by os: ${browserOS}`);
    const buildsFiles = await this.buildService.getForOS(browserOS);

    this.logger.debug(
      `Create build files: [${buildsFiles.map((build) => build.name).join(', ')}]`
    );
    await Promise.all(
      buildsFiles.map((build) => {
        const path = build.isSource ? sourcePath : rootPath;
        FileSystemHelper.writeFile({
          filePath: `${path}/${build.name}`,
          fileContent: build.code
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
    this.logger.debug(
      `Create component directory by path: ${rootComponentsDirectory}`
    );
    await FileSystemHelper.createDirectory(rootComponentsDirectory);

    this.logger.debug(`Pull Templates at Screen by ids`);
    const templatesByIds =
      await this.templateService.getTemplatesByIds(templatesId);

    this.logger.debug(`Sorting templates by Position Behaviour`);
    const sortedScreenTemplates = templatesByIds.sort((a, b) => {
      const order = { isTop: 0, isFill: 1, isBottom: 2 };
      return (
        (order[a.positionBehaviour] ?? 99) - (order[b.positionBehaviour] ?? 99)
      );
    });

    this.logger.debug(`Generating React Components`);
    const screenGeneratedComponents = sortedScreenTemplates.map((template) =>
      ComponentHelper.generateReactComponet({
        name: template.name,
        jsx: template.running.jsx,
        scss: template.running.scss,
        createIndex: true
      })
    );

    this.logger.debug('Writing Components into Directory');
    for (const component of screenGeneratedComponents) {
      const { formatedName, ...files } = component;

      const componentDirectory = await FileSystemHelper.createDirectory(
        `${rootComponentsDirectory}/${formatedName}`
      );

      await this.writeReactComponentFiles({ path: componentDirectory, files });
    }

    const barrelExports = ComponentHelper.generateExports(
      screenGeneratedComponents.map((component) => ({
        name: component.formatedName,
        path: `./${component.formatedName}`
      }))
    );
    await FileSystemHelper.writeFile({
      filePath: `${rootComponentsDirectory}/index.js`,
      fileContent: barrelExports
    });

    return screenGeneratedComponents.map((component) => component.formatedName);
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
      'npm ci',
      'npm run lint:fix',
      'npm run build'
    ];
    for (const command of buildCommands) {
      this.logger.debug(`Execute command: ${command}`);
      await TerminalHelper.executeCommand({
        command,
        path
      });
    }

    const nodeModulesPath = `${path}/node_modules`;
    this.logger.debug(
      `Remove node_modules directory by path: ${nodeModulesPath}`
    );
    await FileSystemHelper.removeDirectory(nodeModulesPath);

    const distPath = `${path}/dist`;
    this.logger.debug(`Remove dist directory by path: ${distPath}`);
    await FileSystemHelper.removeDirectory(distPath);

    const packageLockPath = `${path}/package-lock.json`;
    this.logger.debug(
      `Remove package-lock.json file by path: ${packageLockPath}`
    );
    await FileSystemHelper.removeFile(packageLockPath);
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
    this.logger.debug(`Create project archive by path: ${path}`);
    const zipFilePath = await ArchivatorHelper.archivateByPath(path);

    res.download(zipFilePath, `${projectName}.zip`, async (error) => {
      try {
        if (error) {
          this.logger.error(`Error sending file: ${error}`);
          throw new Error(`Error sending file: ${error}`);
        }
      } finally {
        this.logger.debug(`Delete project directory at path: ${path}`);
        await FileSystemHelper.removeDirectory(path);

        this.logger.debug(`Delete project zip archive at path: ${zipFilePath}`);
        await FileSystemHelper.removeDirectory(zipFilePath);
      }
    });
  }
}
