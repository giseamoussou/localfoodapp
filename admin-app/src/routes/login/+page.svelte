<script lang="ts">
    import Button from '$lib/components/ui/button/button.svelte';
import type { PageData } from './$types';
    import Icon from '@iconify/svelte'
    
    export let data: PageData;
</script>


<div class="w-full h-full flex flex-col content-center items-center justify-center">
    
    <div class="shadow-sm shadow-[tomato] border rounded-md bg-white border-gray-50 w-96 h-[340px] py-5 px-4 space-y-6 flex flex-col">

        <div class="text-center self-center text-[tomato] text-2xl font-medium font-mono flex flex-col">
            <span>Connexion Admin</span>
            <span class="text-blue-900 text-sm">(LocalFood App)</span>
        </div>

        <div class="flex flex-col flex-1 space-y-5 w-full h-full content-center justify-center items-center">
            
            <div class="flex flex-col w-full space-y-1">
                <label for="">Email ou Nom d'utilisateur</label>
                <input type="text" class="form-input" placeholder="Email ou Username">
            </div>

            <div class="flex flex-col w-full space-y-1">
                <label for="">Mot de Passe</label>
                <input type="text" class="form-input" placeholder="Mot de passe">
            </div>


            <div class="flex flex-col w-full space-y-1 px-10 h-full">
                <Button class="bg-[tomato] hover:bg-red-600 transition-colors duration-300 py-5 mt-auto mb-0">
                    <div class="flex flex-row space-x-2 items-start content-center justify-center">                        
                        <Icon icon="solar:shield-user-broken" class="text-white" width={30} height={30} />
                        <span class="text-xl">Connexion Sécurisée</span>
                    </div>
                </Button>
            </div>

        </div>

    </div>

</div>
