import * as fs from 'fs/promises';
import * as pathModule from 'path';
import * as archiver from 'archiver';
import * as fsSync from 'fs';

export class ArchivatorHelper {
  public static async archivateByPath(path: string): Promise<string> {
    const resolvedPath = pathModule.resolve(path);
    const stats = await fs.stat(resolvedPath);

    const archiveName = `${pathModule.basename(resolvedPath)}.zip`;
    const archivePath = pathModule.join(
      pathModule.dirname(resolvedPath),
      archiveName
    );

    const output = fsSync.createWriteStream(archivePath);
    const archive = archiver('zip', { zlib: { level: 9 } });

    return new Promise((resolve, reject) => {
      output.on('close', () => resolve(archivePath));
      archive.on('error', (err) => reject(err));

      archive.pipe(output);

      if (stats.isDirectory()) {
        archive.directory(resolvedPath, false);
      } else {
        archive.file(resolvedPath, { name: pathModule.basename(resolvedPath) });
      }

      archive.finalize();
    });
  }
}
