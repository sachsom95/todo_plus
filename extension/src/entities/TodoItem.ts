import { TodoList } from "./TodoList";
import firebase from "firebase/app";
import { db } from "../firebaseConfig";

// This interface is used to guarantee that the partial objects are valid in the updateValue function
interface ITodoItem {
    title?: string;
    description?: string;
    category?: string;
    created?: number;
    completed?: boolean;
    archived?: boolean;
}

export class TodoItem {

    // Used for the Firestore collection name
    static readonly COLLECTION_NAME: string = "TodoItem";

    readonly id: string;
    readonly todoListId: string;

    // For now this value is not changeable
    readonly category: string;
    readonly created: number;

    // Properties appended with # are private
    // They can be read normally since a getter is defined below.
    // The setter updates the value both locally and in Firestore.
    #title: string;
    #description: string;
    #completed: boolean;
    #archived: boolean;

    // Create a local copy of the TodoItem
    constructor(id: string, todoListId: string, category: string, created: number, title: string, description: string, completed: boolean, archived: boolean) {
        this.id = id;
        this.category = category;
        this.created = created;
        this.todoListId = todoListId;
        this.#title = title;
        this.#description = description;
        this.#completed = completed;
        this.#archived = archived;
    }

    // Used to update the objects values locally
    update(title: string, description: string, completed: boolean, archived: boolean) {
        this.#title = title;
        this.#description = description;
        this.#completed = completed;
        this.#archived = archived;
    }

     // Used to update the document with an arbitrary set of atributes from the ITodoItem interface.
     private async updateValue(value: ITodoItem) : Promise<void> {

        // Reference pointing to this instance's Firestore document.
        const docRef = db.collection(TodoList.COLLECTION_NAME).doc(this.todoListId).collection(TodoItem.COLLECTION_NAME).doc(this.id);

        // Update the value in Firestore
        await docRef.update(value);
    }

    // Creates the TodoItem in Firestore and creates a local copy
    static async create(todoListId: string, title: string, description: string, category: string = 'Default') {

        // Reference pointing to the collection of TodoItems where a TodoItem is stored in Firestore.
        const colRef = db.collection(TodoList.COLLECTION_NAME).doc(todoListId).collection(TodoItem.COLLECTION_NAME);
        // Reference pointing to the newly created object.
        await colRef.add( {
            category: category,
            title: title,
            description: description,
            completed: false,
            archived: false,
            created: firebase.firestore.FieldValue.serverTimestamp()
        });
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