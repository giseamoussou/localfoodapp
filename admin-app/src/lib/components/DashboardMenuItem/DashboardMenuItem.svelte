<script lang="ts">
    import Icon from "@iconify/svelte";

    export let title: string
    export let iconName: string;
    export let link: string;
</script>

<a href={link} class="w-full shadow-sm shadow-[tomato] bg-yellow-50 h-auto rounded-lg flex flex-col space-y-1 border p-2 border-[tomato] transition-all hover:scale-95 cursor-pointer text-[tomato] duration-300 hover:text-white hover:border-white hover:bg-[tomato]">
    <Icon icon={iconName} class="w-8 h-8 mx-auto" />
    <span class="block text-center text-xs">{title}</span>
</a>