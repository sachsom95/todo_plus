<script lang="ts">
    import JoinTodoListInvite from "./joinTodoListInvite.svelte";
    import TodoListJoinOptions from "./todoListJoinOptions.svelte";
    import Todolist from "./todoList.svelte";
    import Auth from "./auth.svelte";
    import NotImplemented from "./notImplemented.svelte";

    let currentPage:
        | "auth"
        | "initial"
        | "todoList"
        | "joinTodoListInvite"
        | "notImplemented" = tsvscode.getState()?.currentPage || "auth";
    $: {
        tsvscode.setState({ currentPage });
    }
    let code: string;
    // This even listner will update the currentPage based on changes from component button press
    const updatePage = (event: any) => {
        currentPage = event.detail.page;
        if (event?.detail?.code !== undefined) {
            code = event.detail.code;
        }
    };
</script>

{#if currentPage === "auth" || currentPage === "initial"}
    <Auth on:page_data_receive={updatePage} />
{:else if currentPage === "todoListJoinOptions"}
    <TodoListJoinOptions on:page_data_receive={updatePage} />
{:else if currentPage === "todoList"}
    <Todolist {code} on:page_data_receive={updatePage} />
{:else if currentPage === "joinTodoListInvite"}
    <JoinTodoListInvite on:page_data_receive={updatePage} />
{:else if currentPage === "notImplemented"}
    <NotImplemented on:page_data_receive={updatePage} />
{:else}
<p>Error 404</p>

{/if}


<!-- {#if currentPage == "Auth"}
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
    
{:else if currentPage == "initial"}
    <Initialize_join_component on:page_data_receive={updatePage} />
{:else if currentPage == "invite"}
    <Invite_component on:page_data_receive={updatePage} />
{/if} -->
