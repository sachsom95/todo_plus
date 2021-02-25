# Todo++ VS Code Extension

Todo++ is a VS Code extension for you to list all your todo items and collaborate with others on their Todolists.

## Features

1. Create and share todolists \
User can create todolist, both as anonymous user or as an authenticated github user. The user can create todo items with title and description, delete todo items as well as edit the name of the list. Creating a todolist generates a unique code for the list which you can share with others.

2. Collaborate in real time \
User can share the unique code with other users and allow them to join their todolist. Joined users can now collaborate on the todolist in real time, creating, completing and deleting todoitems.

3. Push your todoitems as a github issue \
If the user is signed in with github, user can create an issue of a todo item by just one click. User can click on "Push as an issue" and the todoitem will be pushed as an issue to github of the currently opened repository.

## Requirements

1. [yarn](https://classic.yarnpkg.com/en/docs/install) \
Yarn should be installed on your machine to run the extension 

2. [Firebase account](https://firebase.google.com) \
User should create a firebase account and a firebase project to get api keys and other configuation details


## Extension Settings

No additional settings are required for this extension.

## Testing in development mode

- Clone the repository
- cd into extension folder
- Add a typescript file api.ts in src folder. api.ts should contain all the details for firebase config as mentioned in api.ts.example in the src folder
- Run the following commands on the terminal
```
yarn install
yarn watch
```
- Go to extension.ts file in the src folder and run the extension. (Shortcut: F5/Fn+F5)
- Select VS Code Extension Development from the list
- A new vs code window will open up to test the extension

## Known Issues

In development mode, extension may not load when first activated, the sidebar icon needs to be clicked again to active the extension.

## Release Notes

Users appreciate release notes as you update your extension.

### 1.0.0

Initial release of Todo++

## Following extension guidelines

VS Code Todo++ extension abides by the following extension guidelines

* [Extension Guidelines](https://code.visualstudio.com/api/references/extension-guidelines)


### For more information

* [Visual Studio Code's Markdown Support](http://code.visualstudio.com/docs/languages/markdown)
* [Markdown Syntax Reference](https://help.github.com/articles/markdown-basics/)

**Enjoy!**
