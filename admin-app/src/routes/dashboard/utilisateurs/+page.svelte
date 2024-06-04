<script lang="ts">
    import Icon from '@iconify/svelte';
    import * as Table from "$lib/components/ui/table/index.js";
    import Button from '$lib/components/ui/button/button.svelte';
    import Badge from '$lib/components/ui/badge/badge.svelte';
    import type { PageData } from './$types';
    
    export let data: PageData;
</script>

<div class="flex flex-col w-full px-5 py-3">

    <div class="flex flex-row content-center items-center justify-between border shadow-md bg-gray-50 border-gray-300 px-5 py-3">
       <div class="flex flex-row content-center items-center justify-start space-x-2">
            <Icon icon="ci:users-group" color="indigo" height={35} width={35} />
            <span class="block text-2xl">Utilisateurs</span>
       </div>

        <div>
            <div class="flex flex-col w-full content-center items-start justify-center">
                <Button class="px-7 py-5 bg-blue-500 hover:bg-blue-700 space-x-2">
                    <Icon icon="icon-park-outline:send-email" color="white" height={15} width={15} />
                    <span>Inviter</span>
                </Button>
            </div>
        </div>
    </div>

    
    <div class="mt-10">
        <div class="flex flex-1">

            {#await data.usersTask}
                <div class="flex text-center w-full flex-row justify-center items-center content-center">
                    <Icon icon='eos-icons:loading' class="animate-spin" height={35} width={35} />
                </div>
            {:then { data: { users } }}
                <Table.Root>
                    <Table.Header>
                        <Table.Row>
                            <!-- <Table.Head class="w-[100px]">Id</Table.Head> -->
                            <Table.Head>Nom</Table.Head>
                            <Table.Head>Adresse e-mail</Table.Head>
                            <Table.Head>Tél.</Table.Head>
                            <Table.Head class="text-right">Actions</Table.Head>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {#if users}
                            {#each users as user,i (user.id)}
                                <Table.Row>
                                    <!-- <Table.Cell class="font-medium">#{user.id}</Table.Cell> -->
                                    <Table.Cell>{user.user_metadata.fullname}</Table.Cell>
                                    <Table.Cell>{user.email}</Table.Cell>
                                    <Table.Cell>{user.user_metadata.phone ? user.user_metadata.phone : 'N/A' }</Table.Cell>
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