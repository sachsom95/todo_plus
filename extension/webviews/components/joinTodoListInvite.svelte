<script lang="ts">
    let inviteCode = "";
    export let auth:string;
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    function cancel() {
        dispatch("page_data_receive", { page: "todoListJoinOptions", auth });
    }

    function join() {
        dispatch("page_data_receive", { page: "todoList", code: inviteCode, auth });
    }

    function onRightClick() {
            navigator.clipboard.readText()
            .then(text => {
                inviteCode = text;
            });
        }
</script>

<!-- Invite component -->

<h4 class="p_heading">Join Todo List</h4>
<p />
<form on:submit|preventDefault={() => {}} on:contextmenu|preventDefault={onRightClick}>
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
