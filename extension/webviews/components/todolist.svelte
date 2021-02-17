<script lang="ts">
    let todos:Array<{text: string;description: string,completed:boolean}>=[];
    let text="";
    let makeTodoVisiblity=false;
    let description="";
    // code for categories
    // let selectedCategory='Select Category'
    // let categories=['category1','category2','category3']
</script>
<style>
    input{
        height: 25px;
    }
    /* category styling */
    /* option,select{
        height: 35px;
        width: 100%;
    } */
    ul{
        list-style-type:none;
    }
    .todoitem{
        display: flex;
    }
    h4{
        font-weight: bold;
        text-transform: capitalize;
    }
    .todocheckbox{
        margin-right: 10px;
    }
    input[type=checkbox]:focus{
        outline-color:none;
    }
    .interaction-buttons{
        display: flex;
    }
    .interaction-buttons p{
        cursor: pointer;
        margin-right: 15px;
        font-size: small;
    }
    .todo-text{
        width:100%;
    }
    .maketodo-toggle{
        cursor: pointer;
        display: flex;
        justify-content: space-between;
    }
    .icon-text{
        display: flex;
        color: var(--vscode-textLink-foreground);
    }
    .description{
        margin:2px;
    }
</style>
<h2>Todolist: Make todos here!</h2>
<div class="maketodo-toggle" on:click={()=>{makeTodoVisiblity=!makeTodoVisiblity}}>
    <p>Make Todos</p>
    {#if makeTodoVisiblity}
        <div class="icon"><i class="codicon codicon-chevron-up"></i></div>
    {:else}
        <div class="icon"><i class="codicon codicon-chevron-down"></i></div>
    {/if}
</div>
{#if makeTodoVisiblity}
    <form on:submit|preventDefault={()=>{
        todos=[...todos,{text,completed:false,description}];
        text="";
        description="";
    }}>
        <label>Todo</label>
        <input bind:value={text}  />
        <label>Description</label>
        <textarea bind:value={description}  />

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

        <br/>
        <button type="submit">Add Todo</button>

    </form>
    <br/>
    
{/if}

<hr/>
<p>View Todos</p>
<ul>
    {#each todos as todo (todo.text)}
        <li class:completed={todo.completed}
            class="todoitem"
            on:click={()=>{
                todo.completed=!todo.completed
            }}
        >
        <input class="todocheckbox" type=checkbox checked={false}>
        <div class="todo-text">
        <h4>{todo.text}</h4>
        <p class="description">{todo.description}</p>
        <div class="interaction-buttons">
            <div class="icon-text">
                <div class="icon">
                    <i class="codicon codicon-issues"></i>
                </div>
                <p>Push as an issue</p>
            </div>
            <div class="icon-text">
                <div class="icon">
                    <i class="codicon codicon-trash"></i>
                </div>
                <p>Delete</p>
            </div>
        </div>
        </div>
        </li>
    {/each}
</ul>