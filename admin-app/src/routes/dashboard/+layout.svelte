<script lang="ts">
    import Icon from '@iconify/svelte';
import type { LayoutData } from './$types';
    import DashboardMenuItem from '$lib/components/DashboardMenuItem/DashboardMenuItem.svelte';
    
    export let data: LayoutData;
</script>


<div class="w-full h-full flex flex-row ">

    <div class="h-full w-36">
        <div class="w-full h-full py-6 px-2">
            <div class="shadow-sm rounded-lg border-gray-300 bg-yellow-50 h-full w-full p-3 space-y-2">
                
                <DashboardMenuItem iconName="mage:dashboard-bar-notification" title="Dashboard" />
                
                <DashboardMenuItem iconName="ion:fast-food-sharp" title="Plats" />
                
                <DashboardMenuItem iconName="arcticons:foodora" title="Commandes" />
                
                <DashboardMenuItem iconName="fa-solid:users-cog" title="Utilisateurs" />
                
                <DashboardMenuItem iconName="material-symbols:admin-panel-settings-rounded" title="Admins" />
            
            </div>
        </div>
    </div>
    
    <main class="flex flex-1 h-full p-5">
        <div class="flex h-full w-full border border-slate-300 shadow-sm">
            <slot />
        </div>
    </main>

</div>