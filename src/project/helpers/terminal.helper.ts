import { exec } from 'child_process';
import { promisify } from 'util';

interface ExecuteCommandParams {
  command: string;
  path: string;
}

export class TerminalHelper {
  public static async executeCommand({ command, path }: ExecuteCommandParams) {
    const execAsync = promisify(exec);
    try {
      await execAsync(command, { cwd: path });
    } catch (error) {
      console.error(`Error executing command: ${error}`);
      throw error;
    }
  }
}
