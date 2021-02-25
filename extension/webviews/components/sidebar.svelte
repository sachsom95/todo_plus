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
        let code: string = tsvscode.getState()?.code || undefined;
    // $: {
    //     // tsvscode.setState({ currentPage ,code});
    //     tsvscode.setState({code});
    //     console.log(`Runn`)
    //     console.log(currentPage)

    //     console.log(`code->${code}`)
    //     // tsvscode.setState({ code });
    // }
    // This even listner will update the currentPage based on changes from component button press
    const updatePage = (event: any) => {
        currentPage = event.detail.page;
        if (event?.detail?.code !== undefined) {
            code = event.detail.code;
        }
    };

    $: {
        tsvscode.setState({code,currentPage})

        // tsvscode.setState({ currentPage });

        console.log(`todoList Console`)
        console.log(`code updated->${code} and page->${currentPage}`)
        // tsvscode.setState({ code });
    }



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
