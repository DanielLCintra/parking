<script>

	import moment from 'moment'
	import DcModal from '../general/dc-modal.vue'

	export default {
		name: 'DcEmpresasForm',
		components:{
			DcModal
		},
		data(){
			return {
				isEditing: false,
				empresa:{
					id: 0,
					company_name: '',
					cnpj:'',
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
	   				url = `company/${this.empresa.id}`

	   				if (this.empresa.company_name !== '' && this.empresa.cnpj !== '' && this.empresa.phone !== ''){

	   					this.empresa.cnpj = this.empresa.cnpj.replace('.','')
	   					this.empresa.cnpj = this.empresa.cnpj.replace('.','')
	   					this.empresa.cnpj = this.empresa.cnpj.replace('-','')

	   					this.empresa.phone = this.empresa.phone.replace('(','')
	   					this.empresa.phone = this.empresa.phone.replace(')','')
	   					this.empresa.phone = this.empresa.phone.replace('-','')

		   				this.$http 
		   					.patch(url, this.empresa)
		   					.then(res => {

		   						if(res.data.status !== 0){
		   						
		   							VmThis.$bus.$emit('open-modal',{titulo: 'Informação',texto: res.data.message,cor: 'yellow'})
		   						
		   						}else{

		   							VmThis.$bus.$emit('open-modal',{titulo: 'Sucesso',texto: 'Empresa atualizada com sucesso.',cor: 'green'})

		   							this.$bus.$emit('create',{dados: _.clone(this.empresa)})

		   						}
		   					})
		   					.catch(error =>{

		   						VmThis.$bus.$emit('open-modal',{titulo: 'Erro',texto: 'Houve um erro ao gravar o empresa.',cor: 'red'})

		   					})
		   			}else{

		   				VmThis.$bus.$emit('open-modal',{titulo: 'Informação',texto: 'Para gravar os dados da empresa é obrigatório informar um nome, um cnpj e um telefone.',cor: 'yellow'})
		   			
		   			}


	   			}else{

	   				url = 'client'

	   				if (this.empresa.company_name !== '' && this.empresa.cpf !== '' && this.empresa.phone !== ''){

	   					this.empresa.cpf = this.empresa.cpf.replace('.','')
	   					this.empresa.cpf = this.empresa.cpf.replace('.','')
	   					this.empresa.cpf = this.empresa.cpf.replace('-','')

	   					this.empresa.phone = this.empresa.phone.replace('(','')
	   					this.empresa.phone = this.empresa.phone.replace(')','')
	   					this.empresa.phone = this.empresa.phone.replace('-','')

		   				this.$http 
		   					.post(url, this.empresa)
		   					.then(res =>{

		   						if(res.data.status !== 0){

		   							VmThis.$bus.$emit('open-modal',{titulo: 'Informação',texto: res.data.message,cor: 'yellow'})

		   						}else{

		   							VmThis.$bus.$emit('open-modal',{titulo: 'Sucesso',texto: 'empresa gravado com sucesso.',cor: 'green'})

		   							this.$bus.$emit('create',{dados: _.clone(this.empresa)})
		   						}
		   					})
		   					.catch(error =>{
		   						VmThis.$bus.$emit('open-modal',{titulo: 'Erro',texto: 'Houve um erro ao gravar o empresa.',cor: 'red'})
		   					})
		   			}else{

		   				VmThis.$bus.$emit('open-modal',{titulo: 'Informação',texto: 'Para gravar um novo empresa é obrigatório informar um nome, um cnpj e um telefone.',cor: 'yellow'})
		   			
		   			}
	   			}

	   			

        	},
        	getdadoscep(){

        		const VmThis = this

        		this.$axios
        			.get(`http://viacep.com.br/ws/${this.empresa.zip_code}/json/`)
        			.then(res =>{
        		
        				if (!res.data.erro){

        					VmThis.empresa.address_street = res.data.logradouro
        					VmThis.empresa.address_city = res.data.localidade
        					VmThis.empresa.address_state = res.data.uf	
        				
        				}else{


        					VmThis.$bus.$emit('open-modal',{titulo: 'Informação',texto: 'Cep inválido ou inexistente',cor: 'red'})

        					VmThis.empresa.address_street = ''
        					VmThis.empresa.address_city = ''
        					VmThis.empresa.address_state = ''

        				}
        				
        			})
        			.catch(error =>{	

        				VmThis.$bus.$emit('open-modal',{titulo: 'Informação',texto: 'Cep inválido ou inexistente',cor: 'red'})

        			})
        	}
		},
		mounted (){

			const modal = $(this.$refs.modal)

			this.$bus.$on('open-form-empresa', (obj) => {

				if (obj.empresa !== undefined){

					this.isEditing = true

					this.empresa.id = obj.empresa.id
					this.empresa.company_name = obj.empresa.company_name
					this.empresa.cnpj = obj.empresa.cnpj
					this.empresa.zip_code = obj.empresa.zip_code
					this.empresa.phone = obj.empresa.phone
					this.empresa.address_street = obj.empresa.address_street
					this.empresa.address_number = obj.empresa.address_number
					this.empresa.address_city = obj.empresa.address_city 
					this.empresa.address_state = obj.empresa.address_state 
					this.empresa.address_country = obj.empresa.address_country

				}else{

					this.empresa.id = obj.last_id+1
					this.isEditing = false

				}

				modal.modal('show')
			})

			modal.on('hidden.bs.modal', () => {

				this.empresa.id = 0
				this.empresa.company_name = ''
				this.empresa.cpf = ''
				this.empresa.zip_code = ''
				this.empresa.phone = ''
				this.empresa.address_street = ''
				this.empresa.address_number = ''
				this.empresa.address_city = '' 
				this.empresa.address_state = '' 
				this.empresa.address_country = ''
			
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
						<label for="company_name">Nome</label>
						<input class="form-control" id="company_name" name="company_name" type="text" v-model="empresa.company_name">
					</div>
					<div class="col-md-12">
						<label for="cnpj">CNPJ</label>
						<input class="form-control" id="cnpj" name="cnpj" type="text" v-model="empresa.cnpj" v-mask="'##.###.###/####-##'">
					</div>
					<div class="col-md-12">
						<label for="phone">Telefone</label>
						<input class="form-control" id="phone" name="phone" type="text" v-model="empresa.phone" v-mask="'(##)#####-####'">
					</div>
					<div class="col-md-6">
						<label for="zip_code">Cep</label>
						<input class="form-control" id="zip_code" name="zip_code" type="text" v-model="empresa.zip_code" v-mask="'########'" @change="getdadoscep" placeholder="Digite o cep para realizar a busca">
					</div>
					<div class="col-md-12">
						<label for="address_street">Rua</label>
						<input class="form-control" id="address_street" name="address_street" type="text" v-model="empresa.address_street">
					</div>
					<div class="col-md-4">
						<label for="address_number">Número</label>
						<input class="form-control" id="address_number" name="address_number" type="text" v-model="empresa.address_number">
					</div>
					<div class="col-md-4">
						<label for="address_city">Cidade</label>
						<input class="form-control" id="address_city" name="address_city" type="text" v-model="empresa.address_city">
					</div>
					<div class="col-md-4">
						<label for="address_state">Estado</label>
						<input class="form-control" id="address_state" name="address_state" type="text" v-model="empresa.address_state">
					</div>	
					<div class="col-md-4">
						<label for="address_country">País</label>
						<input class="form-control" id="address_country" name="address_country" type="text" v-model="empresa.address_country">
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