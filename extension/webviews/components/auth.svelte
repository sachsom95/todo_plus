<!-- 
    This is the inital page 
    This component is the login page github/Anonymous   
-->
<script lang="ts">
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    function loginGitHub() {
        dispatch("page_data_receive", { page: "notImplemented" });
    }

    function loginAnonymous() {
        dispatch("page_data_receive", { page: "todoListJoinOptions" });
    }
</script>

<div class="container">
    <h1>Todo++</h1>
    <hr class="divider_hr" />
</div>
<div class="parent">
    <p class="p_content">
        Login via Github to access saved todo lists and get access to all the
        collaborative and Github features.
    </p>
    <br />
    <button class="btn" on:click={loginGitHub} type="submit">
        <div class="icon">
            <i class="codicon codicon-github-inverted icon-align-fix" />
            Sign In with GitHub
        </div>
    </button>
    <br />
    <p class="p_content">
        Create a quick todo list and share an invite code to collaborate with
        your team without loging into Github.
    </p>
    <br />
    <button class="btn" on:click={loginAnonymous} type="submit">
        <div class="icon">
            <i class="codicon codicon-account icon-align-fix" />
            Instant Todo List
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
    .divider_hr {
        border-top: 1px;
    }
    .p_content {
        text-align: left;
        text-align-last: left;
        padding-top: 5px;
        font-weight: 400;
    }
    .btn {
        padding-bottom: 10px;
    }
</style>
