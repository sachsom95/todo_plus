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
        | "todoListJoinOptions"
        | "notImplemented" = tsvscode.getState()?.currentPage || "auth";
    $: {
        tsvscode.setState({ currentPage });
    }
    let code: string;
    let auth:string;

    console.log("currentpage",currentPage)
    // This even listner will update the currentPage based on changes from component button press
    const updatePage = (event: any) => {
        currentPage = event.detail.page;
        if (event?.detail?.code !== undefined) {
            code = event.detail.code;
        }
        if (event?.detail?.auth !== undefined) {
            auth = event.detail.auth;
        }
    };
</script>

{#if currentPage === "auth" }
<Auth on:page_data_receive={updatePage}/>

{:else if currentPage === "todoListJoinOptions"}
<TodoListJoinOptions auth={auth} on:page_data_receive={updatePage}/>

{:else if currentPage === "todoList"}
<Todolist code={code} auth={auth} on:page_data_receive={updatePage}/>

{:else if currentPage === "joinTodoListInvite"}
<JoinTodoListInvite auth={auth} on:page_data_receive={updatePage}/>

{:else if currentPage === "notImplemented"}
<NotImplemented on:page_data_receive={updatePage}/>

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
