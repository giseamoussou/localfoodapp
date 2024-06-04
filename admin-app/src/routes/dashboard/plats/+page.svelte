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
    import Textarea from '$lib/components/ui/textarea/textarea.svelte';
    import { PUBLIC_SUPABASE_URL } from '$env/static/public';

    export let data: PageData;
    
    let platAddForm: HTMLFormElement | null = null;
    let platImageFormField: HTMLInputElement | null = null;

    let platAddData = {
        restauratriceId: '',
        nom: '',
        prix: 500,
        image: '',
        description: ''
    }
    let isDeletionAlertOpened = false;
    let isPlatAddDialogOpened = false;
    let selectedPlatId: number | null = null;
    let isAddingPlat = false;

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

        let fileName = window.crypto.randomUUID().toString().substring(14).replaceAll('-', '');

        if(platAddForm){

            isAddingPlat = true;

            if(platAddForm.checkValidity()){

                if(platImageFormField){

                    if(platImageFormField.files && platImageFormField.files.length > 0){
                        
                        try {
                            const file = platImageFormField.files[0]
                            const fileExtension = file.name.split('.').pop()

                            const { data: returnData, error } = await data.supabase.storage.from('plats-images').upload(`${fileName}.${fileExtension}`, file);
                            
                            if (error) {
                                alert("Erreur lors de l'upload du fichier :" +  error.message);
                            } else {
                                
                                platAddData.image = returnData.path;

                                //add plat
                                const { data: platAddResponse, error: platAddError } = await data.supabase.from('plat').insert({ prix: platAddData.prix, nom: platAddData.nom, image: platAddData.image, description: platAddData.description, restauratriceId: Number(platAddData.restauratriceId) }, { count: 'exact' }).select("*");
                                if(platAddError){
                                    alert("Erreur lors de l'ajout du plat :" +  platAddError.message);
                                }
                                else if(platAddResponse.length > 0){
                                    invalidateAll();
                                    // alert("Plat ajouté avec succès");
                                    isPlatAddDialogOpened = false;
                                }
                            }
                        } catch (error) {
                            
                        }
                    }
                }
            }
            else {
                alert("Veuillez renseigner tous les champs");
            }

            isAddingPlat = false;
        }

    }

    $: isDeletionAlertOpened = isDeletionAlertOpened;
    $: {
        if(!isPlatAddDialogOpened){
            platAddData = {
                restauratriceId: '',
                nom: '',
                image: '',
                prix: 500,
                description: ''
            }
        }
    }
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
                        <img src={`${PUBLIC_SUPABASE_URL}/storage/v1/object/public/plats-images/${plat.image}`} alt="plat" class="h-32 rounded-t-md" />
                        <div class="px-1 space-y-2 flex flex-col">
                            <div class="text-lg text-center italic">
                                {plat.nom}
                            </div>
                            <div class="flex flex-row content-center justify-around items-center">
                                <Badge class="px-2 py-0.5 bg-[tomato]">{plat.prix} fr</Badge>
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
            <div class="text-center w-full text-red-600">
                Une erreur s'est produite
            </div>
        {/await}

    </div>
</div>

<div>
    <Dialog.Root bind:open={isPlatAddDialogOpened} closeOnOutsideClick={false}>
        
        <Dialog.Content class="sm:max-w-[425px] min-w-[600px]">
            <Dialog.Header>
                <Dialog.Title class="mb-4 text-center">Ajouter un nouveau Plat</Dialog.Title>
            </Dialog.Header>

            {#if !isAddingPlat}
                 {#await data.restaurantsTask}
                     <div class="text-center w-full flex flex-row justify-center items-center content-center">
                         <Icon icon='eos-icons:loading' height={35} width={35} class="animate-spin self-center" />
                     </div>
                 {:then { data: restaurants }}
                     <form bind:this={platAddForm} class="flex flex-col space-y-3">
     
                         <div class="items-center flex flex-row space-x-4">
                             <Label for="plat-image" class="text-left w-28">Fichier</Label>
                             <input id="plat-image" required bind:this={platImageFormField} placeholder="Ajoutez un Visuel pour le Plat" accept=".jpg, .jpeg, .png" type="file" class="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50" />
                         </div>
     
                         <div class="items-center flex w-full flex-row space-x-4">
                             <Label for="restauratrice" class="text-left w-28">Restauratrice</Label>
                             <div class="w-full">
                                {#if restaurants}
                                     <SelectionCombo bind:value={platAddData.restauratriceId} dataArray={restaurants.map((u)=> { return { value: u.id.toString(), label: `${u.id}- ${u.nom}` } })} displayText="Sélectionner Restauratrice" noDataText="Aucune Restauratrice trouvée" />
                                {:else}
                                     <SelectionCombo bind:value={platAddData.restauratriceId} dataArray={[]} displayText="Sélectionner Restauratrice" noDataText="Aucune Restauratrice trouvée" />
                                {/if}
                             </div>
                         </div>
     
                         <div class="items-center flex flex-row space-x-4">
                             <Label for="name" class="text-left w-28">Nom</Label>
                             <Input id="name" type="text" required minlength={3} maxlength={512} placeholder="Nom du Plat" bind:value={platAddData.nom} class="" />
                         </div>
                         <div class="items-center flex flex-row space-x-4">
                             <Label for="price" class="text-left w-28">Prix</Label>
                             <Input id="price" type="number" required step={1} min={200} max={1000000} placeholder="Auteur" bind:value={platAddData.prix} class="" />
                         </div>
                         <div class="items-center flex flex-row space-x-4">
                             <Label for="description" class="text-left w-28">Présentation</Label>
                             <Textarea id="description" required minlength={10} maxlength={4096} placeholder="Une brève présentation du plat" bind:value={platAddData.description} class="" />                        
                         </div>
                     </form>
                 {:catch error}
                     <div class="text-center flex flex-col">
                         <span>Impossible de Charger les Données nécessairees</span>
                     </div>
                 {/await}
                 <Dialog.Footer>
                     <Button on:click={()=> { addPlat(); }} class="bg-teal-800">
                         <div class="flex flex-row content-center items-center justify-center space-x-2">
                             <Icon icon="fluent:ribbon-add-20-regular" height={20} width={20} />
                             <span>Ajouter</span>
                         </div>
                     </Button>
                 </Dialog.Footer>
            {:else}
                <div class="flex flex-col justify-center content-center items-center space-x-3">
                    <Icon icon='eos-icons:spinner' height={35} width={35} class="animate-spin self-center" />
                    <span>En cours d'ajout...</span>
                </div>
            {/if}

        </Dialog.Content>
    </Dialog.Root>
</div>
