import * as vscode from "vscode";

import { generateComponentCommand } from "./commands/generate-component.command";

export function activate(context: vscode.ExtensionContext): void {
  console.log("KudoEngineer Angular Toolkit is now active!");

  const generateComponentDisposable = vscode.commands.registerCommand(
    "kudoengineer-angular-toolkit.generateComponent",
    generateComponentCommand,
  );

  context.subscriptions.push(generateComponentDisposable);
}

export function deactivate(): void {}
