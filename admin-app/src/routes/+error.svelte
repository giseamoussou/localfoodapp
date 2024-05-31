<script lang="ts">
    import { page } from '$app/stores';
</script>


<div class="w-full h-full flex content-center items-center justify-center">

    <h1>{$page.status}: {$page.error?.message}</h1>

</div>
