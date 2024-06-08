<script lang="ts">
	import { invalidateAll } from '$app/navigation';
    import type { PageData } from './$types';
    import * as Table from "$lib/components/ui/table"
    import Badge from '$lib/components/ui/badge/badge.svelte';
    import Icon from '@iconify/svelte';
    import Button from '$lib/components/ui/button/button.svelte';


    export let data: PageData;
</script>

<div class="flex flex-col w-full px-5 py-3">

    <div
        class="flex flex-row content-center items-center justify-between border shadow-md bg-gray-50 border-gray-300 px-5 py-3">
        <div class="flex flex-row content-center items-center justify-start space-x-2">
            <Icon icon="arcticons:foodora" color="darkorange" height={35} width={35} />
            <span class="block text-2xl">Commandes</span>
        </div>

        <div>
            <div class="flex flex-col w-full content-center items-start justify-center">
                <Button on:click={() => invalidateAll()} class="px-7 py-5 space-x-2">
                    <Icon icon="icon-park-outline:refresh" color="white" height={15} width={15} />
                    <span>Actualiser</span>
                </Button>
            </div>
        </div>
    </div>


    <div class="w-full mt-10">
        {#await data.commandes}
            <div class="flex text-center w-full flex-col justify-center items-center content-center space-y-3">
                <Icon icon='eos-icons:loading' class="animate-spin" height={35} width={35} />
                <div>Veuillez patienter</div>
            </div>
        {:then commandes}
            <Table.Root>
                <Table.Header>
                    <Table.Row>
                        <Table.Head class="w-[185px]">Référence</Table.Head>
                        <Table.Head>Statut</Table.Head>
                        <Table.Head>Methode</Table.Head>
                        <Table.Head>Créée le</Table.Head>
                        <Table.Head class="text-right">Montant</Table.Head>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {#each commandes as commande}
                    <Table.Row>
                        <Table.Cell class="font-medium">{commande.ref}</Table.Cell>
                        <Table.Cell>
                            {#if commande.status == "paid"}
                            <Badge class="bg-green-500">Payé</Badge>
                            {:else if commande.createdOn < (new Date(Date.now() - 24 * 60 * 60 * 1000))} <Badge
                                class="bg-red-500">Rejeté</Badge>
                                {:else}
                                <Badge class="bg-gray-500">Non Payé</Badge>
                                {/if}
                        </Table.Cell>
                        <Table.Cell>Kkiapay <Badge class="bg-blue-500">Momo</Badge>
                        </Table.Cell>
                        <Table.Cell>{commande.createdOn.toLocaleString('fr')}</Table.Cell>
                        <Table.Cell class="text-right italic">{commande.amount}</Table.Cell>
                    </Table.Row>
                    {:else}
                    <div>Aucune Commande</div>
                    {/each}
                </Table.Body>
            </Table.Root>
        {:catch error}
            <div class="flex text-center w-full flex-row justify-center items-center content-center">
                <div class="text-red-500">Une erreur s'est produite lors de la récupération des commandes</div>
            </div>
        {/await}
    </div>

</div>
