import * as vscode from 'vscode';
import * as Octokit from '@octokit/rest';
const GITHUB_AUTH_PROVIDER_ID = 'github';

const SCOPES = ['repo'];

export class Credentials {
	private octokit: Octokit.Octokit | undefined;

	async initialize(context: vscode.ExtensionContext): Promise<void> {
		this.registerListeners(context);
		this.setOctokit();
	}

	private async setOctokit() {
		/**
		 * By passing the `createIfNone` flag, a numbered badge will show up on the accounts activity bar icon.
		 * An entry for the sample extension will be added under the menu to sign in. This allows quietly 
		 * prompting the user to sign in.
		 * */
        try {
            const session = await vscode.authentication.getSession(GITHUB_AUTH_PROVIDER_ID, SCOPES, { createIfNone: false });

            if (session) {
                this.octokit = new Octokit.Octokit({
                    auth: session.accessToken
                });

                return;
            }

            this.octokit = undefined;

        } catch(e) {
            console.error("setOctokit error:", e);
        }
		
	}

	registerListeners(context: vscode.ExtensionContext): void {
		/**
		 * Sessions are changed when a user logs in or logs out.
		 */
		context.subscriptions.push(vscode.authentication.onDidChangeSessions(async e => {
			if (e.provider.id === GITHUB_AUTH_PROVIDER_ID) {
				await this.setOctokit();
			}
		}));
	}

	async getOctokit(): Promise<Octokit.Octokit> {
		try {
			if (this.octokit) {
				return this.octokit;
			}
	
			/**
			 * When the `createIfNone` flag is passed, a modal dialog will be shown asking the user to sign in.
			 * Note that this can throw if the user clicks cancel.
			 */
			const session = await vscode.authentication.getSession(GITHUB_AUTH_PROVIDER_ID, SCOPES, { createIfNone: true });
			this.octokit = new Octokit.Octokit({
				auth: session.accessToken
			});
	
			return this.octokit;
		} catch(e) {
            console.error("setOctokit error:", e);
        }
		
	}
}