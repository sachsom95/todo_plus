<script lang="ts">
    import TodoCode from './todoCode.svelte';

    import { TodoList } from '../../src/entities/TodoList'
    import { TodoItem } from '../../src/entities/TodoItem'    

    export let code: string;

    let loading = true;
    let title = "";
    let makeTodoVisiblity = true;
    let description = "";

    let todoList : TodoList;

    ( async () => {
        if (code !== undefined) {
            todoList = await TodoList.fetch(code);
        } else {
            todoList = await TodoList.create("My First TodoList!");
        }
        loading = false; 
    })();

    async function addTodo(title: string, description: string) : Promise<void> {
        loading = true;
        await TodoItem.create(title, description, todoList);
        todoList = todoList;
        loading = false;
    }

    async function deleteTodo(todoItem: TodoItem) : Promise<void> {
        loading = true;
        await todoList.removeTodoItem(todoItem);
        todoList = todoList;
        loading = false;
    }
    
    // code for categories
    // let selectedCategory='Select Category'
    // let categories=['category1','category2','category3']
</script>

<h2 class="title">{todoList === undefined ? 'Loading...' : todoList.name}</h2>

<TodoCode code={todoList ? todoList.id : ""}/>

<div
    class="maketodo-toggle"
    on:click={() => {
        makeTodoVisiblity = !makeTodoVisiblity;
    }}
>
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
        }}
    >
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
        <button type="submit">Add Todo</button>
    </form>
    <br />
{/if}

<hr />

<p>View Todos</p>
<ul class="todolist">
    
    <p class:hidden={!loading} class="transition">Loading...</p>

    {#if todoList !== undefined}
        {#each todoList.todoItems as todoItem (todoItem.id)}
            <li class:completed={todoItem.completed} class="todoitem transition" >
                <input class="todocheckbox" type="checkbox" checked={todoItem.completed} on:click={() => {
                    todoItem.completed = !todoItem.completed;
                }}
                />
                <div class="todo-text">
                    <h4>{todoItem.title}</h4>
                    <p class="description">{todoItem.description}</p>
                    <div class="interaction-buttons">
                        <div class="icon-text">
                            <div class="icon">
                                <i class="codicon codicon-issues icon-align-fix" />
                            </div>
                            <p>Push as an issue</p>
                        </div>
                        <div class="icon-text" on:click={deleteTodo(todoItem)}>
                            <div class="icon">
                                <i class="codicon codicon-trash icon-align-fix" />
                            </div>
                            <p>Delete</p>
                        </div>
                    </div>
                </div>
            </li>
        {:else}
            <p>Nothing seems to be here!</p>
        {/each}

    {/if}
</ul>

<style>

    .title {
        margin-bottom: 15px;
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