import { TodoList } from "./TodoList";
import firebase from "firebase/app";
import { db } from "../firebaseConfig";

// This interface is used to guarantee that the partial objects are valid in the updateValue function
interface ITodoItem {
    title?: string;
    description?: string;
    category?: string;
    completed?: boolean;
    archived?: boolean;
}

export class TodoItem {

    // Used for the Firestore collection name
    static readonly COLLECTION_NAME: string = TodoItem.name;

    readonly id: string;
    readonly todoList: TodoList;

    // For now this value is not changeable
    readonly category: string;

    // Properties appended with # are private
    // They can be read normally since a getter is defined below.
    // The setter updates the value both locally and in Firestore.
    #title: string;
    #description: string;
    #completed: boolean;
    #archived: boolean;

    // Create a local copy of the TodoItem
    private constructor(id: string, category: string, todoList: TodoList, title: string, description: string, completed: boolean, archived: boolean) {
        this.id = id;
        this.category = category;
        this.todoList = todoList;

        this.#title = title;
        this.#description = description;
        this.#completed = completed;
        this.#archived = archived;

        // The local TodoList instance holds a reference to all TodoItems for easier access.
        todoList.addTodoItem(this);
    }

    get todoListId() : string {
        return this.todoList.id;
    }

     // Used to update the document with an arbitrary set of atributes from the ITodoItem interface.
     private async updateValue(value: ITodoItem) : Promise<void> {

        // Reference pointing to this instance's Firestore document.
        const docRef = db.collection(TodoList.COLLECTION_NAME).doc(this.todoListId).collection(TodoItem.COLLECTION_NAME).doc(this.id);

        // Update the value in Firestore
        await docRef.update(value);
    }


    // Used to delete the TodoItem.
    // Optimistic, if the delete fails the document is readded.
    async delete() : Promise<void> {
        // Remove the TodoItem from the TodoList
        this.todoList.removeTodoItem(this);

        // Reference pointing to this instance's Firestore document.
        const docRef = db.collection(TodoList.COLLECTION_NAME).doc(this.todoListId).collection(TodoItem.COLLECTION_NAME).doc(this.id);

        // Delete the TodoItem from Firebase
        await docRef.delete()
        .catch( (error) => {
            console.error("Error deleting document: " + error);

            // In case of error, readd it locally
            this.todoList.addTodoItem(this);
        });
    }

    // Creates the TodoItem in Firestore and creates a local copy
    static async create(title: string, description: string, todoList: TodoList, category: string = 'Default') {

        // Reference pointing to the collection of TodoItems where a TodoItem is stored in Firestore.
        const colRef = db.collection(TodoList.COLLECTION_NAME).doc(todoList.id).collection(TodoItem.COLLECTION_NAME);
        // Reference pointing to the newly created object.
        const docRef = await colRef.add( {
            category: category,
            title: title,
            description: description,
            completed: false,
            archived: false,
            created: firebase.firestore.FieldValue.serverTimestamp()
        });

        // Creates a local copy of the TodoItem
        return new TodoItem(docRef.id, category, todoList, title, description, false, false);
    }

    // Fetches all TodoItems belonging to a certain todo list and creates a local copy
    static async fetch(todoList: TodoList) : Promise<Array<TodoItem>> {

        // Corresponds to the array of TodoItems which will be returned
        const todoItems : Array<TodoItem> = [];

        // Corresponds to the Firestore path which holds all todoItems belonging to the given todoList: TodoList
        const todoItemsRef = db.collection(TodoList.COLLECTION_NAME).doc(todoList.id).collection(TodoItem.COLLECTION_NAME);

        // Sends the get request for the TodoItems from Firestore and awaits for the response
        const todoItemsQuerySnapshot = await todoItemsRef.get();

        todoItemsQuerySnapshot.forEach( (doc) => {
            const data = doc.data();
            const todoItem = new TodoItem(doc.id, data.category, todoList, data.title, data.description, data.completed, data.archived);
            todoItems.push(todoItem);
        });

        return todoItems;    
    }

    // Getters and Setters

    get title() : string {
        return this.#title;
    }

    get description() : string {
        return this.#description;
    }

    get completed() : boolean {
        return this.#completed;
    }

    get archived() : boolean {
        return this.#archived;
    }

    // These setters are optimistic: they update the value locally right away, and revert back 
    // to the old value if there is a Firestore error

    set title(title: string) {
        const previous = this.#title;
        this.#title = title;
        this.updateValue({title: title}).catch ( (error) => {
            console.error("Error writing document: " + error);
            this.#title = previous;
        });
    }

    set description(description: string) {
        const previous = this.#description;
        this.#description = description;
        this.updateValue({description: description}).catch( (error) => {
            console.error("Error writing document: " + error);
            this.#description = previous;
        });
    }

    set completed(completed: boolean) {
        const previous = this.#completed;
        this.#completed = completed;
        this.updateValue({completed: completed}).catch( (error) => {
            console.error("Error writing document: " + error);
            this.#completed = previous;
        });
    }

    set archived(archived: boolean) {
        const previous = this.#archived;
        this.#archived = archived;
        this.updateValue({archived: archived}).catch( (error) => {
            console.error("Error writing document: " + error);
            this.#archived = previous;
        });
    }

}