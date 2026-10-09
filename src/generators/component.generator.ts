import * as path from "node:path";

import type { GeneratorOptions } from "../models/generator-options";
import {
  componentHtmlTemplate,
  componentScssTemplate,
  componentSpecTemplate,
  componentTsTemplate,
} from "../utils/template-utils";
import { writeFile } from "../utils/file-utils";

export async function generateComponent(
  options: GeneratorOptions,
): Promise<string[]> {
  const componentDirectory = path.join(options.directory, options.name);

  const files: string[] = [];

  const componentTsPath = path.join(
    componentDirectory,
    `${options.name}.component.ts`,
  );

  const componentHtmlPath = path.join(
    componentDirectory,
    `${options.name}.component.html`,
  );

  const componentScssPath = path.join(
    componentDirectory,
    `${options.name}.component.scss`,
  );

  await writeFile(componentTsPath, componentTsTemplate(options.name));

  await writeFile(componentHtmlPath, componentHtmlTemplate(options.name));

  await writeFile(componentScssPath, componentScssTemplate());

  files.push(componentTsPath, componentHtmlPath, componentScssPath);

  if (options.spec) {
    const specPath = path.join(
      componentDirectory,
      `${options.name}.component.spec.ts`,
    );

    await writeFile(specPath, componentSpecTemplate(options.name));

    files.push(specPath);
  }

  return files;
}
