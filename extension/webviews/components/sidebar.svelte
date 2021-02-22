<script lang="ts">
    import JoinTodoListInvite from "./joinTodoListInvite.svelte";
    import TodoListJoinOptions from "./todoListJoinOptions.svelte";
    import Todolist from "./todoList.svelte";
    import Auth from "./auth.svelte";
    import NotImplemented from "./notImplemented.svelte";

    let currentPage: string = "auth";
    let code: string;
    // This even listner will update the currentPage based on changes from component button press
    const updatePage = (event : any) => {
        currentPage = event.detail.page;

        if (event?.detail?.code !== undefined) {
            code = event.detail.code;
        }
    };
</script>

{#if currentPage === "auth" || currentPage === "initial"}
<Auth on:page_data_receive={updatePage}/>

{:else if currentPage === "todoListJoinOptions"}
<TodoListJoinOptions on:page_data_receive={updatePage}/>

{:else if currentPage === "todoList"}
<Todolist code={code} on:page_data_receive={updatePage}/>

{:else if currentPage === "joinTodoListInvite"}
<JoinTodoListInvite on:page_data_receive={updatePage}/>

{:else if currentPage === "notImplemented"}
<NotImplemented on:page_data_receive={updatePage}/>

{:else}
<p>Error 404</p>

{/if}