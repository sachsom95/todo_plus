<!-- 
    This component is the actual todoList
 -->
<script lang="ts">
    import TodoCode from "./todoCode.svelte";

    import { TodoList } from "../../src/entities/TodoList";
    import { TodoItem } from "../../src/entities/TodoItem";

    import { createEventDispatcher } from "svelte";

    export let code: string;

    const dispatch = createEventDispatcher();

    let loading = true;
    let title = "";
    let makeTodoVisiblity = true;
    let description = "";
    let notfound = false;

    let todoList: TodoList;

    let enableTodoListTitleEdit = false;
    let todoListTitleEditText = "";

    (async () => {
        if (code !== undefined) {
            try {
                todoList = await TodoList.fetch(code);
            } catch (error) {
                console.error(error);
                notfound = true;
                return;
            }
        } else {
            todoList = await TodoList.create("My First TodoList!");
        }

        todoList.updateCallback = () => {
            todoList = todoList;
        };
        todoListTitleEditText = todoList.name;
        loading = false;
    })();

    async function addTodo(title: string, description: string): Promise<void> {
        loading = true;
        await TodoItem.create(todoList.id, title, description);
        loading = false;
    }

    async function deleteTodo(todoItem: TodoItem): Promise<void> {
        loading = true;
        await todoList.removeTodoItem(todoItem);
        loading = false;
    }

    function back() {
        dispatch("page_data_receive", { page: "joinTodoListInvite" });
    }
    
    async function updateTodoListName() : Promise<void> {
        loading = true;
        todoList.name = todoListTitleEditText;
        enableTodoListTitleEdit = false;
        loading = false;
    }

    // code for categories
    // let selectedCategory='Select Category'
    // let categories=['category1','category2','category3']
</script>


{#if notfound}
    <h2 class="title">Error: TodoList not found!</h2>
    <input class="form_input" disabled bind:value={code}>
    <button class="btn" on:click={back}>Try another code</button>
{:else}
    <div class="title">
        {#if todoList === undefined}
            <h2>Loading...</h2>
        {:else if enableTodoListTitleEdit === false}
            <h2>{todoList.name}</h2>
            <div on:click={() => enableTodoListTitleEdit = true} class="icon"><i class="codicon codicon-edit" /></div>
        {:else}
            <input bind:value={todoListTitleEditText}>
            <div on:click={(updateTodoListName)} class="icon"><i class="codicon codicon-check" /></div>
        {/if}
    </div>

    <TodoCode code={todoList ? todoList.id : ""} />

    <div
        class="maketodo-toggle"
        on:click={() => {
            makeTodoVisiblity = !makeTodoVisiblity;
        }}>
        <p>Make Todos</p>
        {#if makeTodoVisiblity}
            <div class="icon"><i class="codicon codicon-chevron-up" /></div>
        {:else}
            <div class="icon"><i class="codicon codicon-chevron-down" /></div>
        {/if}
    </div>
    {#if makeTodoVisiblity && todoList !== undefined}
        <form
            on:submit|preventDefault={() => {
                if (title === "") return;
                addTodo(title, description);
                title = "";
                description = "";
            }}>
            <p>Todo</p>
            <input bind:value={title} />
            <p>Description</p>
            <textarea bind:value={description} />
    
            <!-- Code for categories -->
            <!-- <label>Category:</label>
            <br/>
            <select value={selectedCategory}>
                {#each categories as category}
                    <option value={category}>
                        {category}
                    </option>
                {/each}
            </select> -->

            <br />
            <button class="btn" type="submit">Add Todo</button>
        </form>
        <br />
    {/if}

    <hr />

    <p>View Todos</p>
    <div class="todo_container">
        <ul class="todolist">
            <p class:hidden={!loading} class="transition">Loading...</p>

            {#if todoList !== undefined}
                {#each todoList.todoItems as todoItem (todoItem.id)}
                    <li
                        class:completed={todoItem.completed}
                        class="todoitem transition">
                        <input
                            class="todocheckbox"
                            type="checkbox"
                            checked={todoItem.completed}
                            on:click={() => {
                                todoItem.completed = !todoItem.completed;
                            }}
                        />
                        <div class="todo-text">
                            <h4>{todoItem.title}</h4>
                            <p class="description">{todoItem.description}</p>
                            <div class="interaction-buttons">
                                <div class="icon-text">
                                    <div class="icon"><i class="codicon codicon-issues icon-align-fix"/></div>
                                    <p>Push as an issue</p>
                                </div>
                                <div
                                    class="icon-text"
                                    on:click={() => deleteTodo(todoItem)}>
                                    <div class="icon"><i class="codicon codicon-trash icon-align-fix"/></div>
                                </div>
                            </div>
                        </div>
                    </li>
                {:else}
                    <p>Add your first todo!</p>
                {/each}
            {/if}
        </ul>
    </div>
{/if}

<style>

    .form_input {   
        padding-top: 10px;
        padding-bottom: 10px;
        text-align: center;
        height: unset;
    }

    .form_input::placeholder {
        text-align: center;
    }

    .btn {
        padding-bottom: 10px;
        padding-top: 10px;
    }
    .todo_container {
        overflow-y: auto;
        max-height: 600px;
    }
    
    .title {
        display: flex;
        align-items: center;
        margin-bottom: 15px;
    }

    .title i {
        position: relative;
        top: 3px;
        margin-left: 5px;
        cursor: pointer;
    }

    .hidden {
        opacity: 0;
    }

    .transition {
        transition: all 0.2s ease-in-out 0s;
    }

    input {
        height: 25px;
    }
    /* category styling */
    /* option,select{
        height: 35px;
        width: 100%;
    } */
    ul {
        list-style-type: none;
    }
    .todoitem {
        display: flex;
        margin-bottom: 10px;
    }
    h4 {
        font-weight: bold;
        text-transform: capitalize;
    }
    .todocheckbox {
        position: relative;
        top: -6px;
        margin-right: 10px;
    }
    input[type="checkbox"]:focus {
        outline-color: none;
    }
    .interaction-buttons {
        display: flex;
    }
    .interaction-buttons p {
        cursor: pointer;
        margin-right: 15px;
        font-size: small;
    }
    .todolist {
        padding-left: 0;
    }
    .todo-text {
        width: 100%;
    }
    .maketodo-toggle {
        margin-top: 15px;
        cursor: pointer;
        display: flex;
        justify-content: space-between;
    }
    .icon-text {
        display: flex;
        color: var(--vscode-textLink-foreground);
    }
    .description {
        margin: 2px;
    }
    .icon-align-fix {
        position: relative;
        margin-right: 2px;
        top: 2px;
    }
</style>
