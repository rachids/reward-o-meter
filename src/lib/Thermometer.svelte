<script>
    import { fade, fly } from 'svelte/transition';
    import {tweened} from "svelte/motion";
    import {onMount} from "svelte";

    export let twitch;

    let score = tweened(0, {
        duration: 2000,
        interpolate: (from, to) => t => Math.round(t*10)
    });
    let dropIsVisible = false;
    let redemptionMessage = '';

    onMount(async () => {
        let client = await twitch.getPubSubClient();
        await client.onRedemption(twitch.getStreamerId(), (message) => {
            // Send an event to trigger animation + register new score
            increment(message);
        });
    })

    const increment = (message) => {
        dropIsVisible = true;
        score.set($score + 10);
        redemptionMessage = `${message.userDisplayName} a chopé ${message.rewardTitle}`;
    }

    const resetDrop = () => {
        const divGlass = document.getElementsByClassName("glass")[0];
        const divLiquid = document.getElementsByClassName("liquid")[0];
        const root = document.querySelector(":root");
        let amountInPercentage = 10;
        dropIsVisible = false;

        // on ajoute dans le thermomètre
        const calcPourcent = (amountInPercentage * divGlass.clientHeight) / 100;
        const totalToAdd = divLiquid.clientHeight + calcPourcent;
        root.style.setProperty("--liquid-height", totalToAdd + "px");
    };
</script>

<div class="glass">
    <div class="liquid">
        {#if dropIsVisible}
            <div id="drop"
                 in:fly={{y: -300, duration: 4000}}
                 on:introend={resetDrop}
                 out:fade
            >🩸</div>
        {/if}
    </div>
    <div class="label">
        OBJECTIF:
        <span id="score">{$score}</span>
        %
    </div>
</div>
<span class="redemption-message" in:fade out:fly>{redemptionMessage}</span>

<style>
    :root {
        --glass-width: 40px;
        --font-size-drop: 20px;
        --glass-height: 300px;
        --liquid-height: 30px;
        --addanimation: 2px;
    }

    body {
        background-color: transparent;
    }

    .glass {
        width: var(--glass-width);
        height: var(--glass-height);
        border: 3px solid gray;
        border-radius: 0 0 25px 25px;
        border-top: 0;
        display: flex;
        align-items: flex-end;
        position: relative;
        margin: auto;
    }

    .liquid {
        width: 90%;
        height: var(--liquid-height);
        margin-left: 5%;
        margin-bottom: 5%;
        background-color: red;
        overflow: hidden;
        border-radius: 0 0 25px 25px;
        transition: height .5s linear;
    }

    .label {
        width: 300px;
        transform: rotate(-90deg);
        position: absolute;
        left: -78px;
        right: 0;
        bottom: 164px;
        font-family: Verdana, Geneva, Tahoma, sans-serif;
    }

    /* Animation goute  */
    #drop {
        font-size: var(--font-size-drop);
        position: absolute;
        z-index: 2;
        top: 250px;
        left: 10px;
    }
</style>
