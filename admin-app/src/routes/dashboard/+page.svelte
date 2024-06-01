<script lang="ts">
    import StatsCard from '$lib/components/StatsCard/StatsCard.svelte';
    import type { PageData } from './$types';
    import { Bar, Pie, Line } from 'svelte-chartjs';

    export let data: PageData;
</script>


<div class="flex flex-col w-full py-5 px-5 space-y-5">

    <div class="flex">
        <span class="block text-2xl">Tableau de Bord<span class="text-[tomato]">&nbsp;Analytique</span></span>
    </div>

    <div class="w-full flex flex-row h-auto space-x-4">

        <div class="flex flex-col space-y-4 p-1 flex-wrap w-80 justify-evenly items-center content-evenly">
           
            <div class="w-full h-28">
                <!-- stats card -->
                <StatsCard title="Plats" total={98} cardIcon="emojione-monotone:pot-of-food" cardIconColor="darkslateblue" variationPercentage={2.6}/>
            </div>
            <div class="w-full h-28">
                <StatsCard title="Commandes" total={181} cardIcon="arcticons:zoho-invoice" cardIconColor="crimson" variationPercentage={-0.71}/>
            </div>

        </div>

        <div class="flex flex-col space-y-4 p-1 flex-wrap w-80 justify-evenly items-center content-evenly">
           
            <div class="w-full h-28">
                <!-- stats card -->
                <StatsCard title="Utilisateurs" total={703} cardIcon="solar:users-group-rounded-broken" cardIconColor="darkslategray" variationPercentage={+2.02}/>
            </div>
            <div class="w-full h-28">
                <StatsCard title="Restaurants" total={68} cardIcon="maki:restaurant-bbq" cardIconColor="purple"/>
            </div>

        </div>

        <div class="flex flex-1 p-4">
            <div class="w-full h-full shadow-md border rounded-sm border-gray-400 bg-gray-200">
                <Line 
                    data={{
                        labels: ['Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
                        datasets: [{
                            label: 'Nombre de commandes',
                            data: [50, 70, 100, 120, 140, 160, 180],
                            borderColor: 'rgb(255, 99, 132)',
                            tension: 0.4
                        }]
                    }}
                    options={{
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
                    }}
                />
            </div>
        </div>

    </div>

</div>