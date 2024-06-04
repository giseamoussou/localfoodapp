<script lang="ts">
    import Button from '$lib/components/ui/button/button.svelte';
    import Icon from '@iconify/svelte';
    import type { PageData } from './$types';
    
    export let data: PageData;
</script>

<div class="flex flex-col w-full px-5 py-3">

    <div class="flex flex-row content-center items-center justify-between border shadow-md bg-gray-50 border-gray-300 px-5 py-3">
       <div class="flex flex-row content-center items-center justify-start space-x-2">
            <Icon icon="material-symbols:admin-panel-settings-rounded" color="indigo" height={35} width={35} />
            <span class="block text-2xl">Admins</span>
       </div>

        <div>
            <div class="flex flex-col w-full content-center items-start justify-center">
                <Button class="px-7 py-5 space-x-2">
                    <Icon icon="icon-park-outline:send-email" color="white" height={15} width={15} />
                    <span>Inviter</span>
                </Button>
            </div>
        </div>
    </div>

    <div class="mt-10 w-full text-center">
        <span class="text-slate-600 text-3xl">Aucun Paramètre Ici</span>
    </div>
    
</div>