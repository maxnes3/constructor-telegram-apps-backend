import { JSDependence, JSReactComponentExport } from '../types';

interface JSExport {
  name: string;
  path: string;
  default?: boolean;
}

interface GenerateFuctionComponentParams {
  name: string;
  jsx: string;
}

interface ConectStylesToComponentParams {
  name: string;
  scss?: string;
}

interface GenerateReactComponetParams {
  name: string;
  jsx: string;
  scss?: string;
  dependencies?: JSDependence[];
  createIndex?: boolean;
}

interface GenerateScreenComponentParams {
  name: string;
  templates: JSDependence[];
}

interface GenerateApplicationComponentParams {
  screens: {
    isStartScreen: boolean;
    name: string;
    path: string;
  }[];
}

export class ComponentHelper {
  private generateDependencies(dependencies: JSDependence[]) {
    const dependenciesResult = dependencies.reduce(
      (acc, dependence) =>
        acc +
        (dependence.name
          ? `import ${dependence.name} from \"${dependence.path}\";\n`
          : `import \"${dependence.path}\";\n`),
      ''
    );
    return dependenciesResult + `\n`;
  }

  private generateFuctionComponent({
    name,
    jsx
  }: GenerateFuctionComponentParams) {
    return `const ${name} = ${jsx};\n\nexport default ${name};\n`;
  }

  private conectStylesToComponent({
    name,
    scss
  }: ConectStylesToComponentParams) {
    if (!Boolean(scss)) {
      return null;
    }
    return { file: `${name}.css`, code: scss };
  }

  public static generateExports(exports: JSExport[]) {
    return exports.reduce(
      (acc, _export) =>
        acc +
        `export { default${Boolean(_export.default) ? '' : ` as ${_export.name}`} } from \"${_export.path}\";\n`,
      ''
    );
  }

  public static generateReactComponet({
    name,
    jsx,
    scss,
    dependencies,
    createIndex = false
  }: GenerateReactComponetParams): JSReactComponentExport {
    const formatedName = name.trim().replace(' ', '');

    const generatedJSX = { file: `${formatedName}.jsx`, code: '' };

    if (dependencies) {
      generatedJSX.code = generatedJSX.code.concat(
        this.prototype.generateDependencies(dependencies)
      );
    }

    const generatedCSS = this.prototype.conectStylesToComponent({
      name: formatedName,
      scss
    });

    if (generatedCSS) {
      generatedJSX.code = generatedJSX.code.concat(
        this.prototype.generateDependencies([
          { path: `./${generatedCSS.file}` }
        ])
      );
    }

    generatedJSX.code = generatedJSX.code.concat(
      this.prototype.generateFuctionComponent({
        name: formatedName,
        jsx
      })
    );

    const generatedIndex = createIndex
      ? {
          file: 'index.js',
          code: this.generateExports([
            { name: formatedName, path: `./${formatedName}`, default: true }
          ])
        }
      : null;

    return { formatedName, generatedJSX, generatedCSS, generatedIndex };
  }

  public static generateScreenComponent({
    name,
    templates
  }: GenerateScreenComponentParams) {
    const jsx = `() => {\n
      return (\n
        <div className="${name}">
          ${templates.map((template) => `${'<' + template.name} />`).join('\n')}
        </div>\n
      );\n
    }`;
    return this.generateReactComponet({
      name,
      jsx,
      dependencies: templates,
      createIndex: true
    });
  }

  public static generateApplicationComponent({
    screens
  }: GenerateApplicationComponentParams) {
    const jsx = `() => {\n
      return (\n
        <BrowserRouter>\n
          <Routes>\n
            ${screens
              .map(
                (screen) =>
                  `<Route 
                  path="/${screen.isStartScreen ? '' : screen.name}" 
                  element={${'<' + screen.name} />} 
                />`
              )
              .join('\n')}
          </Routes>\n
        </BrowserRouter>\n
      );\n
    }`;

    const dependencies: JSDependence[] = [
      { name: '{ BrowserRouter, Route, Routes }', path: 'react-router-dom' }
    ];
    dependencies.push(...screens);

    return this.generateReactComponet({
      name: 'App',
      jsx,
      dependencies,
      createIndex: true
    });
  }
}
