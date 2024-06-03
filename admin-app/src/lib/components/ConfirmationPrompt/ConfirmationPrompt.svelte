<script lang="ts">
    import * as AlertDialog from "$lib/components/ui/alert-dialog/index.js";
    import { Button } from "$lib/components/ui/button/index.js";

    // export let triggerText: string;
    export let questionText: string;
    export let descriptionText: string;
    export let isOpened: boolean = false;
    export let cancelText: string = "Annuler";
    export let okText: string = "Continuer";
    export let action: Function;

</script>

<AlertDialog.Root bind:open={isOpened}>
    <!-- <AlertDialog.Trigger asChild let:builder>
        <Button builders={[builder]} variant="outline">{triggerText}</Button>
    </AlertDialog.Trigger> -->
    <AlertDialog.Content>
        <AlertDialog.Header>
            <AlertDialog.Title>{questionText}</AlertDialog.Title>
            <AlertDialog.Description>
                {descriptionText}
            </AlertDialog.Description>
        </AlertDialog.Header>
        <AlertDialog.Footer>
            <AlertDialog.Cancel>{cancelText}</AlertDialog.Cancel>
            <AlertDialog.Action on:click={() => action?.call(null)}>{okText}</AlertDialog.Action>
        </AlertDialog.Footer>
    </AlertDialog.Content>
</AlertDialog.Root>