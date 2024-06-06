<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
    import type { PageData } from './$types';
    
    export let data: PageData;

    let widget: HTMLElement | null = null;

    function openWidget(){

        

    }

    onMount(() => {
        
        if(browser){
            const btn = document.getElementsByTagName('button')
            console.log(btn)
        }
    })
</script>


<kkiapay-widget amount={1500} bind:this={widget}
    key="33cfa930242211efa9251f24b794956e"
    position="center"
    sandbox={true}
    data="nothing"
    callback="">
</kkiapay-widget>