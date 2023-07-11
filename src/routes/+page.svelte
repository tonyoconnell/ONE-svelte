<script>
	import { DeviceMockup } from 'flowbite-svelte';
  </script>
  
  <DeviceMockup>
	<img
	  src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/hero/mockup-1-light.png"
	  class="dark:hidden w-[272px] h-[572px]"
	  alt="default example 1" />
	<img
	  src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/hero/mockup-1-dark.png"
	  class="hidden dark:block w-[272px] h-[572px]"
	  alt="default example 2" />
  </DeviceMockup>

  
<div class="mt-16 grid justify-items-center text-center">
	<h1>
		<span
			class=" bg-gradient-to-r from-blue-400 to-purple-400 box-decoration-clone bg-clip-text text-7xl font-bold text-transparent"
		>
			SvelteKit Enterprise Stack
		</span>
	</h1>

	<span class="my-16 block max-w-3xl text-2xl text-gray-400">
		Every part of the SvelteKit enterprise stack is optimized to go blazingly
		fast and please stakeholders.
	</span>

	<img
		class="h-80 w-80 rounded-full object-cover"
		src="https://haha.business/business.jpg"
		alt="Business person laughing"
	/>
</div>
