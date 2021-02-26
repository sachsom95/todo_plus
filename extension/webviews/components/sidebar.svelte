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

    let auth: string;
    let code: string = tsvscode.getState()?.code || "";

    const updateData = (event: any) => {
        if (event?.detail?.page !== undefined) {
            currentPage = event.detail.page;
        }
        if (event?.detail?.code !== undefined) {
            code = event.detail.code;
        }
        if (event?.detail?.auth !== undefined) {
            auth = event.detail.auth;
        }
    };

    $: {
        tsvscode.setState({code,currentPage})
    }

</script>

{#if currentPage === "auth" }
    <Auth on:page_data_receive={updateData}/>

{:else if currentPage === "todoListJoinOptions"}
    <TodoListJoinOptions auth={auth} on:page_data_receive={updateData}/>

{:else if currentPage === "todoList"}
    <Todolist code={code} auth={auth} on:page_data_receive={updateData}/>

{:else if currentPage === "joinTodoListInvite"}
    <JoinTodoListInvite auth={auth} on:page_data_receive={updateData}/>

{:else if currentPage === "notImplemented"}
    <NotImplemented on:page_data_receive={updateData} />
{:else}
<p>Error 404</p>

{/if}