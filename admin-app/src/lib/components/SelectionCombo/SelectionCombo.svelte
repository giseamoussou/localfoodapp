<script lang="ts">
    import Icon from "@iconify/svelte";
    import { tick } from "svelte";
    import * as Command from "$lib/components/ui/command/index.js";
    import * as Popover from "$lib/components/ui/popover/index.js";
    import { Button } from "$lib/components/ui/button/index.js";
    import { cn } from "$lib/utils.js";

    export let noDataText: string = "Aucun Enregistrement";
    export let dataArray: Array< {value: string, label: string }> = [];
    export let displayText: string = "Sélectionner";
    export let placeholder: string = "Rechercher";

    let open = false;
    export let value = "";

    $: selectedValue =
      dataArray.find((f) => f.value === value)?.label ?? displayText;

    // We want to refocus the trigger button when the user selects
    // an item from the list so users can continue navigating the
    // rest of the form with the keyboard.
    function closeAndFocusTrigger(triggerId: string) {
      open = false;
      tick().then(() => {
        document.getElementById(triggerId)?.focus();
      });
    }
</script>
  
<Popover.Root bind:open let:ids>
  <Popover.Trigger asChild let:builder class="w-full">
    <Button
      builders={[builder]}
      variant="outline"
      role="combobox"
      aria-expanded={open}
      class="w-full justify-between">
      {selectedValue}
      <Icon icon="radix-icons:caret-sort" class="ml-2 h-4 w-4 shrink-0 opacity-50"/>
    </Button>
  </Popover.Trigger>
  <Popover.Content class="p-0 w-auto">
    <Command.Root>
      <Command.Input placeholder={placeholder} class="h-9" />
      <Command.Empty>{noDataText}</Command.Empty>
      <Command.Group>
        {#each dataArray as framework}
          <Command.Item
            value={framework.value}
            onSelect={(currentValue) => {
              value = currentValue;
              closeAndFocusTrigger(ids.trigger);
            }}
          >

          <Icon icon="material-symbols-light:check"  class={cn(
              "mr-2 h-4 w-4",
              value !== framework.value && "text-transparent"
            )}/>
            {framework.label}
          </Command.Item>
        {/each}
      </Command.Group>
    </Command.Root>
  </Popover.Content>
</Popover.Root>
