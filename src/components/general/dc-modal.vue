<script>
	export default {
		name: 'DcModal',
		components:{
		},
		data(){
			return {
				texto: '',
				titulo: '',
				cor: ''
			}
		},
		mounted (){

			const modal = $(this.$refs.modal)

			this.$bus.$on('open-modal', (obj) => {

				this.texto = obj.texto
				this.titulo = obj.titulo
				this.cor = obj.cor

				modal.modal('show')
			})
		}
	}
</script>

<template>
	<div>
		<div ref="modal" id="c_modal" class="modal fade" tabindex="-1" role="dialog">
		  <div class="modal-dialog" role="document">
		    <div class="modal-content">
		      <div class="modal-header" :class="{
			      'alert-danger': this.cor == 'red',
			      'alert-warning': this.cor == 'yellow', 
			      'alert-info': this.cor == 'blue',
			      'alert-success': this.cor == 'green'
		      }">
		        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
		        <h4 class="modal-title">{{titulo}}</h4>
		      </div>
		      <div class="modal-body">
	        	<div class="row">
	        		<div class="col-md-12">
						{{ texto }}
	        		</div>
			    </div>
		      </div>
		    </div><!-- /.modal-content -->
		  </div><!-- /.modal-dialog -->
		</div><!-- /.modal -->
	</div>
</template>