import * as fs from 'fs';

type CreateDirectory = {
  directory: string;
};

type CreateReactComponentProps = {
  componentPath: string;
  componentName: string;
  html: string;
  css: string;
};

export class FileSystemHelper {
  public static createDirectory({ directory }: CreateDirectory) {
    if (fs.existsSync(directory)) {
      return null;
    }
    fs.mkdirSync(directory, { recursive: true });
    return directory;
  }

  public static createReactComponent({
    componentPath,
    componentName,
    html,
    css
  }: CreateReactComponentProps) {
    const componentsDir = `${componentPath}/src/components`;
    if (!fs.existsSync(componentsDir)) {
      fs.mkdirSync(componentsDir, { recursive: true });
    }

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

    fs.writeFileSync(`${componentsDir}/${componentName}.css`, css);
  }
}
