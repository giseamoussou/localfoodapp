<script lang="ts">
    import type { PageData } from './$types';
    import * as Table from "$lib/components/ui/table"
    import Badge from '$lib/components/ui/badge/badge.svelte';
    import Icon from '@iconify/svelte';
    import Button from '$lib/components/ui/button/button.svelte';


    export let data: PageData;
</script>

<div class="flex flex-col w-full px-5 py-3">

    <div class="flex flex-row content-center items-center justify-between border shadow-md bg-gray-50 border-gray-300 px-5 py-3">
       <div class="flex flex-row content-center items-center justify-start space-x-2">
            <Icon icon="arcticons:foodora" color="darkorange" height={35} width={35} />
            <span class="block text-2xl">Commandes</span>
       </div>

        <!-- <div>
            <div class="flex flex-col w-full content-center items-start justify-center">
                <Button class="px-7 py-5 space-x-2">
                    <Icon icon="icon-park-outline:send-email" color="white" height={15} width={15} />
                    <span>Inviter</span>
                </Button>
            </div>
        </div> -->
    </div>

  
    <div class="w-full mt-10">
        <Table.Root>
          <Table.Header>
            <Table.Row>
              <Table.Head class="w-[80px]">Référence</Table.Head>
              <Table.Head>Statut</Table.Head>
              <Table.Head>Methode</Table.Head>
              <Table.Head class="text-right">Montant</Table.Head>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell class="font-medium">CMD0162</Table.Cell>
              <Table.Cell>
                <Badge class="bg-green-500">Payé</Badge>
              </Table.Cell>
              <Table.Cell>Kkiapay <Badge class="bg-blue-500">Momo</Badge></Table.Cell>
              <Table.Cell class="text-right italic">1235.00</Table.Cell>
            </Table.Row>
            <Table.Row>
                <Table.Cell class="font-medium">CMD0168</Table.Cell>
                <Table.Cell>
                  <Badge class="bg-gray-500">Non Payé</Badge>
                </Table.Cell>
                <Table.Cell>Kkiapay <Badge class="bg-blue-500">Momo</Badge></Table.Cell>
                <Table.Cell class="text-right italic">3100.00</Table.Cell>
            </Table.Row>
            <Table.Row>
                <Table.Cell class="font-medium">CMD0170</Table.Cell>
                <Table.Cell>
                  <Badge class="bg-red-500">Rejeté</Badge>
                </Table.Cell>
                <Table.Cell>Kkiapay <Badge class="bg-blue-500">Momo</Badge></Table.Cell>
                <Table.Cell class="text-right italic">850.00</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table.Root>
    </div>
    
</div>


