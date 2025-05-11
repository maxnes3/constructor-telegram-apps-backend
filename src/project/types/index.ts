export interface JSDependence {
  name?: string;
  path: string;
}

export type JSReactComponentExport = {
  formatedName: string;
  generatedJSX: {
    file: string;
    code: string;
  };
  generatedCSS?: {
    file: string;
    code: string;
  };
  generatedIndex?: {
    file: string;
    code: string;
  };
};
