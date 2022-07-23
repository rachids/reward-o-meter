<script>
  import Thermometer from "./lib/Thermometer.svelte";
  import twitchController from "./controllers/twitchController";

  let queryParams = location.hash;
  twitchController.connect(queryParams);
</script>

<main>
  <div>
    {#if !twitchController.isConnected()}
      <a href="{twitchController.getTwitchAuthUrl()}">Login Twitch</a>
    {:else }
      <Thermometer twitch={twitchController}/>
    {/if}
  </div>
</main>

<style>
  a {
    border: 3px solid #747bff;
    border-radius: 5px;
    padding: 15px;
    color: #c2d7fb;
  }

  a:hover {
    background-color: #747bff;
    color: #000;
  }
</style>
