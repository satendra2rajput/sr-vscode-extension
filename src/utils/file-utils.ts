import * as fs from "node:fs/promises";
import * as path from "node:path";

export async function ensureDirectory(directory: string): Promise<void> {
  await fs.mkdir(directory, { recursive: true });
}

export async function writeFile(
  filePath: string,
  content: string,
): Promise<void> {
  await ensureDirectory(path.dirname(filePath));
  await fs.writeFile(filePath, content, "utf8");
}
