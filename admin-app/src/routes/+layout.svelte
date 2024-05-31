<script lang="ts">
    import type { LayoutData } from './$types';
    import "../app.css";
    import { onMount } from 'svelte';
    import { goto, invalidate } from '$app/navigation';
    import { page } from '$app/stores';
    
    export let data: LayoutData;


    $: ({ session, supabase } = data);

	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange((_, newSession) => {
			if (!newSession) {
				/**
				 * Queue this as a task so the navigation won't prevent the
				 * triggering function from completing
				 */
				setTimeout(() => {
					if($page.route.id != "/login"){
						goto('/login', { invalidateAll: true });
					}
				}, 3000);
			}
			if (newSession?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => data.subscription.unsubscribe();
	});
</script>


<main class="w-screen h-screen bg-[#eceef1]">
    <slot />
</main>