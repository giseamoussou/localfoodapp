<script lang="ts">
    import type { PageData } from './$types';
    
    export let data: PageData;
</script>


<center class="flex flex-col justify-center content-center items-center h-1/2">
    
    {#if data.success}
        <kkiapay-widget 
            key="33cfa930242211efa9251f24b794956e"
            amount="{data.amount}"
            position="center"
            sandbox={true}
            email="{data.email}"
            name="{data.fullname}"
            data="{data.fullname} - {data.email}"
            callback={data.callbackUrl}>
        </kkiapay-widget>
    {:else}
        <div>
            Le lien de paiement a expiré ou les paramètres sont invalides, veuillez réessayer
        </div>
    {/if}

</center>
