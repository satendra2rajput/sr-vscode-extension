import * as vscode from "vscode";

import { generateComponent } from "../generators/component.generator";
import { toKebabCase } from "../utils/name-utils";

export async function generateComponentCommand(): Promise<void> {
  const workspaceFolder = vscode.workspace.workspaceFolders?.[0];

  if (!workspaceFolder) {
    vscode.window.showErrorMessage("Please open an Angular project first.");
    return;
  }

  const selectedFolder = await vscode.window.showOpenDialog({
    canSelectFiles: false,
    canSelectFolders: true,
    canSelectMany: false,
    openLabel: "Select Component Location",
  });

  if (!selectedFolder || selectedFolder.length === 0) {
    return;
  }

  const input = await vscode.window.showInputBox({
    prompt: "Enter component name",
    placeHolder: "user-card",
    validateInput: (value) => {
      if (!value.trim()) {
        return "Component name is required.";
      }

      return undefined;
    },
  });

  if (!input) {
    return;
  }

  const componentName = toKebabCase(input);

  const files = await generateComponent({
    name: componentName,
    directory: selectedFolder[0].fsPath,
    style: "scss",
    spec: true,
  });

  vscode.window.showInformationMessage(
    `Component "${componentName}" created successfully.`,
  );

  const componentTsFile = files.find((file) => file.endsWith(".component.ts"));

  if (componentTsFile) {
    const document = await vscode.workspace.openTextDocument(componentTsFile);

    await vscode.window.showTextDocument(document);
  }
}
