<script lang="ts">
    let src = 'https://www.vhv.rs/dpng/d/420-4200678_octocat-github-logo-transparent-github-for-government-octocat.png';
    let src2= './github.png'
</script>

<style>
    .parent{
        display: flex;
        text-align: center;
        flex-direction: column;
        justify-content: space-evenly;
    }
    i{
        margin-right:2px;
        margin-top: 5px;
    }
</style>


<div class="parent">
    <br/>
    <button type="submit"> 
        <div class="icon"><i class="codicon codicon-github-inverted"></i>
        Login with Github
        </div>
    </button>
    <br/>
    <button type="submit"> 
        <div class="icon"><i class="codicon codicon-account"></i>
        Sign In Anonymously
        </div>
    </button>
</div>
