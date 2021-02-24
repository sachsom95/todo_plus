<script lang="ts">
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    export let auth:string;

    function initTodoList() {
        dispatch("page_data_receive", { page: "todoList",auth });
    }

    function joinTodoList() {
        dispatch("page_data_receive", { page: "joinTodoListInvite",auth });
    }

</script>

<p class="p_heading">Create new collaborative todo list<br /></p>
<p class="p_content">
    Use this option if you want to start a new todo list to share with other
    people. A collaboration code will be generated
</p>
<button on:click={initTodoList}>Initialize todo list</button>
<p class="p_heading">Connect to existing Todo list<br /></p>
<p class="p_content">
    Use this option if you want to join an existing todo list with an invite
    code
</p>
<button on:click={joinTodoList}>Join a todo list</button>

<style>
    .p_heading {
        font-size: var(--vscode-font-size);
        font-weight: bold;
        font-family: var(--vscode-font-family);
    }

    .p_content {
        font-weight: 400;
    }

    ::placeholder {
        text-align: center;
    }
</style>
