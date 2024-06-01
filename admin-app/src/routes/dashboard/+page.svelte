<script lang="ts">
    import StatsCard from '$lib/components/StatsCard/StatsCard.svelte';
    import type { PageData } from './$types';
    import { Line } from 'svelte-chartjs';
    import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, LinearScale, PointElement, CategoryScale, } from 'chart.js';
    ChartJS.register( Title, Tooltip, Legend, LineElement, LinearScale, PointElement, CategoryScale );



    export let data: PageData;
</script>


<div class="flex flex-col w-full py-5 px-5 space-y-5">

    <div class="flex">
        <span class="block text-2xl">Tableau de Bord<span class="text-[tomato]">&nbsp;Analytique</span></span>
    </div>

    <div class="w-full flex flex-row h-auto space-x-4">

        <div class="flex flex-col space-y-4 p-1 flex-wrap w-72 justify-evenly items-center content-evenly">
           
            <div class="w-full h-28">
                <!-- stats card -->
                <StatsCard title="Plats" total={98} cardIcon="emojione-monotone:pot-of-food" cardIconColor="darkslateblue" variationPercentage={2.6}/>
            </div>
            <div class="w-full h-28">
                <StatsCard title="Commandes" total={181} cardIcon="arcticons:zoho-invoice" cardIconColor="crimson" variationPercentage={-0.71}/>
            </div>

        </div>

        <div class="flex flex-col space-y-4 p-1 flex-wrap w-72 justify-evenly items-center content-evenly">
           
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
                        labels: ['Ja', 'F', 'M', 'Av', 'M', 'Jn', 'Jl', 'Ao', 'S', 'O', 'N', 'D'],
                        datasets: [{
                            label: 'Nombre de commandes',
                            data: [20, 30, 120, 80, 165, 122, 180, 88, 170, 150, 103, 309],
                            borderColor: 'tomato',
                            tension: 0.4
                        }]
                    }}
                    options={{
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        },
                        locale: 'FR-Fr',
                        backgroundColor: "darkslateblue",
                        responsive: true,
                        color: "darkblue"
                    }}
                />
            </div>
        </div>

    </div>

    <div class="flex flex-col">

        <div class="">
            <span class="block text-xl"><span class="text-slate-700"> ⚫ Commandes Récentes</span></span>
        </div>

        <div class="flex-1">

        </div>

    </div>

</div>