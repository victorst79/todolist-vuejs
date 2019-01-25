<template>
	<div id="notes container">
		<h2>{{ msg }}</h2>
		<input type="text" class="form-control" placeholder="What do you want to remember?" 
		v-model="newTask" 
		v-on:keyup.enter="newNote">
		<div class="dropdown-divider"></div>
		<small> {{countNotes(notes)}} pending tasks of a total {{notes.length}} | <b v-on:click="deleteCompleteNotes">Delete completed tasks</b></small>
		<div class="dropdown-divider"></div>		
		<ul class="list-group">
			<li class="list-group-item" v-for="note in orderNotes">
				<div class="container">               
					<div class="row">
						<div class="col-1 icon-note">
							<img class="complete" v-if="note.state == 'complete'" src="../assets/circle_tick.png">
							<img class="incomplete" v-else src="../assets/circle.png">
						</div>
						<div class="col-10">
							<div class="row">
								<h4 v-if="note.state == 'complete'" class="col-12 title-complete">{{ note.task }}</h4>
								<h4 v-if="note.state == 'incomplete'" class="col-12 title-incomplete">{{ note.task }}</h4>
								<small class="col-6 priority">
									Priority:
									<!-- LOW -->
									<button v-if="note.priority == '1'" v-on:click="priorityLow(note)" class="low col-xs-12">Low</button>
									<button v-else v-on:click="priorityLow(note)" class="disable col-xs-12">Low</button>
									<!-- NORMAL -->
									<button v-if="note.priority == '2'" v-on:click="priorityNormal(note)" class="normal col-xs-12">Normal</button>
									<button v-else v-on:click="priorityNormal(note)" class="disable col-xs-12">Normal</button>
									<!-- HIGH -->
									<button v-if="note.priority == '3'" v-on:click="priorityHigh(note)" class="high col-xs-12">High</button>
									<button v-else v-on:click="priorityHigh(note)" class="disable col-xs-12">High</button>
								</small>
								<small class="col-6">Date: {{ note.date_creation }}</small>
								<!-- <p>Complete: {{ note.state }}</p> -->
							</div>							
						</div>
						<div class="col-1 icon-note">
							<img class="delete" src="../assets/delete.png" v-on:click="deleteNotes(note)">
						</div>				
					</div>
                </div>
			</li>			
		</ul>
		<div class="dropdown-divider"></div>
		<h2>Search Task</h2>
		<input type="text" class="form-control" placeholder="Search"
			v-model="searchTask">
		<ul class="list-group">
			<li class="list-group-item" v-for="note in filteredList">
				<div class="container">               
					<div class="row">
						<div class="col-1 icon-note">
							<img class="complete" v-if="note.state == 'complete'" src="../assets/circle_tick.png">
							<img class="incomplete" v-else src="../assets/circle.png">
						</div>
						<div class="col-10">
							<div class="row">
								<h4 v-if="note.state == 'complete'" class="col-12 title-complete">{{ note.task }}</h4>
								<h4 v-if="note.state == 'incomplete'" class="col-12 title-incomplete">{{ note.task }}</h4>
								<small class="col-6 priority">
									Priority:
									<!-- LOW -->
									<button v-if="note.priority == '1'" v-on:click="priorityLow(note)" class="low col-xs-12">Low</button>
									<button v-else v-on:click="priorityLow(note)" class="disable col-xs-12">Low</button>
									<!-- NORMAL -->
									<button v-if="note.priority == '2'" v-on:click="priorityNormal(note)" class="normal col-xs-12">Normal</button>
									<button v-else v-on:click="priorityNormal(note)" class="disable col-xs-12">Normal</button>
									<!-- HIGH -->
									<button v-if="note.priority == '3'" v-on:click="priorityHigh(note)" class="high col-xs-12">High</button>
									<button v-else v-on:click="priorityHigh(note)" class="disable col-xs-12">High</button>
								</small>
								<small class="col-6">Date: {{ note.date_creation }}</small>
								<!-- <p>Complete: {{ note.state }}</p> -->
							</div>							
						</div>
						<div class="col-1 icon-note">
							<img class="delete" src="../assets/delete.png" v-on:click="deleteNotes(note)">
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
				newTask: "",
				searchTask: "",
				notesOrder: [],
				seekerTask: []
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
			},
			deleteCompleteNotes: function(){
				var notes = this.notes;
				for(let i = 0; i < notes.length; i++){
					if(notes[i].state == "complete"){
						notes.splice(i,notes.length-1);
					}
				}
			},
			deleteNotes: function(note){
				var notes = this.notes;
				for(let i = 0; i < notes.length; i++){
					if(notes[i] == note){
						notes.splice(i,1);
					}
				}
			},
			priorityLow: function(note){
				note.priority = "1";
			},
			priorityNormal: function(note){
				note.priority = "2";
			},
			priorityHigh: function(note){;
				note.priority = "3"
			}
		},
		computed: {
			orderNotes: function(){
				var notes = this.notes;
				this.notesOrder = [];
				for(let i = 0; i < notes.length; i++){
					if(notes[i].priority == 3){
						this.notesOrder.push(notes[i]);
					}
				}
				for(let i = 0; i < notes.length; i++){
					if(notes[i].priority == 2){
						this.notesOrder.push(notes[i]);
					}
				}
				for(let i = 0; i < notes.length; i++){
					if(notes[i].priority == 1){
						this.notesOrder.push(notes[i]);
					}
				}
				return this.notesOrder;
			},
			filteredList: function() {
				if(this.searchTask == "" || this.searchTask == " "){
					return null;
				}else{
					return this.notes.filter(note => {
						return note.task.toLowerCase().includes(this.searchTask.toLowerCase());
					})
				}		
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

	.icon-note{
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
	}
</style>
