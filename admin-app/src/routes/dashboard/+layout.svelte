<script lang="ts">
    import Icon from '@iconify/svelte';
import type { LayoutData } from './$types';
    
    export let data: LayoutData;
</script>


<div class="w-full h-full flex flex-row bg-fuchsia-800">

    <div class="h-full w-40">
        <div class="w-full h-full py-6 px-3">
            <div class="shadow-sm border-gray-300 bg-yellow-50 h-full w-full">
                <div class="w-full h-auto rounded-lg flex flex-col space-y-2 bo">
                    <Icon icon="material-symbols:dashboard-customize-rounded" color="tomato" class="w-8 h-8 mx-auto" />
                    <span class="block text-center">Dashboard</span>
                </div>
            </div>
        </div>
    </div>
    
    <main class="flex flex-1 h-full">
        <slot />
    </main>

</div>