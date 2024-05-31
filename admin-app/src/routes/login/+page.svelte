<script lang="ts">
    import Button from '$lib/components/ui/button/button.svelte';
    import { fade } from 'svelte/transition';
    import type {
    ActionData,
        PageData
    } from './$types';
    import Icon from '@iconify/svelte'

    export let data: PageData;
    export let form: { success: boolean, isBadCredentials: boolean, errorMessage: string } | null;

</script>

<div class="w-full h-full flex flex-col content-center items-center justify-center">

    <form method="post" action="?/login" class="shadow-sm shadow-[tomato] border rounded-md bg-white border-gray-50 w-96 h-auto py-5 px-4 space-y-6 flex flex-col">

        <div class="text-center self-center text-[tomato] text-2xl font-medium font-mono flex flex-col">
            <span>Connexion Admin</span>
            <span class="text-blue-900 text-sm">(LocalFood App)</span>
        </div>

        {#if form?.success == false}
            <div class="text-orange-800 text-center">
                {#if form.isBadCredentials}
                    <div class="flex flex-row space-x-2 items-center justify-center content-center">
                        <Icon icon="hugeicons:alert-02" />
                        <span>Informations incorrectes</span>
                    </div>
                {:else}
                    <div>Une erreur s'est produite {form.errorMessage}</div>
                {/if}
            </div>
        {/if}

        <div class="flex flex-col flex-1 space-y-5 w-full h-full content-center justify-center items-center">

            <div class="flex flex-col w-full space-y-1">
                <label for="email">Email ou Nom d'utilisateur</label>
                <input type="email" name="email" id="email" class="form-input" placeholder="Email ou Username">
            </div>

            <div class="flex flex-col w-full space-y-1">
                <label for="password">Mot de Passe</label>
                <input type="password" name="password" id="password" class="form-input" placeholder="Mot de passe">
            </div>

            <div class="flex flex-col w-full space-y-1 px-10 h-full">
                <Button type="submit" class="bg-[tomato] hover:bg-red-600 transition-colors duration-300 py-5 mt-auto mb-0">
                    <div class="flex flex-row space-x-2 items-start content-center justify-center">
                        <Icon icon="solar:shield-user-broken" class="text-white" width={30} height={30} />
                        <span class="text-xl">Connexion Sécurisée</span>
                    </div>
                </Button>
            </div>

        </div>

    </form>

</div>
