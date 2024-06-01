<script lang="ts">
    import Icon from "@iconify/svelte";

    export let total: number = 25;
    export let title: string;
    export let cardIcon: string;
    export let cardIconColor: string = "black";
    export let variationPercentage: number = 0.0;
    
</script>


<div class="w-full h-full flex flex-row shadow-md border rounded-sm border-[tomato] bg-slate-300-200 transition-all hover:scale-110 cursor-pointer">

    <div class="flex-1 flex-col h-full p-3 content-evenly justify-evenly">
        <div class="text-left">
            <span class="text-slate-700 text-xl">{title}</span>
        </div>
        <div class="text-[tomato] text-2xl py-1">
            {total}
        </div>
        <div class=" text-teal-800">
            Variation: <span class="{variationPercentage > 0 ? 'text-green-600' : 'text-red-600'}">{variationPercentage}%</span>
        </div>
    </div>

    <div class="flex h-full content-center items-center justify-center mx-2">
        <div class="shadow-sm border shadow-blue-600 rounded-full h-16 w-16 p-2 content-center items-center justify-center flex">
            <Icon icon={cardIcon} width={55} height={55} color={cardIconColor} color-profile="tomato" />
        </div>
    </div>

</div>