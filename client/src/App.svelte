<script>
  import { Router, Link, Route } from "svelte-routing";
  import { onMount } from "svelte";
  import { userStore } from "./store/userStore";
  import HelloPage from "./components/HelloPage.svelte";
  import MainPage from "./components/MainPage.svelte";
  import Account from "./components/Account.svelte";

  export const url = "/";

  let isAuthenticated = false;
  let isVisible = false;
  let name = "";

  async function createRoom() {
    const response = await fetch("http://localhost:3000/rooms/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ name }),
    });
    if (response.ok) {
      const room = await response.json();
      name = "";
      isVisible = false;
    }
    getRooms;
  }

  function logout() {
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    fetch("http://localhost:3000/auth/logout", {
      method: "POST",
      headers: headers,
    }).then((response) => {
      if (response.ok) {
        userStore.set(null);
        localStorage.removeItem("token");
        isAuthenticated = false;
        window.location = "/";
      } else {
        response.json().then((data) => {
          console.error(data);
        });
      }
    });
  }

  async function getRooms() {
    const response = await fetch("http://localhost:3000/rooms/collection", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (response.ok) {
      roomList = await response.json();
      isLoading = false;
    } else {
      const { error } = await response.json();
      console.error(error);
    }
  }

  onMount(async () => {
    const token = localStorage.getItem("token");
    isAuthenticated = !!token;
  });
</script>

{#if isAuthenticated}
  <header>
    {#if isVisible}
      <div class="create-room">
        <form on:submit|preventDefault={createRoom}>
          <input
            type="text"
            required
            bind:value={name}
            placeholder="Название комнаты"
          />
          <button type="submit">Создать</button>
        </form>
      </div>
    {:else}
      <button on:click={() => (isVisible = true)}>Создать комнату</button>
    {/if}
    <button class="logout-btn" on:click={logout}
      ><i class="fa-solid fa-right-from-bracket" /></button
    >
  </header>
{/if}

<main>
  {#if isAuthenticated}
    <Router>
      <Route path="/" component={MainPage} />
    </Router>
  {:else}
    <Router>
      <Route path="/" component={HelloPage} />
    </Router>
  {/if}
</main>

<style>
  main {
    position: relative;
    width: 100%;
    height: 100%;
  }

  header {
    padding: 15px 10px;
    background-color: #0e1621;
    display: flex;
    justify-content: end;
    align-items: center;
    gap: 50px;
  }

  .logout-btn {
    background-color: rgb(255, 0, 0);
  }

  button {
    font-size: 18px;
  }

  form {
    flex-direction: row;
  }
</style>
