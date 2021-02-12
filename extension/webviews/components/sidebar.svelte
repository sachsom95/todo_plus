<script lang="ts">
    let todos:Array<{text: string;completed:boolean}>=[];
    let text="";
</script>
<style>
    h2{
        color:orange;
    }
    .completed{
        text-decoration: line-through;
    }
</style>
<h2>Todolist: Make todos here!</h2>
<form on:submit|preventDefault={()=>{
    todos=[...todos,{text,completed:false}];
    text="";
}}>
    <input bind:value={text}  />
</form>
<ul>
    {#each todos as todo (todo.text)}
        <li class:completed={todo.completed}
            on:click={()=>{
                todo.completed=!todo.completed
            }}
        >{todo.text}</li>
    {/each}
</ul>