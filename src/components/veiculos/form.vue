<script>

	import moment from 'moment'
	import DcModal from '../general/dc-modal.vue'

	export default {
		name: 'DcVeiculosForm',
		components:{
			DcModal
		},
		data(){
			return {
				isEditing: false,
				veiculo:{
					id: 0,
					plate: '',
					brand:'',
					model:'',
					color: '',
					year: '',
					client_id: '',
					parking_place_id: ''
				},
				clientes: [],
				parking_places: []
			}
		},
		methods:{
	   		gravar(){
	  			
	   			const modal = $(this.$refs.modal)
	   			const VmThis = this

	   			var url = ''

	   			if(this.isEditing){
	   				url = `vehicle/${this.veiculo.id}`

	   				if (this.veiculo.plate !== '' && this.veiculo.brand !== '' && this.veiculo.model !== '' && this.veiculo.client_id !== ''){

	   					this.veiculo.plate = this.veiculo.plate.replace('-','')

		   				this.$http 
		   					.patch(url, this.veiculo)
		   					.then(res => {

		   						if(res.data.status !== 0){
		   						
		   							VmThis.$bus.$emit('open-modal',{titulo: 'Informação',texto: res.data.message,cor: 'yellow'})
		   						
		   						}else{

		   							VmThis.$bus.$emit('open-modal',{titulo: 'Sucesso',texto: 'Veículo atualizado com sucesso.',cor: 'green'})

		   							VmThis.$bus.$emit('create',{dados: _.clone(this.veiculo)})

		   						}
		   					})
		   					.catch(error =>{

		   						VmThis.$bus.$emit('open-modal',{titulo: 'Erro',texto: 'Houve um erro ao gravar o veículo.',cor: 'red'})

		   					})
		   			}else{

		   				VmThis.$bus.$emit('open-modal',{titulo: 'Informação',texto: 'Para gravar os dados do veículo é obrigatório informar uma placa, uma marca, um modelo e um cliente.',cor: 'yellow'})
		   			
		   			}


	   			}else{

	   				url = 'vehicle'

	   				if (this.veiculo.plate !== '' && this.veiculo.brand !== '' && this.veiculo.model !== '' && this.veiculo.client_id !== ''){

	   					this.veiculo.plate = this.veiculo.plate.replace('-','')

		   				this.$http 
		   					.post(url, this.veiculo)
		   					.then(res =>{

		   						if(res.data.status !== 0){

		   							VmThis.$bus.$emit('open-modal',{titulo: 'Informação',texto: res.data.message,cor: 'yellow'})

		   						}else{

		   							VmThis.$bus.$emit('open-modal',{titulo: 'Sucesso',texto: 'Veículo gravado com sucesso.',cor: 'green'})

		   							this.$bus.$emit('create',{dados: _.clone(this.veiculo)})
		   						}
		   					})
		   					.catch(error =>{
		   						VmThis.$bus.$emit('open-modal',{titulo: 'Erro',texto: 'Houve um erro ao gravar o veículo.',cor: 'red'})
		   					})
		   			}else{

		   				VmThis.$bus.$emit('open-modal',{titulo: 'Informação',texto: 'Para gravar um novo cliente é obrigatório informar informar uma placa, uma marca, um modelo e um cliente.',cor: 'yellow'})
		   			
		   			}
	   			}	   			

        	},
		},
		mounted (){

			const VmThis = this

			this.$http
				.get('parking-place')
				.then(res =>{
					VmThis.parking_places = res.data.clients
				})

			this.$http
				.get('client')
				.then(res =>{
					VmThis.clientes = res.data.clients
				})

			const modal = $(this.$refs.modal)

			this.$bus.$on('open-form-veiculo', (obj) => {

				if (obj.veiculo !== undefined){

					this.isEditing = true

					this.veiculo.id = obj.veiculo.id
					this.veiculo.plate = obj.veiculo.plate
					this.veiculo.brand = obj.veiculo.brand
					this.veiculo.model = obj.veiculo.model
					this.veiculo.color = obj.veiculo.color
					this.veiculo.year = obj.veiculo.year
					this.veiculo.client_id = obj.veiculo.client_id
					this.veiculo.parking_place_id = obj.veiculo.parking_place_id
					
				}else{

					this.veiculo.id = obj.last_id+1
					this.isEditing = false

				}

			modal.modal('show')

			})

			modal.on('hidden.bs.modal', () => {

				this.veiculo.id = ''
				this.veiculo.plate = ''
				this.veiculo.brand = ''
				this.veiculo.model = ''
				this.veiculo.color = ''
				this.veiculo.year = ''
				this.veiculo.client_id = ''
				this.veiculo.parking_place_id = ''
			
			})
		}
	}
</script>

<template>
	<div>
		<div ref="modal" id="c_modal" class="modal fade" tabindex="-1" role="dialog">
		  <div class="modal-dialog" role="document">
		    <div class="modal-content">
		      <div class="modal-header">
		        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
		        <h4 class="modal-title">Criar / Editar</h4>
		      </div>
		      <div class="modal-body">
	        	<div class="row">
	        		<div class="col-md-12">
						<label for="plate">Placa</label>
						<input class="form-control" id="plate" name="plate" type="text" v-model="veiculo.plate" v-mask="'AAA-####'">
					</div>	
					<div class="col-md-12">
						<label for="brand">Marca</label>
						<input class="form-control" id="brand" name="brand" type="text" v-model="veiculo.brand">
					</div>
					<div class="col-md-12">
						<label for="model">Modelo</label>
						<input class="form-control" id="model" name="model" type="text" v-model="veiculo.model">
					</div>
					<div class="col-md-12">
						<label for="color">Cor</label>
						<input class="form-control" id="color" name="color" type="text" v-model="veiculo.color">
					</div>
					<div class="col-md-12">
						<label for="year">Ano</label>
						<input class="form-control" id="year" name="year" type="text" v-model="veiculo.year" v-mask="'####'">
					</div>
					<div class="col-md-12">
						<label for="client_id">Cliente</label>
						<select class="form-control" name="client_id" id="client_id" v-model="veiculo.client_id">
							<option value="">(selecione)</option>
							<option v-for="c in clientes" :value="c.id">{{ c.client_name }}</option>
						</select> 
					</div>
					<div class="col-md-12">
						<label for="parking_place_id">Vaga</label>
						<select class="form-control" name="parking_place_id" id="parking_place_id" v-model="veiculo.parking_place_id">
							<option value="">(selecione)</option>
							<option v-for="p in parking_places" :value="p.id">{{ p.parking_place_name }}</option>
						</select> 
					</div>
					
			    </div>
			    <hr>
			   	<div class="row">
					<div class="col-md-12">
				    	<button type="button" class="btn btn-default" @click="gravar()">Salvar</button>
				    </div>
				</div>
		      </div>
		    </div><!-- /.modal-content -->
		  </div><!-- /.modal-dialog -->
		</div><!-- /.modal -->
		<dc-modal></dc-modal>
	</div>
</template>