<script lang="ts">
    import type { LayoutData } from './$types';
    import "../app.css";
    
    export let data: LayoutData;
</script>


<main class="w-screen h-screen bg-[#eceef1]">
    <slot />
</main>