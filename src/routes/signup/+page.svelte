<script>
	import Button from '$lib/components/Button.svelte';
</script>

<div class="absolute left-4 top-4">
	<a href="/">◀ Home</a>
</div>

<div class="signup-container">
	<div class="signup-wrapper">
		<form action="" class="signup">
			<div class="flex">
				<a
					href="/login"
					class="hover:underline text-center text-gray-600 dark:text-gray-300"
					>◀ Login</a
				>
			</div>
			<div class="grid gap-y-4">
				<label for="fullname" class="fullname">
					Fullname
					<input type="text" name="fullname" value="" placeholder="Enter your fullname" />
				</label>

				<label for="username" class="username">
					Username
					<input type="text" name="username" value="" placeholder="Enter your username" />
				</label>

				<label for="password" class="password">
					Password
					<input type="password" name="password" value="" placeholder="Enter your password" />
				</label>

				<label for="cpassword" class="cpassword">
					Confirm Password
					<input type="password" name="cpassword" value="" placeholder="Confirm your password" />
				</label>
			</div>
			<Button
				btnType="ANY"
				className="px-3 py-1 text-gray-600 border border-blue-500 rounded-md hover:bg-blue-300 hover:text-white hover:border-transparent dark:text-gray-300 dark:bg-[#2196f375] dark:border-[#60606091] dark:hover:bg-[#008eff91]"
				>Create account</Button
			>
		</form>
	</div>
</div>

<style lang="postcss">
	.signup-container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
		gap: 50px 0;
	}

	.signup {
		transition: all 0.2s ease-in-out;
		@apply flex flex-col justify-center gap-y-6 bg-gray-50 px-6 pt-4 pb-8 w-72 shadow-md rounded dark:bg-[#1f1f1f] border-2 border-transparent dark:border-[#2b2a2a] duration-300;
	}

	.fullname,
	.username,
	.password,
	.cpassword {
		@apply text-xs font-semibold text-gray-500 flex flex-col gap-y-1 tracking-wide;
	}

	input {
		transition: all 0.2s ease-in-out;
		@apply p-2 bg-gray-200 border-blue-500 shadow-inner dark:bg-[#535353] dark:text-gray-200 duration-300;
	}

	input:focus {
		@apply outline-none;
	}
</style>
