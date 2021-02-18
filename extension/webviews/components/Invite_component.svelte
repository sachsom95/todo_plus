<script lang="ts">
    let invite_code = "";

    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();
    const onSubmit = (data: string) => {
        if (data === "initial") {
            dispatch("page_data_receive", { text: "initial" });
        }
    };
</script>

<!-- Invite component -->

<h4 class="p_heading">Invite</h4>
<p />
<form on:submit|preventDefault={() => {}}>
    <input bind:value={invite_code} placeholder="Insert invite code" />
</form>

<button class="btn_inline">Enter</button>
<button class="btn_inline" on:click={() => onSubmit("initial")}>Cancel</button>

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
    ::placeholder {
        text-align: center;
    }
</style>
