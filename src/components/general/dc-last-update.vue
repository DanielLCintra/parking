<script>
	export default{
		name: 'DcLastUpdate',
		props:['usuario','data','hora']
	}
</script>

<template>
	<div>
		<hr>
		<div class="well last_update">
			<div v-show="usuario !== ''"><b>Última Alteração:</b> {{ usuario}} - {{ data }}</div>
		</div>

	</div>
</template>

<style>
	.last_update{
		text-align: right;
		padding: 5px;
		font-size: 14px;
	}
</style>
