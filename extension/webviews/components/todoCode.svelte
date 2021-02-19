<script lang="ts">
    export let code : string; // prop passes to the component
    let copied = false;

    function copy() {
        if (code === "") return;
        copied = true;

        navigator.clipboard.writeText(code).catch( (err) => {
            console.error('Async: Could not copy text: ', err);
        });

        setTimeout(() => {
            copied = false;
        }, 2500);
    }
</script>

<div class="container" class:copied={copied}>
    <p>Share your todolist with this code!</p>
    <div class="code">{code || 'Loading...'}</div>
    <div class="copy" on:click={copy}>{copied ? 'copied' : 'copy'}</div>
</div>

<style>

p {
  margin-bottom: 10px;
}

.container {
  display: flex;
  flex-wrap: wrap;
}

.container div {
  padding: 5px 10px 5px 10px;
  margin-right: 8px;
  border: 1px solid var(--vscode-foreground);
  border-radius: 5px;
  font-family: monospace;
  transition: all 0.1s ease-in-out;
  font-size: small;
  margin-bottom: 5px;
}

.copy {
  background-color: inherit;
  color: inherit;
}

.copy:hover {
  color: var(--vscode-textLink-foreground);
  border-color: var(--vscode-textLink-foreground);
  cursor: pointer;
}

.copied .code {
    outline: none;
    color: var(--vscode-textLink-foreground);
    border-color: var(--vscode-textLink-foreground);
}

.copied .copy {
    outline: none;
    color: var(--vscode-textLink-foreground);
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



