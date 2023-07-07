<script>
  import { onMount, afterUpdate } from "svelte";
  import { Link } from "svelte-routing";

  export let roomId;
  let messageList = [];
  let newMessage = "";

  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    return date.toLocaleDateString("ru-RU", options);
  }

  async function sendMessage() {
    const response = await fetch(`/messages/create/${roomId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ content: newMessage }),
    });
    if (response.ok) {
      newMessage = "";
      await getMessage();
    } else {
      const { error } = await response.json();
      console.error(error);
    }
  }

  async function getMessage() {
    const response = await fetch(`/messages/get/${roomId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (response.ok) {
      messageList = await response.json();
    } else {
      const { error } = await response.json();
      console.error(error);
    }
  }

  onMount(getMessage);
  setInterval(getMessage, 3000);
</script>

<div class="message-block">
  <div class="messages">
    {#if messageList.length === 0}
      <p>Сообщений пока нет! Будьте первым!</p>
    {:else}
      <ul>
        {#each messageList as message}
          <li class="message">
            <span class="sender-name">{message.sender.username}</span>
            <span class="time">{formatDate(message.createdAt)}</span>
            <span class="content">{message.content}</span>
          </li>
        {/each}
      </ul>
    {/if}
  </div>
  <div class="form">
    <form class="message-form" on:submit|preventDefault={sendMessage}>
      <input
        class="input"
        type="text"
        bind:value={newMessage}
        required
        placeholder="Введите сообщение..."
      />
      <button class="submit" type="submit">Отправить</button>
    </form>
  </div>
</div>

<style>
  .message-block {
    padding: 30px;
  }
  .messages {
    height: 75%;
    overflow-y: auto;
  }

  .form {
    padding: 10px;
    padding-bottom: 30px;
    background-color: #17212b;
    position: fixed;
    bottom: 0;
    right: 0;
  }

  .message-form {
    display: flex;
    flex-direction: row;
  }

  .message-form input {
    width: 58vw;
    border: 1px solid #5eb5f7;
  }
</style>
