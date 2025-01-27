import { Injectable } from '@nestjs/common';
import { TemplateService } from '@/template/template.service';
import { ProjectRequestDto } from './dto/project.request';
import { Response } from 'express';
import * as archiver from 'archiver';
import * as fs from 'fs';

@Injectable()
export class ProjectService {
  constructor(private templateService: TemplateService) {}

  async createProjectZip(data: ProjectRequestDto, res: Response) {
    const { name, templatesId } = data;

    // 1. Получаем шаблоны по ID с включением prototype
    const templates = await this.templateService.getTemplatesByIds(templatesId);

    // 2. Создаем временную директорию для проекта
    const projectDir = `./temp/${name}`;
    if (!fs.existsSync(projectDir)) {
      fs.mkdirSync(projectDir, { recursive: true });
    }

    // 3. Создаем структуру React-проекта
    this.createReactProjectStructure(projectDir);

    // 4. Генерируем React-компоненты на основе шаблонов
    templates.forEach((template, index) => {
      const componentName = `Template${index + 1}`;
      this.createReactComponent(
        projectDir,
        componentName,
        template.prototype.html,
        template.prototype.css
      );
    });

    // 5. Создаем ZIP-архив
    const zipFilePath = `./temp/${name}.zip`;
    const output = fs.createWriteStream(zipFilePath);
    const archive = archiver('zip', { zlib: { level: 9 } });

    output.on('close', () => {
      // 6. Отправляем ZIP-архив для скачивания
      res.download(zipFilePath, `${name}.zip`, (err) => {
        if (err) {
          console.error('Error sending file:', err);
        }
        // Удаляем временные файлы после отправки
        fs.rmSync(projectDir, { recursive: true, force: true });
        fs.unlinkSync(zipFilePath);
      });
    });

    archive.on('error', (err) => {
      throw err;
    });

    archive.pipe(output);
    archive.directory(projectDir, false);
    archive.finalize();
  }

  private createReactProjectStructure(projectDir: string) {
    // Создаем базовую структуру React-проекта
    fs.writeFileSync(
      `${projectDir}/package.json`,
      JSON.stringify(
        {
          name: 'react-project',
          version: '1.0.0',
          scripts: {
            start: 'react-scripts start',
            build: 'react-scripts build'
          },
          dependencies: {
            react: '^18.2.0',
            'react-dom': '^18.2.0',
            'react-scripts': '5.0.1'
          }
        },
        null,
        2
      )
    );

    fs.mkdirSync(`${projectDir}/src`, { recursive: true });
    fs.writeFileSync(
      `${projectDir}/src/index.js`,
      `
      import React from 'react';
      import ReactDOM from 'react-dom';
      import App from './App';

      ReactDOM.render(<App />, document.getElementById('root'));
    `
    );

    fs.writeFileSync(
      `${projectDir}/src/App.js`,
      `
      import React from 'react';
      import Template1 from './components/Template1';
      import Template2 from './components/Template2';

      function App() {
        return (
          <div>
            <Template1 />
            <Template2 />
          </div>
        );
      }

      export default App;
    `
    );
  }

  private createReactComponent(
    projectDir: string,
    componentName: string,
    html: string,
    css: string
  ) {
    const componentsDir = `${projectDir}/src/components`;
    if (!fs.existsSync(componentsDir)) {
      fs.mkdirSync(componentsDir, { recursive: true });
    }

    // Генерируем React-компонент
    fs.writeFileSync(
      `${componentsDir}/${componentName}.js`,
      `
      import React from 'react';
      import './${componentName}.css';

      function ${componentName}() {
        return (
          ${html}
        );
      }

      export default ${componentName};
    `
    );

    // Генерируем CSS для компонента
    fs.writeFileSync(`${componentsDir}/${componentName}.css`, css);
  }
}
