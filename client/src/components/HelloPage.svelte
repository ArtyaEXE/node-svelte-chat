<script>
  import Login from "./Login.svelte";
  import Signup from "./Signup.svelte";

  let showSignup = false;
  let showLogin = false;

  function showSignupComponent() {
    showSignup = true;
    showLogin = false;
  }

  function showLoginComponent() {
    showSignup = false;
    showLogin = true;
  }
</script>

<div class="first-page">
  <h1>Talkify - Душевный мессенджер</h1>
  <p>
    {#if showLogin}
      <button on:click={showSignupComponent}>Создать аккаунт</button>
    {:else}
      <button on:click={showLoginComponent}>Войти</button>
    {/if}
  </p>
  {#if showSignup}
    <Signup />
  {/if}

  {#if showLogin}
    <Login />
  {/if}
</div>

<style>
  h1 {
    margin-bottom: 10px;
  }

  .first-page {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    height: 100%;
    text-align: center;
    color: #f5f5f5;
  }

  button {
    background-color: #5eb5f7;
    border: 1px solid transparent;
    border-radius: 10px;
    text-align: center;
    margin: 0;
    color: #fff3fb;
    padding: 7px;
  }
</style>
