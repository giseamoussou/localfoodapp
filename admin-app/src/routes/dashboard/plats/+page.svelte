<script lang="ts">
	import ConfirmationPrompt from '$lib/components/ConfirmationPrompt/ConfirmationPrompt.svelte';
    import Icon from '@iconify/svelte';
    import type { PageData } from './$types';
    import Button from '$lib/components/ui/button/button.svelte';
    import * as Table from "$lib/components/ui/table"
    import * as AlertDialog from "$lib/components/ui/alert-dialog"
    import { Badge } from "$lib/components/ui/badge"
    

    export let data: PageData;
    let isDeletionAlertOpened = false;

    async function deletePlat(id: number){

        isDeletionAlertOpened = true;

        // const deletionResponse = await data.supabase.from('plat').delete({
        //     count: 'exact'
        // }).eq('id', id);

        // if(!deletionResponse.error){
        //     if(deletionResponse){
        //         if(deletionResponse.count! > 0){
        //             alert('Plat Supprimé');   
        //         }
        //     }
        // }
    }

    $: isDeletionAlertOpened = isDeletionAlertOpened;
</script>

<ConfirmationPrompt action={() => {  }} bind:isOpened={isDeletionAlertOpened} cancelText="Annuler" okText="Confirmer"
    descriptionText="Voulez-vous vraiment supprimer ce Mémoire?" questionText="Supprimer ce mémoire" />

<div class="flex flex-col w-full px-5 py-3">

    <div class="flex flex-row content-center items-center justify-between border shadow-md bg-gray-50 border-gray-300 px-5 py-3">
       <div class="flex flex-row content-center items-center justify-start space-x-2">
            <Icon icon="ion:fast-food-sharp" color="darkslateblue" height={35} width={35} />
            <span class="block text-2xl">Plats &<span class="text-[tomato]">&nbsp;Repas</span></span>
       </div>

        <div>
            <div class="flex flex-col w-full content-center items-start justify-center">
                <Button class="px-7 py-5 bg-[tomato] hover:bg-red-600">
                    <Icon icon="material-symbols:add" color="white" height={20} width={20} />
                    <span>Ajouter</span>
                </Button>
            </div>
        </div>
    </div>

    
    <div class="flex flew-row flex-wrap mt-10">
        
        {#await data.platsTask}
            <div class="flex text-center w-full flex-row justify-center items-center content-center">
                <Icon icon="eos-icons:loading" class="self-center text-red-700" height={40} width={40} />
            </div>
        {:then { data: plats }}
            {#if plats}
                {#each plats as plat}
                
                    <div class="flex flex-col w-56 border shadow-sm bg-gray-50 hover:shadow-red-400 hover:shadow-md transition-all duration-500 space-y-2 rounded-t-md rounded-b-sm mt-8 mx-3">
                        <img src="https://via.placeholder.com/300x300" alt="plat" class="h-32 rounded-t-md" />
                        <div class="px-1 space-y-2 flex flex-col">
                            <div class="text-lg text-center italic">
                                {plat.nom}
                            </div>
                            <div class="flex flex-row content-center justify-around items-center">
                                <Badge class="px-2 py-0.5 bg-[tomato]">{plat.prix} fr</Badge>
                                <Badge class="px-2 py-0.5">Qte: {plat.qte}</Badge>
                            </div>
                        </div>
                        <div class="border-t border-t-gray-400 py-2 rounded-sm border border-gray-400">
                            <div class="flex flex-row content-center justify-center items-center px-2 space-x-1">
                                <button class="btn text-white text-xs hover:border focus:border border-blue-600 transition-all">
                                    <Icon icon="uil:edit" height={20} width={20} class="text-blue-600" />
                                </button>
                                <button class="btn text-white text-xs hover:border focus:border border-red-600 transition-all">
                                    <Icon on:click={() => deletePlat(plat.id)} icon="fluent:delete-32-filled" height={20} width={20} class="text-red-600" />
                                </button>
                            </div>
                        </div>
                    </div>
                {:else}
                    <div class="text-center text-2xl text-slate-800 w-full flex flex-col space-y-8">
                        <Icon icon="hugeicons:file-not-found" class="self-center text-red-700" height={80} width={80} />
                        <span>
                            Aucun Plat Enregistré
                        </span>
                    </div>
                {/each}
            {/if}
        {:catch error}
            <!-- data.platsTask was rejected -->
        {/await}

       

    </div>
</div>
