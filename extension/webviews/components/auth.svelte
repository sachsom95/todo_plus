<script lang="ts">
    import { createEventDispatcher, onMount } from "svelte";
    const dispatch = createEventDispatcher();
    let authStatus='';

    onMount(async()=>{
        window.addEventListener('message', async (event) => {
        const message = event.data; 

            switch (message.type) {
                case 'auth-status':
                    authStatus = message.value
                    if(authStatus=='authenticated') {
                        dispatch("page_data_receive", { page: "todoListJoinOptions", auth:true });
                    }
            }
        });
    })

    async function loginGitHub() {
        await tsvscode.postMessage({type:"authenticate",value:undefined});
    }

    async function loginAnonymous() {
        dispatch("page_data_receive", { page: "todoListJoinOptions", auth:false });
    }

</script>

<div class="parent">
    <br />
    <button on:click={loginGitHub} type="submit">
        <div class="icon">
            <i class="codicon codicon-github-inverted icon-align-fix" />
            Continue with GitHub
        </div>
    </button>
    <br />
    <button on:click={loginAnonymous} type="submit">
        <div class="icon">
            <i class="codicon codicon-account icon-align-fix" />
            Continue Anonymously
        </div>
    </button>
</div>

<style>
    .parent {
        display: flex;
        text-align: center;
        flex-direction: column;
        justify-content: space-evenly;
    }
    .icon-align-fix {
        position: relative;
        margin-right: 2px;
        top: 2px;
    }
</style>
