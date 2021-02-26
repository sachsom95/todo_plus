<script lang="ts">
  export let code: string; // prop passes to the component
  let copied = false;

  function copy() {
    if (code === "") return;
    copied = true;
    navigator.clipboard.writeText(code).catch((err) => {
      console.error("Async: Could not copy text: ", err);
    });

    setTimeout(() => {
      copied = false;
    }, 2500);
  }
</script>

<div class="container_share" >
  <p class="p_heading">Share your todolist with the code below</p>
  <button class="btn" on:click={copy}>
    <div class="flex_box">
      <p>{code || "Loading..."}</p>
      <p>{copied ? "copied" : "copy"}</p>
    </div>
    
  </button>
  <!-- <button class="btn" on:click={copy}>{copied ? "copied" : "copy"}</button> -->
  <div />
</div>

<style>
  .p_heading {
    font-size: var(--vscode-font-size);
    font-family: var(--vscode-font-family);
    padding-top: 5px;
    padding-bottom: 5px;
  }

  .flex_box {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  .btn {
    padding-bottom: 10px;
    padding-top: 10px;
    text-align: justify;
  }
 
  .container_share {
    display: flex;
    flex-direction: column;
  }

  .container_share div {
    padding: 5px 10px 5px 10px;
    margin-right: 8px;
    font-family: monospace;
    transition: all 0.1s ease-in-out;
    font-size: small;
  }

  .flex_box:active {
    outline: none;
    border-color: var(--vscode-textLink-foreground);
    -webkit-animation: breathing 0.2s ease-out 1 normal;
    animation: breathing 0.2s ease-out 1 normal;
  }

  @-webkit-keyframes breathing {
    0% {
      -webkit-transform: scale(1);
      transform: scale(1);
    }

    50% {
      -webkit-transform: scale(0.9);
      transform: scale(0.9);
    }

    100% {
      -webkit-transform: scale(1);
      transform: scale(1);
    }
  }

  @keyframes breathing {
    0% {
    -webkit-transform: scale(1);
    -ms-transform: scale(1);
    transform: scale(1);
    }

    50% {
      -webkit-transform: scale(0.9);
      -ms-transform: scale(0.9);
      transform: scale(0.9);
    }

    100% {
      -webkit-transform: scale(1);
      -ms-transform: scale(1);
      transform: scale(1);
    }
  }
</style>
