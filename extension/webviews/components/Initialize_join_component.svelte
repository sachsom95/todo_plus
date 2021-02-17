<script lang="ts">
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();
    const onSubmit = (data: string) => {
        if (data === "Auth") {
            dispatch("page_data_receive", { text: "Auth" });
        } else {
            dispatch("page_data_receive", { text: "invite" });
        }
    };
</script>

<p class="p_heading">Create new collaborative todo list<br /></p>
<p class="p_content">
    Use this option if you want to start a new todo list to share with other
    people. A collaboration code will be generated
</p>
<!-- Funny Svelt only allows passing param via inline only -->
<button on:click={() => onSubmit("Auth")}>Initialize todo list</button>
<p class="p_heading">Connect to existing Todo list<br /></p>
<p class="p_content">
    Use this option if you want to join an existing todo list with an invite
    code
</p>
<button on:click={() => onSubmit("invite")}>Join a todo list</button>

<!-- Funny Svelt only allows passing param via inline only -->
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
