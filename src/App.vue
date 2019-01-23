<template>
  <div id="app">
	<div id="nav">
		<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
			<a class="navbar-brand" href="#">
				<img src="./assets/logo_todo.jpg">
			</a>
			<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
				<span class="navbar-toggler-icon"></span>
			</button>
			<div class="collapse navbar-collapse" id="navbarSupportedContent">
				<ul class="navbar-nav mr-auto">
				<li class="nav-item active">
					<a class="nav-link" href="#"><router-link to="/">Notes</router-link></a>
				</li>
				<li class="nav-item">
					<a class="nav-link" href="#"><router-link to="/weather">Weather</router-link></a>
				</li>
				</ul>
			</div>
		</nav>
	</div>
	<router-view/>
	<Footer></Footer>
  </div>
</template>

<style>
	body{
		color: white;
		background: #222222 !important;
	}

	/* #app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin-top: 60px;
	} */

	nav img{
		width: 50px;
		height: 60px;
	}
</style>

<script>
import Footer from '@/components/Footer.vue'
export default {
	name: 'index',
	components: {
		Footer
	}
}
</script>
