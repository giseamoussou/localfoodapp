<script lang="ts">
    import type { PageData } from './$types';
    
    export let data: PageData;
</script>


<center class="flex flex-col justify-center content-center items-center h-1/2">
    
    {#if data.success}
        <kkiapay-widget amount={1500}
            key="33cfa930242211efa9251f24b794956e"
            position="center"
            sandbox={true}
            data="nothing"
            callback="">
        </kkiapay-widget>
    {:else}
        <div>
            Le lien de paiement a expiré ou les paramètres sont invalides, veuillez réessayer
        </div>
    {/if}

</center>
