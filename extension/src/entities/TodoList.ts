import { TodoItem } from "./TodoItem";
import firebase from "firebase/app";
import { db } from "../firebaseConfig";

export class TodoList {

    // Used for the Firestore collection name
    static readonly COLLECTION_NAME: string = TodoList.name;

    // Readonly properties as they should not be modified (for now at least).
    readonly id: string;
    readonly name: string;
    todoItems: Array<TodoItem> = [];

    // Create a local copy of the TodoList
    private constructor(id: string, name: string) {
        this.id = id;
        this.name = name;
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
        //this.todoItemArray.push(todoItem);
    }

    // Used to remove a TodoItem from the TodoList
    async removeTodoItem(todoItem: TodoItem) : Promise<void> {
        const index = this.todoItems.indexOf(todoItem);
        if (index > -1) {
            this.todoItems.splice(index, 1);

            const docRef = db.collection(TodoList.COLLECTION_NAME).doc(this.id).collection(TodoItem.COLLECTION_NAME).doc(todoItem.id);
            await docRef.delete();
        }
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
        await TodoItem.fetch(todoList);
        return todoList;
    }
}