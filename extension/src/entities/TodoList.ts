import { TodoItem } from "./TodoItem";
import firebase from "firebase/app";
import { db } from "../firebaseConfig";

interface ITodoList {
    name?: string
}

export class TodoList {

    // Used for the Firestore collection name
    static readonly COLLECTION_NAME: string = TodoList.name;

    // Readonly properties as they should not be modified (for now at least).
    readonly id: string;
    #name: string;
    todoItems: Array<TodoItem> = [];

    updateCallback: any;

    // Create a local copy of the TodoList
    private constructor(id: string, name: string) {
        this.id = id;
        this.#name = name;
        this.fetchAndListen();
    }

    fetchAndListen() {
        const todoListRef = db.collection(TodoList.COLLECTION_NAME).doc(this.id);
        todoListRef.onSnapshot( (doc) => {
            let data = doc.data();
            if (data === undefined) {
                return;
            }
            this.#name = data.name;
            if (this.updateCallback) {
                this.updateCallback();
            }
        });

        const todoItemsRef = db.collection(TodoList.COLLECTION_NAME).doc(this.id).collection(TodoItem.COLLECTION_NAME);
        todoItemsRef.onSnapshot((snapshot) => {
            snapshot.docChanges().forEach((change) => {
                let doc = change.doc;
                let data = doc.data();
                var source = doc.metadata.hasPendingWrites ? "local" : "server";
                if (change.type === "added") {
                    let todoItem = new TodoItem(doc.id, this.id, data.category, data.title, data.description, data.completed, data.archived);
                    this.addTodoItem(todoItem);
                } else if (change.type === "modified" && source === "server") {
                    this.updateTodoItem(doc.id, data.title, data.description, data.completed, data.archived);
                } else if (change.type === "removed") {
                    this.removeTodoItemFromList(doc.id);
                }
                if (this.updateCallback) {
                    this.updateCallback();
                }
            });
        });
    }

    // Returns all existing categories
    getCategories() : Set<string> {
        const categories : Set<string> = new Set<string>();

        for (const todoItem of this.todoItems) {
            categories.add(todoItem.category);
        }
        
        return categories;
    }

    // Used to add a TodoList to the TodoList
    addTodoItem(todoItem: TodoItem) {
        this.todoItems = [todoItem, ...this.todoItems];
    }

    private updateTodoItem(id: string, title: string, description: string, completed: boolean, archived: boolean) {
        let todoItem = this.todoItems.find( x => x.id === id);
        if (todoItem !== undefined) {
            todoItem.update(title, description, completed, archived);
        }
    }

    // Used to remove TodoItem from the local array
    private removeTodoItemFromList(id: string) {
        let index = this.todoItems.findIndex( x => x.id === id);
        if (index !== -1) {
            this.todoItems.splice(index, 1);
        }
    }

    // Used to remove a TodoItem from the TodoList in Firestore
    // This should trigger a listener which will automatically remove the item locally
    async removeTodoItem(todoItem: TodoItem) : Promise<void> {
        const docRef = db.collection(TodoList.COLLECTION_NAME).doc(this.id).collection(TodoItem.COLLECTION_NAME).doc(todoItem.id);
        await docRef.delete();
    }

    // Create the TodoList in firebase and create a local copy
    static async create(name: string) : Promise<TodoList> {

        // Reference points to the TodoList collection in Firestore
        const colRef = db.collection(TodoList.COLLECTION_NAME);

        // Reference points to the newly created TodoList in Firestore.
        const docRef = await colRef.add( {
            name: name,
            created: firebase.firestore.FieldValue.serverTimestamp()
        });
        return new TodoList(docRef.id, name);
    }

    // Fetch the TodoList from Firebase and create a local copy
    static async fetch(id: string) : Promise<TodoList> {

        // Reference points to the TodoList identified by id: string
        const todoListRef = db.collection(TodoList.COLLECTION_NAME).doc(id);

        // Snapshot with the TodoList data
        const todoListSnapshot = await todoListRef.get();

        // Throw an error if the TodoList does not exist
        if (!todoListSnapshot.exists) {
            throw new Error(`TodoList ${id} does not exist`);
        }

        // Crea the local copy of the TodoList
        const todoList = new TodoList(id, todoListSnapshot?.data()?.name);

        // Fetch all TodoItems belonging to this TodoList
        // await TodoItem.fetch(todoList);
        return todoList;
    }

    get name() : string {
        return this.#name;
    }

    set name(name: string) {
        const previous = this.#name;
        this.#name = name;
        this.updateValue({name: name}).catch( (error) => {
            console.error("Error writing document: " + error);
            this.#name = previous;
        });
    }

    private async updateValue(value: ITodoList) : Promise<void> {

        // Reference pointing to this instance's Firestore document.
        const docRef = db.collection(TodoList.COLLECTION_NAME).doc(this.id);

        // Update the value in Firestore
        await docRef.update(value);
    }
}