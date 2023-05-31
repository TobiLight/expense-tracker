<script lang="ts">
	export let type: 'button' | 'submit' | 'reset' = 'button';
	export let disabled = false;
	export let form = '';
	export let formaction = '';
	export let formenctype = 'application/x-www-form-urlencoded';
	export let formmethod = 'get';
	export let formnovalidate = false;
	export let formtarget = '';
	export let name = '';
	export let value = '';
	export let tabindex: number = 0;
	export let contenteditable = false;
	export let dir = '';
	export let hidden = false;
	export let lang = '';
	export let spellcheck = false;
	export let style = '';
	export let title = '';
	export let className: string | undefined = undefined;
	export let btnType: "PRIMARY" | "SECONDARY" | "ANY";

	export let handleClick: ((event: MouseEvent & {
    currentTarget: EventTarget & HTMLButtonElement;
} | CustomEvent<any>) => void) | undefined = undefined;
</script>

<button
	{type}
	{disabled}
	{form}
	{formaction}
	{formenctype}
	{formmethod}
	{formnovalidate}
	{formtarget}
	{name}
	{value}
	{tabindex}
	{contenteditable}
	{dir}
	{hidden}
	{lang}
	{spellcheck}
	{style}
	{title}
	class={btnType === "PRIMARY" ? "bg-blue-400 text-gray-100 px-2 py-1 rounded-md" : btnType === "SECONDARY" ? "border-2 border-blue-500 text-gray-600 px-2 py-1 rounded-md" : btnType === "ANY" ? className : ""}
	on:click={handleClick}
>
	<slot />
</button>

<style lang="postcss">
</style>
