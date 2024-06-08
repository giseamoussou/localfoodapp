<script lang="ts">
    import StatsCard from '$lib/components/StatsCard/StatsCard.svelte';
    import type { PageData } from './$types';
    import * as Table from "$lib/components/ui/table"
    import Badge from '$lib/components/ui/badge/badge.svelte';
    import { Line, Pie } from 'svelte-chartjs';
    import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, LinearScale, PointElement, CategoryScale, ArcElement } from 'chart.js';
    import Icon from '@iconify/svelte';


    ChartJS.register(Title, Tooltip, Legend, LineElement, LinearScale, PointElement, CategoryScale, ArcElement);


    export let data: PageData;

    const pieData = {
        labels: ['Consistance', 'Pizza', 'Riz (*)', 'Légumes', 'Plats Européens'],
        datasets: [
            {
                data: [300, 50, 100, 40, 120],
                backgroundColor: [
                    '#F7464A',
                    '#46BFBD',
                    '#FDB45C',
                    '#949FB1',
                    '#4D5360',
                    '#AC64AD',
                ],
                hoverBackgroundColor: [
                    '#FF5A5E',
                    '#5AD3D1',
                    '#FFC870',
                    '#A8B3C5',
                    '#616774',
                    '#DA92DB',
                ],
            },
        ],
    };

</script>


<div class="flex flex-col w-full py-5 px-5 space-y-5">

    <div class="flex">
        <span class="block text-2xl">Tableau de Bord<span class="text-[tomato]">&nbsp;Analytique</span></span>
    </div>

    <div class="w-full flex flex-row h-auto space-x-4">

        <div class="flex flex-col space-y-4 p-1 flex-wrap w-72 justify-evenly items-center content-evenly">

            <div class="w-full h-28">
                {#await data.platsCountTask then value}
                <StatsCard title="Plats" total={value.count} cardIcon="emojione-monotone:pot-of-food"
                    cardIconColor="darkslateblue" variationPercentage={2.6} />
                {/await}
            </div>
            <div class="w-full h-28">
                {#await data.commandesCountTask then value}
                <StatsCard title="Commandes" total={value.count} cardIcon="arcticons:zoho-invoice"
                    cardIconColor="crimson" variationPercentage={-0.71} />
                {/await}
            </div>

        </div>

        <div class="flex flex-col space-y-4 p-1 flex-wrap w-72 justify-evenly items-center content-evenly">

            <div class="w-full h-28">
                {#await data.usersCountTask then value}
                <StatsCard title="Utilisateurs" total={value.data.users.length}
                    cardIcon="solar:users-group-rounded-broken" cardIconColor="darkslategray"
                    variationPercentage={+2.02} />
                {/await}
            </div>
            <div class="w-full h-28">
                {#await data.restaurantsCountTask then value}
                <StatsCard title="Restaurants" total={value.count} cardIcon="maki:restaurant-bbq"
                    cardIconColor="purple" />
                {/await}
            </div>

        </div>

        <div class="flex flex-1 p-4">
            <div class="w-full h-full shadow-md border rounded-sm border-gray-400 bg-gray-200">
                <Line data={{ labels: ['Ja', 'F' , 'M' , 'Av' , 'M' , 'Jn' , 'Jl' , 'Ao' , 'S' , 'O' , 'N' , 'D' ],
                    datasets: [{ label: 'Nombre de commandes / mois' , data: [20, 30, 120, 80, 165, 122, 180, 88, 170,
                    150, 103, 309], borderColor: 'tomato' , tension: 0.4 }] }} options={{ scales: { y: { beginAtZero:
                    true } }, locale: 'FR-Fr' , backgroundColor: "darkslateblue" , responsive: true, color: "darkblue"
                    }} />
            </div>
        </div>

    </div>

    <div class="flex flex-col space-y-5">

        <div class="bg-[tomato] text-white w-full py-2 px-4 rounded-sm text-center">
            <span class="block text-xl"><span class=""> ⚪ Commandes Récentes</span></span>
        </div>

        <div class="flex-1 flex flex-row space-x-4 w-full">

            <div class="flex w-1/3">
                <Pie data={pieData} options={{ responsive: true }} label="Commandes par Catégories" />
            </div>

            <div class="flex-1 border-s border-s-slate-500 ps-3">
                {#await data.commandesTask}
                <div class="flex text-center w-full flex-col justify-center items-center content-center space-y-3">
                    <Icon icon='eos-icons:loading' class="animate-spin" height={35} width={35} />
                    <div>Veuillez patienter</div>
                </div>
                {:then commandes}
                <Table.Root>
                    <Table.Header>
                        <Table.Row>
                            <Table.Head class="w-[185px]">Référence</Table.Head>
                            <Table.Head>Statut</Table.Head>
                            <!-- <Table.Head>Methode</Table.Head> -->
                            <Table.Head>Créée le</Table.Head>
                            <Table.Head class="text-right">Montant</Table.Head>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {#each commandes as commande}
                        <Table.Row>
                            <Table.Cell class="font-medium">{commande.ref}</Table.Cell>
                            <Table.Cell>
                                {#if commande.status == "paid"}
                                <Badge class="bg-green-500">Payé</Badge>
                                {:else if commande.createdOn < (new Date(Date.now() - 24 * 60 * 60 * 1000))} <Badge
                                    class="bg-red-500">Rejeté</Badge>
                                    {:else}
                                    <Badge class="bg-gray-500">Non Payé</Badge>
                                    {/if}
                            </Table.Cell>
                            <!-- <Table.Cell>
                              Kkiapay <Badge class="bg-blue-500">Momo</Badge>
                          </Table.Cell> -->
                            <Table.Cell>{commande.createdOn.toLocaleString('fr')}</Table.Cell>
                            <Table.Cell class="text-right italic">{commande.amount}</Table.Cell>
                        </Table.Row>
                        {:else}
                        <div>Aucune Commande</div>
                        {/each}
                    </Table.Body>
                </Table.Root>
                {:catch error}
                <div class="flex text-center w-full flex-row justify-center items-center content-center">
                    <div class="text-red-500">Une erreur s'est produite lors de la récupération des commandes</div>
                </div>
                {/await}
            </div>

        </div>

    </div>

</div>