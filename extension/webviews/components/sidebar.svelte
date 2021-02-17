<script lang="ts">
    import Todolist from "./todolist.svelte";
    import Auth from "./auth.svelte";
    let currentPage="Auth";
</script>

{#if currentPage=='Auth'}
    <Auth/>
    <button on:click={()=>{
        currentPage="Todo";
    }}>Change to todolist</button>
{:else if currentPage=='Todo'}
    <Todolist />
    <button on:click={()=>{
        currentPage="Auth";
    }}>Change to Auth</button>
{/if}