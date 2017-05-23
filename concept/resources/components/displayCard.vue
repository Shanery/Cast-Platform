<template>
	<div class="card">
		<header class="card-header">
	    <p class="card-header-title">
	      {{cardTitle}}
	    </p>
	    <a class="card-header-icon">
	      <span class="icon">
	        <i class="fa fa-angle-down"></i>
	      </span>
	    </a>
	  </header>
	  <div class="card-content">
	    <div class="content">
	      <div class="info box" v-for="goal in cardInfo[0].subGoals"> 
					<section><h1>{{ goal.title }}</h1></section>
					<section><p>{{ goal.description }}</p></section>
				</div>

				<div class="info box" v-for="goal in cardInfo[0].subGoals[0].desiredProperties"> 
					<section><h1>{{ goal.title }}</h1></section>
					<section><p>{{ goal.description }}</p></section>
				</div>
			</div>
	  </div>
	  <footer class="card-footer">
	    <a class="card-footer-item">Check</a>
	  </footer>

		

			<!-- Fix to be adaptive -->
	</div>
</template>

<script>
	export default {
		name: 'displayCard',
		props: {
			cardTitle: String,
			// Data of the card to be displayed
			cardInfo: [Array, Object]
		}
	}
</script>

<style scoped>
	p {
		font-size: 12px;
	}

	h1 {
		font-weight: bold;
		flex-grow: 0;
	}

	.card-header-title{
		font-size: 24px;
	}

	.box {
		display: flex;
		flex-direction: column;
	}
</style>