<script lang="ts">
    import Invite_component from "./Invite_component.svelte";
    import Initialize_join_component from "./Initialize_join_component.svelte";
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

<Invite_component />
<Initialize_join_component />

<!--  -->
<style>
    .completed {
        text-decoration: line-through;
    }
</style>
