<script lang="ts">
    import Icon from '@iconify/svelte';
    import type { LayoutData } from './$types';
    import DashboardMenuItem from '$lib/components/DashboardMenuItem/DashboardMenuItem.svelte';    
    import { Toaster } from '$lib/components/ui/sonner';


    export let data: LayoutData;
</script>


<div class="w-full h-full flex flex-row ">

    <div class="h-full w-36">
        <div class="w-full h-full py-6 px-2">
            <div class="shadow-sm rounded-lg border-gray-300 bg-gray-50 h-full w-full p-3 space-y-2">
                
                <DashboardMenuItem link="/dashboard" iconName="mage:dashboard-bar-notification" title="Dashboard" />
                
                <DashboardMenuItem link="/dashboard/plats" iconName="ion:fast-food-sharp" title="Plats" />
                
                <DashboardMenuItem link="/dashboard/commandes" iconName="arcticons:foodora" title="Commandes" />
                
                <DashboardMenuItem link="/dashboard/restaurants" iconName="maki:restaurant-bbq" title="Restaurants" />
                
                <DashboardMenuItem link="/dashboard/utilisateurs" iconName="fa-solid:users-cog" title="Utilisateurs" />
                
                <DashboardMenuItem link="/dashboard/admins" iconName="material-symbols:admin-panel-settings-rounded" title="Admins" />
                
                <DashboardMenuItem link="/dashboard/settings" iconName="ri:settings-4-fill" title="Configuration" />
            
            </div>
        </div>
    </div>
    
    <main class="flex flex-1 p-5 h-auto overflow-y-scroll">
        <div class="flex h-fit w-full border border-slate-300 shadow-sm">
            <slot />
        </div>
    </main>

    <!-- <Toaster prop /> -->

</div>