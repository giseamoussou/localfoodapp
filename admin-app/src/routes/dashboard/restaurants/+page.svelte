<script lang="ts">
    import Icon from '@iconify/svelte';
    import type { PageData } from './$types';
    import * as Table from "$lib/components/ui/table/index.js";
    import Button from '$lib/components/ui/button/button.svelte';
    import Badge from '$lib/components/ui/badge/badge.svelte';
    
    export let data: PageData;
</script>

<div class="flex flex-col w-full px-5 py-3">

    <div class="flex flex-row content-center items-center justify-between border shadow-md bg-gray-50 border-gray-300 px-5 py-3">
       <div class="flex flex-row content-center items-center justify-start space-x-2">
            <Icon icon="maki:restaurant-bbq" color="darkgreen" height={35} width={35} />
            <span class="block text-2xl">Restauratrices</span>
       </div>

        <div>
            <div class="flex flex-col w-full content-center items-start justify-center">
                <Button class="px-7 py-5 bg-[tomato] hover:bg-red-600 space-x-1">
                    <Icon icon="fluent:star-add-16-regular" color="white" height={20} width={20} />
                    <span>Inscrire</span>
                </Button>
            </div>
        </div>
    </div>


    <div class="mt-10">
        <div class="flex flex-1">

            {#await data.restaurantsTask}
                <div class="flex text-center w-full flex-row justify-center items-center content-center">
                    <Icon icon='eos-icons:loading' class="animate-spin" height={35} width={35} />
                </div>
            {:then { data: restaurants }}
                <Table.Root>
                    <Table.Header>
                        <Table.Row>
                            <Table.Head class="w-[100px]">Id</Table.Head>
                            <Table.Head>Nom</Table.Head>
                            <Table.Head>Contact</Table.Head>
                            <Table.Head>Spécialités</Table.Head>
                            <Table.Head class="text-right">Actions</Table.Head>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {#if restaurants}
                            {#each restaurants as restauratrice,i (restauratrice.id)}
                                <Table.Row>
                                    <Table.Cell class="font-medium">#{restauratrice.id}</Table.Cell>
                                    <Table.Cell>{`${restauratrice.nom} ${restauratrice.prenom}`}</Table.Cell>
                                    <Table.Cell>{`${restauratrice.contact}`}</Table.Cell>
                                    <Table.Cell class="flex flex-wrap flex-row">
                                        {#if restauratrice.specialites}
                                            {#each restauratrice.specialites as specialite}
                                                <Badge class="my-1 mx-1">{specialite}</Badge>
                                            {/each}
                                        {/if}
                                    </Table.Cell>
                                    <Table.Cell class="text-right">
                                        <div>
                                            <Button class="bg-[tomato] hover:bg-red-600">
                                                Infos
                                            </Button>
                                        </div>
                                    </Table.Cell>
                                </Table.Row>
                            {/each}
                        {:else}
                             <!-- else content here -->
                        {/if}
                    </Table.Body>  
                </Table.Root>
            {/await}
            
        </div>
    </div>
</div>