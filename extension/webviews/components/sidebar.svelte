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

    let code: string = tsvscode.getState()?.code || "";

    const updateData = (event: any) => {
        if (event?.detail?.page !== undefined) {
            currentPage = event.detail.page;
        }
        if (event?.detail?.code !== undefined) {
            code = event.detail.code;
        }
    };

    $: {
        tsvscode.setState({code,currentPage})
    }

</script>

{#if currentPage === "auth" || currentPage === "initial"}
    <Auth on:page_data_receive={updateData} />
{:else if currentPage === "todoListJoinOptions"}
    <TodoListJoinOptions on:page_data_receive={updateData} />
{:else if currentPage === "todoList"}
    <Todolist {code} on:page_data_receive={updateData} />
{:else if currentPage === "joinTodoListInvite"}
    <JoinTodoListInvite on:page_data_receive={updateData} />
{:else if currentPage === "notImplemented"}
    <NotImplemented on:page_data_receive={updateData} />
{:else}
<p>Error 404</p>

{/if}