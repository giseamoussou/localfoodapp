<script lang="ts">
    import type { PageData } from './$types';
    
    export let data: PageData;
</script>


<center class="flex flex-col justify-center content-center items-center h-1/2">
    <div>
        {#if data.success}
            <div>Le paiement a été enregitré avec succès, La commande vous sera livrée sous peu</div>
        {:else}
            <div>Une erreur est survenue lors de la validation de votre paiement, veuillez réessayer ou contacter l'assistance</div>
        {/if}
    </div>
</center>
