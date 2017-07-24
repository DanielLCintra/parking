<script>
	export default{
		props:['width','height',"texto"],
		computed:{

			text(){
				if (this.texto == undefined){
					return "Carregando..."
				}else{
					return this.texto
				}
			}

		}
	}
</script>

<template>
	<div>
		<br><br><br>
		<div class="text-center">
			<i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
		</div>

		<div class="text-center" style="margin-top: 25px;">
			<h5 style="margin-left: 12px;">{{ text }}</h5>
		</div>

		<br><br><br>
	</div>
</template>

<style>

.cssload-loader {
	width:50px;
	height:50px;
	position: absolute;
	left: 50%;
	transform: translate3d(-50%, -50%, 0);
		-o-transform: translate3d(-50%, -50%, 0);
		-ms-transform: translate3d(-50%, -50%, 0);
		-webkit-transform: translate3d(-50%, -50%, 0);
		-moz-transform: translate3d(-50%, -50%, 0);
	perspective: 1200;
		-o-perspective: 1200;
		-ms-perspective: 1200;
		-webkit-perspective: 1200;
		-moz-perspective: 1200;
}

.cssload-flipper {
	position: relative;
	display: block;
	height: inherit;
	width: inherit;
	animation: cssload-flip 1.38s infinite ease-in-out;
		-o-animation: cssload-flip 1.38s infinite ease-in-out;
		-ms-animation: cssload-flip 1.38s infinite ease-in-out;
		-webkit-animation: cssload-flip 1.38s infinite ease-in-out;
		-moz-animation: cssload-flip 1.38s infinite ease-in-out;
	transform-style: preserve-3d;
		-o-transform-style: preserve-3d;
		-ms-transform-style: preserve-3d;
		-webkit-transform-style: preserve-3d;
		-moz-transform-style: preserve-3d;
}

.cssload-front,
.cssload-back {
	position: absolute;
	top: 0;
	left: 0;
	display: block;
	background-image: url("/agentes/public/img/favicon.ico");
	background-size:100%;
	height: 100%;
	width: 100%;
	backface-visibility: hidden;
}

.cssload-back {
	z-index: 800;
	transform: rotateY(-180deg);
		-o-transform: rotateY(-180deg);
		-ms-transform: rotateY(-180deg);
		-webkit-transform: rotateY(-180deg);
		-moz-transform: rotateY(-180deg);
}



@keyframes cssload-flip {
	0% {
		transform: perspective(117px) rotateX(0deg) rotateY(0deg);
	}

	100% {
		transform: perspective(117px) rotateX(-180deg) rotateY(-179.9deg);
	}
}



</style>
