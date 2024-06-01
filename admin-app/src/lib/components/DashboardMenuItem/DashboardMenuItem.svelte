<script lang="ts">
    import Icon from "@iconify/svelte";
    import { page } from "$app/stores";

    export let title: string
    export let iconName: string;
    export let link: string;
</script>

<a href={link} class="w-full shadow-sm shadow-[tomato] { $page.route.id == link ? 'scale-95 text-white border-white bg-[tomato]' : 'bg-yellow-50'} h-auto rounded-lg flex flex-col space-y-1 border p-2 border-[tomato] transition-all duration-300 hover:scale-95 cursor-pointer text-[tomato] hover:text-white hover:border-white hover:bg-black">
    <Icon icon={iconName} class="w-8 h-8 mx-auto" />
    <span class="block text-center text-xs">{title}</span>
</a>