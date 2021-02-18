<script lang="ts">
    import Invite_component from "./Invite_component.svelte";
    import Initialize_join_component from "./Initialize_join_component.svelte";
    import Todolist from "./todolist.svelte";
    import Auth from "./auth.svelte";

    let currentPage: string = "initial";
    // This even listner will update the currentPage based on changes from component button press
    const update_page = (event) => {
        currentPage = event.detail.text;
    };
</script>

{#if currentPage == "Auth"}
    <button
        on:click={() => {
            currentPage = "Todo";
        }}>Change to todolist</button
    >
    <Auth />
{:else if currentPage == "Todo"}
    <button
        on:click={() => {
            currentPage = "Auth";
        }}>Change to Auth</button
    >
    <Todolist />
{:else if currentPage == "initial"}
    <Initialize_join_component on:page_data_receive={update_page} />
{:else if currentPage == "invite"}
    <Invite_component on:page_data_receive={update_page} />
{/if}
