// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { Credentials } from './credentials';
import {SidebarProvider} from "./SidebarProvider";
import { GitExtension } from './api/git';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export async function  activate(context: vscode.ExtensionContext) {
	const sidebarProvider = new SidebarProvider(context.extensionUri);
	const credentials = new Credentials();
	await credentials.initialize(context);
	context.subscriptions.push(
		vscode.window.registerWebviewViewProvider(
		"todo-plus-plus-sidebar",
		sidebarProvider
		)
	);

	context.subscriptions.push(
		vscode.commands.registerCommand('todo-plus-plus.authenticate', async () => {
			try {
				const octokit = await credentials.getOctokit();
				const userInfo = await octokit.users.getAuthenticated();
				vscode.window.showInformationMessage(`Logged into GitHub as ${userInfo.data.login}`);
			}catch(e) {
				return e;
			}
		})
	);

	context.subscriptions.push(
		vscode.commands.registerCommand('todo-plus-plus.createIssue', async (title,description) => {
			try {
				const gitExtension : any | undefined= vscode.extensions.getExtension<GitExtension>('vscode.git')!.exports;
				if(gitExtension) {
					const git = await gitExtension.getAPI(1);
					if (git._model.repositories.length === 0) {
						vscode.window.showErrorMessage(`No Github Repository opened, open the workspace in VS Code to push as issue`);
					} else if (git._model.repositories.length > 1) {
						vscode.window.showErrorMessage(`Multiple folders with source control, open the correct workspace in VS Code to push as issue`);
					} else {
						var fetchUrl=git._model.repositories[0]._remotes[0].fetchUrl;
						var urlArray=fetchUrl.split('/');
						var owner=urlArray[3];
						var repo=urlArray[4].split('.')[0];
						if (urlArray[2] !== 'github.com') {
							vscode.window.showErrorMessage(`This extension only supports pushing issues to Github`);
						} else {
							const octokit = await credentials.getOctokit();
							await octokit.request(`POST /repos/${owner}/${repo}/issues`, {
								owner,
								repo,
								title: title,
								body: description
							});
							vscode.window.showInformationMessage(`Issue created in ${fetchUrl}`);
						}
					}
				}
				 
			}catch(e) {
				vscode.window.showErrorMessage(e.message);
			}
		})
	);

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "todo-plus-plus" is now active!');

}

// this method is called when your extension is deactivated
export function deactivate() { }
