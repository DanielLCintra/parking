<script>

	import moment from 'moment'
	import DcModal from '../general/dc-modal.vue'

	export default {
		name: 'DcClientesForm',
		components:{
			DcModal
		},
		data(){
			return {
				isEditing: false,
				cliente:{
					id: 0,
					client_name: '',
					cpf:'',
					zip_code:'',
					phone: '',
					address_street: '',
					address_number: '',
					address_city: '',
					address_state: '',
					address_country: ''
				}
			}
		},
		methods:{
	   		gravar(){
	  			
	   			const modal = $(this.$refs.modal)
	   			const VmThis = this

	   			var url = ''

	   			if(this.isEditing){
	   				url = `client/${this.cliente.id}`

	   				if (this.cliente.client_name !== '' && this.cliente.cpf !== '' && this.cliente.phone !== ''){

	   					this.cliente.cpf = this.cliente.cpf.replace('.','')
	   					this.cliente.cpf = this.cliente.cpf.replace('.','')
	   					this.cliente.cpf = this.cliente.cpf.replace('-','')

	   					this.cliente.phone = this.cliente.phone.replace('(','')
	   					this.cliente.phone = this.cliente.phone.replace(')','')
	   					this.cliente.phone = this.cliente.phone.replace('-','')

		   				this.$http 
		   					.patch(url, this.cliente)
		   					.then(res => {

		   						if(res.data.status !== 0){
		   						
		   							VmThis.$bus.$emit('open-modal',{titulo: 'Informação',texto: res.data.message,cor: 'yellow'})
		   						
		   						}else{

		   							VmThis.$bus.$emit('open-modal',{titulo: 'Sucesso',texto: 'Cliente atualizado com sucesso.',cor: 'green'})

		   							this.$bus.$emit('create',{dados: _.clone(this.cliente)})

		   						}
		   					})
		   					.catch(error =>{

		   						VmThis.$bus.$emit('open-modal',{titulo: 'Erro',texto: 'Houve um erro ao gravar o cliente.',cor: 'red'})

		   					})
		   			}else{

		   				VmThis.$bus.$emit('open-modal',{titulo: 'Informação',texto: 'Para gravar os dados do cliente é obrigatório informar um nome, um cpf e um telefone.',cor: 'yellow'})
		   			
		   			}


	   			}else{

	   				url = 'client'

	   				if (this.cliente.client_name !== '' && this.cliente.cpf !== '' && this.cliente.phone !== ''){

	   					this.cliente.cpf = this.cliente.cpf.replace('.','')
	   					this.cliente.cpf = this.cliente.cpf.replace('.','')
	   					this.cliente.cpf = this.cliente.cpf.replace('-','')

	   					this.cliente.phone = this.cliente.phone.replace('(','')
	   					this.cliente.phone = this.cliente.phone.replace(')','')
	   					this.cliente.phone = this.cliente.phone.replace('-','')

		   				this.$http 
		   					.post(url, this.cliente)
		   					.then(res =>{

		   						if(res.data.status !== 0){

		   							VmThis.$bus.$emit('open-modal',{titulo: 'Informação',texto: res.data.message,cor: 'yellow'})

		   						}else{

		   							VmThis.$bus.$emit('open-modal',{titulo: 'Sucesso',texto: 'Cliente gravado com sucesso.',cor: 'green'})

		   							this.$bus.$emit('create',{dados: _.clone(this.cliente)})
		   						}
		   					})
		   					.catch(error =>{
		   						VmThis.$bus.$emit('open-modal',{titulo: 'Erro',texto: 'Houve um erro ao gravar o cliente.',cor: 'red'})
		   					})
		   			}else{

		   				VmThis.$bus.$emit('open-modal',{titulo: 'Informação',texto: 'Para gravar um novo cliente é obrigatório informar um nome, um cpf e um telefone.',cor: 'yellow'})
		   			
		   			}
	   			}

	   			

        	},
        	getdadoscep(){

        		const VmThis = this

        		this.$axios
        			.get(`http://viacep.com.br/ws/${this.cliente.zip_code}/json/`)
        			.then(res =>{
        		
        				if (!res.data.erro){

        					VmThis.cliente.address_street = res.data.logradouro
        					VmThis.cliente.address_city = res.data.localidade
        					VmThis.cliente.address_state = res.data.uf	
        				
        				}else{


        					VmThis.$bus.$emit('open-modal',{titulo: 'Informação',texto: 'Cep inválido ou inexistente',cor: 'red'})

        					VmThis.cliente.address_street = ''
        					VmThis.cliente.address_city = ''
        					VmThis.cliente.address_state = ''

        				}
        				
        			})
        			.catch(error =>{	

        				VmThis.$bus.$emit('open-modal',{titulo: 'Informação',texto: 'Cep inválido ou inexistente',cor: 'red'})

        			})
        	}
		},
		mounted (){

			const modal = $(this.$refs.modal)

			this.$bus.$on('open-form-cliente', (obj) => {

				if (obj.cliente !== undefined){

					this.isEditing = true

					this.cliente.id = obj.cliente.id
					this.cliente.client_name = obj.cliente.client_name
					this.cliente.cpf = obj.cliente.cpf
					this.cliente.zip_code = obj.cliente.zip_code
					this.cliente.phone = obj.cliente.phone
					this.cliente.address_street = obj.cliente.address_street
					this.cliente.address_number = obj.cliente.address_number
					this.cliente.address_city = obj.cliente.address_city 
					this.cliente.address_state = obj.cliente.address_state 
					this.cliente.address_country = obj.cliente.address_country

				}else{

					this.cliente.id = obj.last_id+1
					this.isEditing = false

				}

				modal.modal('show')
			})

			modal.on('hidden.bs.modal', () => {

				this.cliente.id = 0
				this.cliente.client_name = ''
				this.cliente.cpf = ''
				this.cliente.zip_code = ''
				this.cliente.phone = ''
				this.cliente.address_street = ''
				this.cliente.address_number = ''
				this.cliente.address_city = '' 
				this.cliente.address_state = '' 
				this.cliente.address_country = ''
			
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
						<label for="client_name">Nome</label>
						<input class="form-control" id="client_name" name="client_name" type="text" v-model="cliente.client_name">
					</div>
					<div class="col-md-12">
						<label for="cpf">CPF</label>
						<input class="form-control" id="cpf" name="cpf" type="text" v-model="cliente.cpf" v-mask="'###.###.###-##'">
					</div>
					<div class="col-md-12">
						<label for="phone">Telefone</label>
						<input class="form-control" id="phone" name="phone" type="text" v-model="cliente.phone" v-mask="'(##)#####-####'">
					</div>
					<div class="col-md-6">
						<label for="zip_code">Cep</label>
						<input class="form-control" id="zip_code" name="zip_code" type="text" v-model="cliente.zip_code" v-mask="'########'" @change="getdadoscep" placeholder="Digite o cep para realizar a busca">
					</div>
					<div class="col-md-12">
						<label for="address_street">Rua</label>
						<input class="form-control" id="address_street" name="address_street" type="text" v-model="cliente.address_street">
					</div>
					<div class="col-md-4">
						<label for="address_number">Número</label>
						<input class="form-control" id="address_number" name="address_number" type="text" v-model="cliente.address_number">
					</div>
					<div class="col-md-4">
						<label for="address_city">Cidade</label>
						<input class="form-control" id="address_city" name="address_city" type="text" v-model="cliente.address_city">
					</div>
					<div class="col-md-4">
						<label for="address_state">Estado</label>
						<input class="form-control" id="address_state" name="address_state" type="text" v-model="cliente.address_state">
					</div>	
					<div class="col-md-4">
						<label for="address_country">País</label>
						<input class="form-control" id="address_country" name="address_country" type="text" v-model="cliente.address_country">
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