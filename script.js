// // access the html elements into javascript
// const Inputval=document.getElementById('val')
// function to retrive the data from the local storage
document.addEventListener("DOMContentLoaded", () => {
  DataPresent = localStorage.getItem("taskname");
  console.log(DataPresent);
  if (DataPresent !== null) {
    Tasklist = JSON.parse(DataPresent);
    DynamicRendering;
  }
});

// array to store the todo
let Tasklist = [];
// function to save the task
function Savetask() {
  const Taskname = document.getElementById("val").value;
  // trim method to remove the spaces from the input
  if (Taskname.trim() !== "") {
    let taskdata = {
      // length property to increase the id value each-time the user enters a new value
      Id: Tasklist.length + 1,
      taskname: Taskname, //input value entered by user
    };
    // pushing the data into array
    Tasklist.push(taskdata);
  }
  // used to empty the input value once the task is added
  document.getElementById("val").value = "";
  // calling the dynamicrendering function
  DynamicRendering();
}
// to add into local storage
localStorage.setItem("taskname", JSON.stringify(Tasklist));

// // calling the dynamicrendering function
// DynamicRendering()
// function for dynamic rendering of list
function DynamicRendering() {
  // debugger;
  document.getElementById("Tasks").innerHTML = "";
  for (i = 0; i < Tasklist.length; i++) {
    // creating the li element
    let DynamicLi = document.createElement("li");
    // adding the class attribute value to li
    DynamicLi.classList.add("task");
    // creating the paragraph element
    let paraEle = document.createElement("p");
    //adds text values in the dynamic list
    paraEle.innerHTML = Tasklist[i].taskname;
    // appending paragraph element into list (li)element
    DynamicLi.appendChild(paraEle);
    // appending the li to ul list
    document.getElementById("Tasks").appendChild(DynamicLi);
    // creating the div element to add edit and delete icons
    const Divele = document.createElement("div");
    // adding class attribute value for styling purpose
    Divele.classList.add("crud");

    // creating the edit icon and adding the class it
    const EditIcon = document.createElement("i");
    EditIcon.classList.add("bi");
    EditIcon.classList.add("bi-pencil-square");
    // adding the functionality to editicon
    EditIcon.addEventListener("click", EditTask);
    // getting the specific id through the Edit Icon
    EditIcon.Id = Tasklist[i].Id;
    // creating the delete icon and adding the class it
    const DeleteIcon = document.createElement("i");
    DeleteIcon.classList.add("bi");
    DeleteIcon.classList.add("bi-trash");
    // adding the functionality to deleteicon
    DeleteIcon.addEventListener("click", DeleteTask);
    DeleteIcon.Id = Tasklist[i].Id;
    //appending both edit and delete icons to the div ele
    Divele.appendChild(EditIcon);
    Divele.appendChild(DeleteIcon);
    //appending div element to dynamiclist
    DynamicLi.appendChild(Divele);
  }
}
// function for editing the task
function EditTask(e) {
  console.log(e.target);
  // targeting the specific id through find index method
  var Ed = Tasklist.find((d) => d.Id == e.target.Id);
  console.log(Ed);
  document.getElementById("val").value = Ed.taskname;
}
// function for deleting the task
function DeleteTask(e) {
  console.log(e.target);
  var index = Tasklist.findIndex((d) => d.Id == e.target.Id);
  console.log(index);
  Tasklist.splice(index, 1);
  // update the deleted task in local storage
  localStorage.setItem("taskname", JSON.stringify(Tasklist));
  DynamicRendering();
}
// function to remove all the task
function Removetask() {
  Tasklist.splice(0);
  // to remove all the items in the local storage
  localStorage.removeItem("taskname");
  DynamicRendering();
}
