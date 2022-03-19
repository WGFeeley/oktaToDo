//callMessage  - restore
$(document).ready(() => data.restore());

// Allow insertion using enter key
$(myInput).keypress(function(event){
	if(event.keyCode == '13'){
		newElement();
	}
});

// /From W3Schools - https://www.w3schools.com/howto/howto_js_todolist.asp*
function setChildrenProperties(){
  // Create a "close" multiplication sign (u00D7) and add to each displayed to do list item
  var myNodelist = document.getElementsByTagName("LI");

  for (node of myNodelist){
    let span = document.createElement("SPAN");
    let txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    node.appendChild(span);
  }

  // Click on a close sign to remove a displayed to do list item
  let close = document.getElementsByClassName("close");

  for (obj of close){
    obj.onclick = function (){
      this.parentElement.remove();
	  //callMessage  - save
      data.save();
    }
  }

  // Add a "checked" symbol when clicking on a displayed to do list item
  var list = document.querySelector('ul');
    if (list.getAttribute('listener') !== 'true'){
      list.setAttribute('listener', 'true');
      list.addEventListener('click', function (ev){
        if (ev.target.tagName === 'LI'){
          ev.target.classList.toggle('checked');
		  //callMessage  - save
          data.save();
        }
      }, false);
    }
}

// Create a new list item when clicking on the "Add" button
function newElement(){
  let li = document.createElement("li");
  let inputValue = document.getElementById("myInput").value;
  let t = document.createTextNode(inputValue);
  li.appendChild(t);
  //do not allow empty string
  if (inputValue === ''){
    alert("You must write something!");
  } 
  else{
    document.getElementById("myUL").appendChild(li);
  }
  document.getElementById("myInput").value = "";

  let span = document.createElement("SPAN");
  let txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);
  setChildrenProperties();
  //callMessage  - save
  data.save();
}