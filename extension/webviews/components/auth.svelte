<script lang="ts">
</script>

<style>
    .parent{
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


<div class="parent">
    <br/>
    <button type="submit"> 
        <div class="icon"><i class="codicon codicon-github-inverted icon-align-fix"></i>
        Login with Github
        </div>
    </button>
    <br/>
    <button type="submit"> 
        <div class="icon"><i class="codicon codicon-account icon-align-fix"></i>
        Sign In Anonymously
        </div>
    </button>
</div>
