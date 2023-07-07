<script>
  import { onMount } from "svelte";
  import { Link } from "svelte-routing";
  import Loader from "./Loader.svelte";
  import { selectedRoomId } from "../store/roomStore";

  let roomList = [];
  let isLoading = true;

  function handleRoomClick(roomId) {
    selectedRoomId.set(roomId);
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

  onMount(getRooms);
  setInterval(getRooms, 10000);
</script>

<div class="rooms">
  {#if isLoading}
    <Loader />
  {:else}
    <ul>
      {#each roomList as room}
        <li class="room">
          <button on:click={() => handleRoomClick(room._id)}>
            {room.name}
          </button>
        </li>
      {/each}
    </ul>
  {/if}
</div>

<style>
  .rooms {
    border: 1px solid #353d47;
    background-color: #202b36;
    min-width: 30%;
    padding: 10px 20px;
  }

  .room {
    padding: 10px 0;
  }

  .room:not(:last-child) {
    border-bottom: 1px solid #0e1621;
  }
</style>
