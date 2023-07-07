<script>
  import RoomList from "./RoomList.svelte";
  import ChatRoom from "./ChatRoom.svelte";
  import EmptyPage from "./EmptyPage.svelte";
  import { selectedRoomId } from "../store/roomStore";
</script>

<div class="container">
  <RoomList onSelectRoom={(roomId) => selectedRoomId.set(roomId)} />
  {#if $selectedRoomId !== null}
    <ChatRoom roomId={$selectedRoomId} />
  {:else}
    <EmptyPage />
  {/if}
</div>

<style>
  .container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
  }
</style>
