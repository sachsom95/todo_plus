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

<div class="parent">
    <br />
    <button on:click={loginGitHub} type="submit">
        <div class="icon">
            <i class="codicon codicon-github-inverted icon-align-fix" />
            Sign In with GitHub
        </div>
    </button>
    <br />
    <button on:click={loginAnonymous} type="submit">
        <div class="icon">
            <i class="codicon codicon-account icon-align-fix" />
            Sign In Anonymously
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
