import { BuildUpdateDto } from '@/build';
import sass from 'sass';

type compileClassesToSCSSType = Omit<BuildUpdateDto, 'props'>;

export const BuildUtils = {
  compileClassesToSCSS: (data: compileClassesToSCSSType) => {
    const { jsx, scss } = data;

    if (!scss) return { compiledJSX: jsx, compiledSCSS: scss };

    const compiledSCSS = sass.compileString(scss).css;

    return { compiledJSX: jsx, compiledSCSS };
  }
};
