<template>
	<ul>
		
		<li v-for="item in checklist">
			{{ item.title }}
		</li>
		
	</ul>
</template>

<script>
	export default {
		name: 'checkList',
		props: {
			checklist: Array
		},
		data: function() {
			return {
				
			} 
		}
	}

	//
</script>
	
<style>
	.list-container {
		display: flex;
	}
	.list-text {
		font-size: 1rem;
		flex-grow: 1;
	}
</style>