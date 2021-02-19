<script lang="ts">
    let inviteCode = "";

    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    function cancel() {
        dispatch("page_data_receive", { page: "todoListJoinOptions" });
    }

    function join() {
        dispatch("page_data_receive", { page: "todoList", code: inviteCode });
    }
</script>

<!-- Invite component -->

<h4 class="p_heading">Join Todo List</h4>
<p />
<form on:submit|preventDefault={() => {}}>
    <input bind:value={inviteCode} placeholder="Insert invite code" />
</form>

<button class="btn_inline" on:click={join}>Enter</button>
<button class="btn_inline" on:click={cancel}>Cancel</button>

<!-- Invite component -->
<style>
    /* h2 {
        color: orange;
    } */
    .p_heading {
        font-size: var(--vscode-font-size);
        font-weight: bold;
        font-family: var(--vscode-font-family);
    }

    .btn_inline {
        display: inline;
        width: 49%;
    }
</style>
