<!-- This is Page after clicking quick todo list
    Contains intialize and join todo list UI here
-->
<script lang="ts">
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    export let auth: string;

    function initTodoList() {

        dispatch("page_data_receive", { code: "", page: "todoList", auth });
    }

    function joinTodoList() {
        dispatch("page_data_receive", { page: "joinTodoListInvite", auth });
    }

    function back(){
        dispatch("page_data_receive", { page: "auth", auth });
    }

</script>

<div on:click={back} class="icon back-button"><i class="codicon codicon-arrow-left"/></div>

<p class="p_heading">Create new collaborative todo list<br /></p>
<p class="p_content">
    Use this option if you want to start a new todo list to share with other
    people. A collaboration code will be generated
</p>
<button class="btn" on:click={initTodoList}>Initialize todo list</button>
<p class="p_heading">Connect to existing Todo list<br /></p>
<p class="p_content">
    Use this option if you want to join an existing todo list with an invite
    code
</p>
<button class="btn" on:click={joinTodoList}>Join a todo list</button>

<style>
    .back-button {
        display: inline-block;
        cursor: pointer;
    }

    .p_heading {
        font-size: var(--vscode-font-size);
        font-weight: bold;
        font-family: var(--vscode-font-family);
    }

    .p_content {
        font-weight: 400;
        text-align: left;
        text-align-last: left;
        padding-top: 5px;
    }

    /* ::placeholder {
        text-align: center;
    } */
    .btn {
        padding-bottom: 10px;
        padding-top: 10px;
    }
</style>
