<script lang="ts">
    import { page } from '$app/stores';
    import { onMount } from 'svelte';
    import type { PageData } from './$types';
    import Icon from '@iconify/svelte';
    
    export let data: PageData;

    onMount(() => {
        // Empêcher l'utilisateur de naviguer en arrière en définissant la page actuelle comme première page
        history.replaceState(null, '', location.href);
    })
</script>


<center class="flex flex-col justify-center content-center items-center h-1/2">
    <div class="flex flex-col space-y-3 justify-center content-center items-center">
        {#if data.success}
            <Icon icon="ic:baseline-check-circle" color="green" height={100} width={100} />
            <div class="text-xl text-slate-700">Le paiement a été enregistré avec succès, La commande vous sera livrée sous peu</div>
        {:else} 
            <Icon icon="ic:baseline-error" class='text-red-800' height={100} width={100} />
            <div class="text-slate-800">Une erreur est survenue lors de la validation de votre paiement, veuillez réessayer ou contacter l'assistance</div>
        {/if}
        <div class="text-black">Vous pouvez à présent fermer cette page</div>
    </div>
</center>
