import * as vscode from "vscode";

import { generateComponentCommand } from "./commands/generate-component.command";

export function activate(context: vscode.ExtensionContext): void {
  console.log("sr Angular Toolkit is now active!");

  const generateComponentDisposable = vscode.commands.registerCommand(
    "sr-angular-toolkit.generateComponent",
    generateComponentCommand,
  );

  context.subscriptions.push(generateComponentDisposable);
}

export function deactivate(): void {}
