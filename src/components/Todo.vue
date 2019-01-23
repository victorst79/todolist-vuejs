<template>
	<div id="notes">
		<h1>{{ msg }}</h1>
		<ul class="list-group">
			<li class="list-group-item" v-for="note in notes" v-bind:key="note">
				<div>
                    <h4>Task: {{ note.task }}</h4>
                    <p>Priority: {{ note.priority }}</p>
                    <p>Date: {{ note.date_creation }}</p>
                    <p>Complete: {{ note.state }}</p>
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
					}
				],
				newTask: "",
				stateTask: [],
				notesFilter: function(){
					var self = this;
					return self.notes.filter(function(note){
						console.log(self.stateTask);
						return note.state == self.stateTask[0] || note.state == self.stateTask[1];
					});
				}
			}
		},
		methods: {
			newNote: function(){
				var task = this.newTask;
				var priority = parseInt((Math.random() * 3 ) + 1);
				var date_creation = new Date().toLocaleString();
				var state = "incomplete";

				this.notes.push({task,priority,date_creation,state});
			},

			countNotes: function(notes){
				var result = 0;
				for(let i = 0; i < notes.length; i++){
					if(notes[i].state == "incomplete"){
						result++;
					}
				}
				return result;
			}
		},
		computed: {
			notesFilter: function(){
				var self = this;
				return self.notes.filter(function(note){
					console.log(self.stateTask);
					return note.state == self.stateTask[0] || note.state == self.stateTask[1];
				});
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	h1{
		color: white;
	}
	ul,li{
		color: white;
		background-color: #303030 !important;
	}
</style>
