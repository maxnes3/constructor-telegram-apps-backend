import * as fs from 'fs/promises';
import * as path from 'path';

interface WriteFileParams {
  filePath: string;
  fileContent: string;
}

export class FileSystemHelper {
  private async pathExists(targetPath: string): Promise<boolean> {
    try {
      await fs.access(targetPath);
      return true;
    } catch {
      return false;
    }
  }

  public static async createDirectory(path: string): Promise<string> {
    if (!(await this.prototype.pathExists(path))) {
      await fs.mkdir(path, { recursive: true });
    }
    return path;
  }

  public static async copyDirectory({
    src,
    dest
  }: {
    src: string;
    dest: string;
  }) {
    await fs.mkdir(dest, { recursive: true });
    const entries = await fs.readdir(src, { withFileTypes: true });

    for (const entry of entries) {
      const srcPath = path.join(src, entry.name);
      const destPath = path.join(dest, entry.name);

      if (entry.isDirectory()) {
        await FileSystemHelper.copyDirectory({ src: srcPath, dest: destPath });
      } else {
        await fs.copyFile(srcPath, destPath);
      }
    }
  }

  public static async removeDirectory(path: string): Promise<void> {
    if (await this.prototype.pathExists(path)) {
      await fs.rm(path, { recursive: true, force: true });
    }
  }

  public static async writeFile({
    filePath,
    fileContent
  }: WriteFileParams): Promise<void> {
    await fs.writeFile(filePath, fileContent, 'utf8');
  }

  public static async copyFile({
    src,
    dest
  }: {
    src: string;
    dest: string;
  }): Promise<void> {
    await fs.copyFile(src, dest);
  }

  public static async removeFile(filePath: string): Promise<void> {
    if (await this.prototype.pathExists(filePath)) {
      await fs.rm(filePath, { force: true });
    }
  }
}
