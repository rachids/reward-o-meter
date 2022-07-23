<script>

  import Thermometer from "./lib/Thermometer.svelte";
  /*import Twitch from './classes/Twitch';


  const twitch = new Twitch();

  let queryParams = location.hash;

  twitch.setAccessToken(queryParams);*/
</script>

<main>
  <div>
    <!--{#if !twitch.isConnected()}
      <a href="{twitch.generateUrl()}">Login Twitch</a>
    {:else }
      <Thermometer client="{twitch}"/>
    {/if}-->
    <Thermometer />
  </div>
</main>

<style>

</style>
