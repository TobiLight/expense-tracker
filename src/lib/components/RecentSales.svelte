<script lang="ts">
	export let name: string;
	export let quantity: number;
	export let type: "Jars" | "Normal"
	export let item: "Chips" | "Cake";
	export let price: string;
</script>

<div class="grid grid-flow-col-dense items-center drop-shadow-lg bg-white p-4">
	<div
		class="w-10 h-10 shadow-lg rounded-full bg-blue-500 flex justify-center items-center text-gray-100 font-semibold"
	>
		<p>{name[0].toUpperCase()}</p>
	</div>
	<div class="px-3 rounded flex items-center">
		<p class="text-[16px]">
			{name} bought <span class="font-semibold">{quantity} {type === "Jars" ? "Jars of" : ""}</span>
			<span class="font-semibold">{item}</span> for <span class="font-semibold">N{price}</span>
		</p>
	</div>
</div>

