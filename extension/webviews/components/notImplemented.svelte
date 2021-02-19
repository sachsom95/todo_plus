<script lang="ts">
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    function initial() {
        dispatch("page_data_receive", { page: "initial" });
    }

</script>

<h1>Not yet implemented</h1>

<button on:click={initial}>Back to the start page</button>