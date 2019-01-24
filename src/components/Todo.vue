<template>
	<div id="notes container">
		<h2>{{ msg }}</h2>
		<input type="text" class="form-control" placeholder="What do you want to remember?" 
		v-model="newTask" 
		v-on:keyup.enter="newNote">
		<div class="dropdown-divider"></div>
		<small> {{countNotes(notes)}} pending tasks of a total {{notes.length}} | <b>Delete completed tasks</b></small>
		<div class="dropdown-divider"></div>
		<ul class="list-group">
			<li class="list-group-item" v-for="note in notes">
				<div class="container">                  
					<div class="row">
						<div class="col-1">
							<img class="complete" v-if="note.state == 'complete'" src="../assets/check-solid.svg">
							<img class="incomplete" v-else src="../assets/times-solid.svg">
						</div>
						<div class="col-10">
							<div class="row">
								<h4 v-if="note.state == 'complete'" class="col-12 title-complete">{{ note.task }}</h4>
								<h4 v-if="note.state == 'incomplete'" class="col-12 title-incomplete">{{ note.task }}</h4>
								<small class="col-6 priority">
									Priority:
									<!-- LOW -->
									<button v-if="note.priority == '1'" class="low">Low</button>
									<button v-else class="disable">Low</button>
									<!-- NORMAL -->
									<button v-if="note.priority == '2'" class="normal">Normal</button>
									<button v-else class="disable">Normal</button>
									<!-- HIGH -->
									<button v-if="note.priority == '3'" class="high">High</button>
									<button v-else class="disable">High</button>
								</small>
								<small class="col-6">Date: {{ note.date_creation }}</small>
								<!-- <p>Complete: {{ note.state }}</p> -->
							</div>							
						</div>
						<div class="col-1">
							<img class="delete" src="../assets/minus-square-solid.svg">
						</div>				
					</div>
                </div>
			</li>
		</ul>  
	</div>		
</template>

<script>
	export default {
		name: 'Todo',
		props: {
			msg: String
		},
		data: function(){
			return{
				notes: [
					{
						task: "Sort desk",
						priority: 3,
						date_creation: new Date().toLocaleString(),
						state: "complete"
					},
					{
						task: "Update repositories",
						priority: 1,
						date_creation: new Date().toLocaleString(),
						state: "complete"
					},
					{
						task: "Modify keywords",
						priority: 2,
						date_creation: new Date().toLocaleString(),
						state: "incomplete"
					},
				],
				newTask: ""
			}
		},
		methods: {
			countNotes: function(notes){
				var result = 0;
				for(let i = 0; i < notes.length; i++){
					if(notes[i].state == "incomplete"){
						result++;
					}
				}
				return result;
			},
			newNote: function(){
				var task = this.newTask;
				var priority = parseInt((Math.random() * 3 ) + 1);
				var date_creation = new Date().toLocaleString();
				var state = "incomplete";

				this.notes.push({task,priority,date_creation,state});
			}
		},
		computed: {
			timeCalculated: function(notes){
				return("Time calculated");
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	h2{
		color: white;
		margin-top: 15px;
	}

	ul{
		margin: 15px 0px;
	}

	ul,li{
		color: white;
		background-color: #303030 !important;
	}

	input{
		margin: 20px 0px;
		height: 70px;
	}

	small{
		margin: 20px 0 !important;
		color: white;
	}
	
	small b{
		color: #f39c13;
	}

	.complete,.incomplete{
		width: 40px;
	}

	.delete{
		width: 25px;
	}

	.title-complete{
		color: #00bb8b;
		text-decoration:line-through;
	}

	small button:nth-child(2){
		margin: 0px 5px;
	}

	small.priority button{
		-moz-border-radius:6px;
		-webkit-border-radius:6px;
		border-radius:6px;
		display:inline-block;
		cursor:pointer;
		color:#ffffff;
		font-family:Arial;
		font-size:10px;
		font-weight:bold;
		padding:6px 15px;
		text-decoration:none;
	}

	.disable{
		background-color:#464545;
		-moz-border-radius:6px;
		-webkit-border-radius:6px;
		border-radius:6px;
		border:1px solid #464545;
		display:inline-block;
		cursor:pointer;
		color:#ffffff;
		font-family:Arial;
		font-size:10px;
		font-weight:bold;
		padding:6px 15px;
		text-decoration:none;
	}

	.low{
		background-color:#17a2b8;
		border:1px solid #17a2b8;
	}

	.normal{
		background-color:#375a7f;
		border:1px solid #375a7f;
	}

	.high{
		background-color:#e74d3d;
		border:1px solid #e74d3d;
	}
</style>
