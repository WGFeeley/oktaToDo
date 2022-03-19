class Data{

callMessagesApi(api, parameters){

    const accessToken = oktaSignIn.authClient.getAccessToken();
	// If user still logged in
    if (accessToken){
      // Make a request using jQuery
      $.ajax({
        // Your API or resource server:
        type: (api  == 'save')? 'POST' : 'GET',
        url: `/data/${api}`,
        data: { info : parameters },
        dataType: 'json',
        headers: {
          Authorization: 'Bearer ' + accessToken
        },
        success: function (response){
          //console.log('Messages', response); //debugging
          Data.onResponse(response?.info);
        },
        error: function (response){
         //console.error(response); //debugging
        }
      });
    }
  }
  
  save(){
    let nodelist = document.getElementById("myUL").children;
    let elements = [];

    for (let node of nodelist){
      elements.push(Base64.encode(node.outerHTML));
    }

    this.callMessagesApi('save', elements);
  }
  
  restore(){
    this.callMessagesApi('restore');
  }

  //return response to build todolist 
  static onResponse(elements){

    if (elements){
      $(myUL).empty();
      
      for (let element of elements){
        $(myUL).append(Base64.decode(element));
      }

      setChildrenProperties();
    }
  }
}

const data = new Data;