import { BuildUpdateDto } from '@/build';

type compileUniqueClassesType = Omit<BuildUpdateDto, 'props'>;

export const BuildUtils = {
  compileUniqueClasses: (data: compileUniqueClassesType) => {
    const { jsx, scss } = data;

    if (!scss) return { compiledJSX: jsx, compiledSCSS: scss };

    const uniqueSuffix = `_${Math.random().toString(36).substring(2, 8)}_${Date.now().toString(36)}`;

    const compiledSCSS = scss.replace(
      /\.([a-zA-Z0-9_-]+)/g,
      `._$1${uniqueSuffix}`
    );

    const compiledJSX = jsx.replace(
      /class(Name)?=["']([^"']+)["']/g,
      (match, p1, p2) => {
        const updatedClasses = p2
          .split(' ')
          .map((className) => `_${className}${uniqueSuffix}`)
          .join(' ');
        return `class${p1 || ''}="${updatedClasses}"`;
      }
    );

    return { compiledJSX, compiledSCSS };
  }
};
