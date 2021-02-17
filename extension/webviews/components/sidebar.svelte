<script lang="ts">
    let todos: Array<{ text: string; completed: boolean }> = [];
    let text = "";
    let invite_code = "";
</script>

<h2>Todolist: Make todos here!</h2>
<form
    on:submit|preventDefault={() => {
        todos = [...todos, { text, completed: false }];
        text = "";
    }}
>
    <input bind:value={text} />
</form>
<ul>
    {#each todos as todo (todo.text)}
        <li
            class:completed={todo.completed}
            on:click={() => {
                todo.completed = !todo.completed;
            }}
        >
            {todo.text}
        </li>
    {/each}
</ul>

<h2>Invite</h2>
<form on:submit|preventDefault={() => {}}>
    <input bind:value={invite_code} placeholder="Insert invite code" />
</form>

<button class:btn_inline={true}>Enter</button>
<button class:btn_inline={true}>Cancel</button>

<style>
    h2 {
        color: orange;
    }
    .completed {
        text-decoration: line-through;
    }

    .btn_inline {
        display: inline;
        width: 49%;
    }
    ::placeholder {
        text-align: center;
    }
</style>
