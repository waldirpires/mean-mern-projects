import {Component, View, bootstrap, For} from 'angular2/angular2';
import {TodoFactory} from 'bdms-factory';
 
// Annotation section
@Component({
  selector: 'bdms-app'
})
 
@View({
  templateUrl: 'components/bdms-app/bdms-app.html',
  directives : [For]
})
 
// Component controller
class BdmsppComponent {
 
  donations: Array;
 
  constructor() {
    this.donations = [];
 
    TodoFactory.getAll().then((data) =>{
       this.donations = data;
    });
  }
 
  addTodo($event, todoText) {
    if($event.which === 13) {
      var _todo = {
        text : todoText.value,
        isCompleted : false
      };
 
      TodoFactory.save(_todo).then((data)=>{
        // keep things in sync
        this.donations.push(data);
        todoText.value = '';
      })
    }
  }
 
  updateTodoText($event, todo){
  	if($event.which === 13){
  		todo.text = $event.target.value;
      var _todo = {
        _id : todo._id,
        text : todo.text ,
        isCompleted : todo.isCompleted
      };
     
      TodoFactory.update(_todo).then((data)=>{
         // console.log(data); -> {ok: true, n: 1, updatedExisting: true}
         // wait for the response before resetting the state 
         this.setEditState(todo, false);
      });
  	}
  }
 
  updateStatus(todo){
     var _todo = {
        _id : todo._id,
        text : todo.text ,
        isCompleted : !todo.isCompleted
      };
 
      TodoFactory.update(_todo).then((data)=>{
         // console.log(data); -> {ok: true, n: 1, updatedExisting: true}
         // wait for the response before updating the UI
         todo.isCompleted = !todo.isCompleted; 
      });
  	
  }
 
  deleteTodo(todo){
    var donations = this.donations;
 
  	TodoFactory.delete(todo._id).then((data)=>{
         if(data.n == 1){
          // save a n/w call by updating the local array
          // instead of making a GET call again to refresh the data 
          for (var i = 0; i < donations.length; i++) {
            if(donations[i]._id == todo._id){
              donations.splice(i, 1);
            }
          };
 
         }
      });
  }
 
  setEditState(donation, state){
  	if(state){
  	  	donation.isEditMode = state;
  	}else{
  		// don't store unwanted presentation logic in DB :/
  		delete donation.isEditMode;
  	}
  }
}
 
bootstrap(TodoAppComponent);