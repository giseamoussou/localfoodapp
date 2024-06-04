<script lang="ts">
	import ConfirmationPrompt from '$lib/components/ConfirmationPrompt/ConfirmationPrompt.svelte';
    import Icon from '@iconify/svelte';
    import type { PageData } from './$types';
    import Button from '$lib/components/ui/button/button.svelte';
    import * as Table from "$lib/components/ui/table"
    import * as AlertDialog from "$lib/components/ui/alert-dialog"
    import { Badge } from "$lib/components/ui/badge"
    import { toast } from 'svelte-sonner';
    import { invalidateAll } from '$app/navigation';
    import * as Dialog from "$lib/components/ui/dialog/index.js";
    import { Input } from "$lib/components/ui/input/index.js";
    import { Label } from "$lib/components/ui/label/index.js";
    import SelectionCombo from '$lib/components/SelectionCombo/SelectionCombo.svelte';

    export let data: PageData;
    
    
    let platAddData = {
        name: '',
        author: '',
        restauratriceId: '',
        imageFileName: '',
        pageCount: '',
        pricingModel: '',
        price: '',
        createdAt: ''
    }
    let isDeletionAlertOpened = false;
    let isPlatAddDialogOpened = false;
    let selectedPlatId: number | null = null;

    async function deletePlat(id: number | null){

        if(id){
            const deletionResponse = await data.supabase.from('plat').delete({
                count: 'exact'
            }).eq('id', id);
    
            if(!deletionResponse.error){
                if(deletionResponse){
                    if(deletionResponse.count! > 0){
                        invalidateAll();
                        toast("Plat Supprimé Avec succès");
                    }
                }
            }
    
        }

        selectedPlatId = null;
    }
    
    function confirmDeletePlat(id: number){
        isDeletionAlertOpened = true;
        selectedPlatId = id;
    }

    async function addPlat(){

    }

    $: isDeletionAlertOpened = isDeletionAlertOpened;
</script>

<ConfirmationPrompt action={() => { deletePlat(selectedPlatId) }} bind:isOpened={isDeletionAlertOpened} cancelText="Annuler" okText="Confirmer"
    descriptionText="Voulez-vous vraiment supprimer ce Plat?" questionText="Supprimer ce Plat ?" />

<div class="flex flex-col w-full px-5 py-3">

    <div class="flex flex-row content-center items-center justify-between border shadow-md bg-gray-50 border-gray-300 px-5 py-3">
       <div class="flex flex-row content-center items-center justify-start space-x-2">
            <Icon icon="ion:fast-food-sharp" color="darkslateblue" height={35} width={35} />
            <span class="block text-2xl">Plats &<span class="text-[tomato]">&nbsp;Repas</span></span>
       </div>

        <div>
            <div class="flex flex-col w-full content-center items-start justify-center">
                <Button on:click={() => { isPlatAddDialogOpened = true }} class="px-7 py-5 bg-[tomato] hover:bg-red-600">
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

                {#each plats as plat,i (plat.id)}
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
                                <button type="button" class="btn text-white text-xs hover:border focus:border border-blue-600 transition-all">
                                    <Icon icon="uil:edit" height={20} width={20} class="text-blue-600" />
                                </button>
                                <button on:click={() => confirmDeletePlat(plat.id)} type="button" class="btn text-white text-xs hover:border focus:border border-red-600 transition-all">
                                    <Icon icon="fluent:delete-32-filled" height={20} width={20} class="text-red-600" />
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

<div>
    <Dialog.Root bind:open={isPlatAddDialogOpened}>
        
        <Dialog.Content class="sm:max-w-[425px] min-w-[600px]">
            <Dialog.Header>
                <Dialog.Title class="mb-4 text-center">Ajouter un Mémoire</Dialog.Title>
                <Dialog.Description>
                    Renseignez les informations d'un plat donné
                </Dialog.Description>
            </Dialog.Header>

            {#await data.restaurantsTask}
                <div class="text-center w-full flex flex-row justify-center items-center content-center">
                    <Icon icon='eos-icons:loading' height={35} width={35} class="animate-spin self-center" />
                </div>
            {:then { data: restaurants }}
                <div class="flex flex-col space-y-2">

                    <div class="items-center flex flex-row space-x-4">
                        <Label for="book-file" class="text-left w-24">Fichier</Label>
                        <Input id="book-file" bind:value={platAddData.imageFileName} accept="image/*" type="file" class="" />
                    </div>

                    <div class="items-center flex w-full flex-row space-x-4">
                        <Label for="universite" class="text-left w-24">Restauratrice</Label>
                        <div class="w-full">
                           {#if restaurants}
                            <SelectionCombo bind:value={platAddData.restauratriceId} dataArray={restaurants.map((u)=> { return { value: u.id.toString(), label: `${u.id}- ${u.nom}` } })} displayText="Sélectionner Restauratrice" noDataText="Aucune Restauratrice trouvée" />
                           {:else}
                                <SelectionCombo bind:value={platAddData.restauratriceId} dataArray={[]} displayText="Sélectionner Restauratrice" noDataText="Aucune Restauratrice trouvée" />
                           {/if}
                        </div>
                    </div>

                    <!-- <div class="items-center flex flex-row w-full space-x-4 content-evenly py-3 my-3 border border-gray-300 px-3 rounded-md">
                            <div class="w-full flex flex-col space-y-2">
                                <Label for="title" class="text-center w-full">Cycle</Label>
                                <div class="w-full">
                                    <SelectionCombo dataArray={cycles.map((u) => { return { value: u.id.toString(), label: u.name } })} displayText="Sélection Cycle" noDataText="Aucun Cycle trouvé" />
                                </div>
                            </div>
                            <div class="w-full flex flex-col  space-y-2">
                                <Label for="title" class="text-center w-full">Filière</Label>
                                <div class="w-full">
                                    <SelectionCombo dataArray={filieres.map((u) => { return { value: u.id.toString(), label: u.name } })} displayText="Sélection Filière" noDataText="Aucune Filière trouvée" />
                                </div>
                            </div>
                        </div> -->

                    <div class="items-center flex flex-row space-x-4">
                        <Label for="title" class="text-left w-24">Thème</Label>
                        <Input id="title" placeholder="Thème du Mémoire" bind:value={platAddData.name} class="" />
                    </div>
                    <div class="items-center flex flex-row space-x-4">
                        <Label for="author" class="text-left w-24">Auteur</Label>
                        <Input id="author" placeholder="Auteur" bind:value={platAddData.author} class="" />
                    </div>
                    <div class="items-center flex flex-row space-x-4">
                        <Label for="overseer" class="text-left w-24">Superviseur</Label>
                        <Input id="overseer" placeholder="Nom du Superviseur" bind:value={platAddData.overseerName} class="" />
                    </div>
                </div>
            {:catch error}
                <div class="text-center flex flex-col">
                    <span>Impossible de Charger les Données nécessairees</span>
                </div>
            {/await}
            <Dialog.Footer>
                <Button on:click={()=> { addPlat(); }} class="bg-teal-800">
                    <div class="flex flex-row content-center items-center justify-center space-x-2">
                        <Icon icon="fluent:save-28-filled" height={20} width={20} />
                        <span>Enregister </span>
                    </div>
                </Button>
            </Dialog.Footer>
        </Dialog.Content>
    </Dialog.Root>
</div>