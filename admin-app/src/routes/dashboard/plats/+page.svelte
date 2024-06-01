<script lang="ts">
    import Icon from '@iconify/svelte';
import type { PageData } from './$types';
    import Button from '$lib/components/ui/button/button.svelte';
    import * as Table from "$lib/components/ui/table"
    

    export let data: PageData;
</script>

<div class="flex flex-col w-full px-5 py-3 space-y-5">

    <div class="flex flex-row content-center items-center space-x-2 border border-gray-300 px-5 py-3">
        <Icon icon="ion:fast-food-sharp" color="darkslateblue" height={35} width={35} />
        <span class="block text-2xl">Plats &<span class="text-[tomato]">&nbsp;Repas</span></span>
    </div>

    <div class="flex flex-col w-full content-center items-start justify-center">
        <Button class="px-7 py-5 bg-[tomato] hover:bg-red-600">
            <Icon icon="material-symbols:add" color="white" height={20} width={20} />
            <span>Ajouter</span>
        </Button>
    </div>

    <div class="flex flew-row flex-wrap">
        
    </div>
</div>

