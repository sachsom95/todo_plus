<!-- 
    This component has the input box 
    for entering the code
 -->
<script lang="ts">
    let inviteCode = "";
    export let auth: string;
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


<p class="p_heading">Join Todo List</p>
<p class="p_content">
    Enter the access code to join todoList. press cancel to go back.
</p>
<form on:submit|preventDefault={() => {}} on:contextmenu|preventDefault={onRightClick}>
    <input
        class="form_input"
        bind:value={inviteCode}
        placeholder=" Enter invite code"
    />
  

<!-- Invite component Lucas MR conflict fallback -->

<!-- <h4 class="p_heading">Join Todo List</h4>
<p />
<form on:submit|preventDefault={() => {}} on:contextmenu|preventDefault={onRightClick}>
    <input bind:value={inviteCode} placeholder="Insert invite code" /> -->

</form>
<div class="flex_box">
    <button class="btn_inline" on:click={join}>Enter</button>
    <button class="btn_inline" on:click={cancel}>Cancel</button>
</div>

<!-- Invite component -->
<style>
    .flex_box {
        display: flex;
        justify-content: space-between;
    }
    .p_heading {
        font-size: var(--vscode-font-size);
        font-weight: bold;
        font-family: var(--vscode-font-family);
        padding-top: 5px;
        padding-bottom: 5px;
    }

    .btn_inline {
        padding-bottom: 10px;
        padding-top: 10px;
        width: 49%;
    }

    .form_input {
        padding-top: 10px;
        padding-bottom: 10px;
        text-align: center;
    }

    ::placeholder {
        text-align: center;
    }
</style>
