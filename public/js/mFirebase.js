

  var user = {
    IDnumber:"",
    IDtype:"",
    address:"",
    avatar:"",
    birthday:"",
    churchCode:"",
    gender:"",
    lastName:"",
    name:"",
    phone:"",
    rol:""
  }

  /* *********************************************** */
  /* ************** REALTIME DATABASE ************** */
  /* *********************************************** */

  var clienteID = "confra_test";
  var userID = "mEY5ru3CFfcXAwvbV9PlLFWWQew2";
  var usersRef = firebase.database().ref('church/'+ clienteID +'/users/' + userID);


  //Crear registros
  function db_create(newUser){
    console.log("db_create");
    usersRef.set(newUser).then(function(){
      console.log("usuario resistrado exitosamente");
    });
  }

  //Leer registros una vez
  function db_readOnce(){
    usersRef.once('value').then(function(snapshot) {
      console.log("db_readOnce");
    });
  }

  //Leer registros y actualizarlos con cada que hayan cambios
  function db_readOnUpdate(){
    usersRef.on('value', function(snapshot) {
      console.log("db_readOnUpdate");
    }); 
  }

  //Actualizar un registro
  function db_update(ref,value){
    console.log("db_update");
    var updates = {};

    updates['/'+ref] = value;
    return usersRef.update(updates);
  }  

  //Eliminar un registro
  function db_delete(ref){
    //this remove reference
    console.log("db_delete");
    ref.remove();
  }  


  
  function db_onChildAdded(){
    usersRef.on('child_added', function(snapshot) {
      console.log(snapshot.key);
    });
  }

  function db_onChildChanged(){
    usersRef.on('child_changed', function(snapshot) {
      $("#userTable").html("OA");
      console.log("child_changed");
    });  
  }

  function db_onChildRemoved(){
    usersRef.on('child_removed', function(snapshot) {
      console.log("child_removed");
    });  
  }





  /* *********************************************** */
  /* ******************* LOGIN.JS ****************** */
  /* *********************************************** */

  var email = "egonz993@gmail.com",
      password = "admin00120";

  /*LOGIN*/
  function signIn(){
    firebase.auth().signInWithEmailAndPassword(email, password)
    .catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
    })
  }


  
  function signOut(){
    firebase.auth().signOut()
  }



  /* *********************************************** */
  /* ****************** SIGNUP.JS ****************** */
  /* *********************************************** */


  var form_signup =  document.getElementById("form_signup"); 

  var btn_signup = $("#btn_signup");
  btn_signup.on("click", function(e){
    e.preventDefault();
    valideteForm();
  });



  function valideteForm(){

    var form_name = form_signup.elements.namedItem("name");
    var form_lastname =  form_signup.elements.namedItem("lastname");
    var form_birthday =  form_signup.elements.namedItem("birthday");
    var form_phone =  form_signup.elements.namedItem("phone");
    var form_gender =  form_signup.elements.namedItem("gender");

    var form_email =  form_signup.elements.namedItem("email");
    var form_password =  form_signup.elements.namedItem("password");


    var error = 0;

    if(form_name.value.length == 0){
      $(form_name).addClass("bg-warning");
      error++;
    }

    if(form_lastname.value.length == 0){
      $(form_lastname).addClass("bg-warning");
      error++;
    }

    if(form_birthday.value.length == 0){
      $(form_birthday).addClass("bg-warning");
      error++;
    }

    if(form_phone.value.length == 0){
      $(form_phone).addClass("bg-warning");
      error++;
    }

    if(form_gender.value.length == 0){
      $(form_gender).addClass("bg-warning");
      error++;
    }

    if(form_email.value.length == 0){
      $(form_email).addClass("bg-warning");
      error++;
    }

    if(form_password.value.length == 0){
      $(form_password).addClass("bg-warning");
      error++;
    }


    if(!error){

      var new_user = {
          tipoID : "",
          numeroID : "",
          nombre : form_name.value,
          apellido : form_lastname.value,
          fechaNac : form_birthday.value,
          telefono : form_phone.value,
          genero : form_gender.value,
          direccion : "",
          avatar : "",
          iglesia : "",
          isAdmin : "",
          rol : ""
        }


      firebase.auth().createUserWithEmailAndPassword(form_email.value, form_password.value)

      .catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;

        console.log(errorCode);
        console.log(errorMessage);
      })

      .then(function(){
        console.log("usuario activo: "+ firebase.auth().currentUser.uid);
        firebase.auth().useDeviceLanguage();
        firebase.auth().currentUser.sendEmailVerification();

        userID = firebase.auth().currentUser.uid;
        usersRef = firebase.database().ref('clientes/'+ clienteID +'/usuarios/' + userID);
        db_create(new_user);
      });



    }else{
      $(form_name).removeClass("bg-warning");
      $(form_lastname).removeClass("bg-warning");
      $(form_birthday).removeClass("bg-warning");
      $(form_phone).removeClass("bg-warning");
      $(form_gender).removeClass("bg-warning");
      $(form_email).removeClass("bg-warning");
      $(form_password).removeClass("bg-warning");
      console.log("errors " + error);
    }

  }


  /* ********************************************** */
  /* ****************** INDEX.JS ****************** */
  /* ********************************************** */



  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log("onAuthStateChanged: user"+firebase.auth().currentUser.uid);
      //window.location = "index.html";

    } else {
      console.log("onAuthStateChanged: No user");
      //window.location = "login.html";
    }
  });

  



//db_create();
//db_readOnce();
//db_readOnUpdate();
//db_update();
//db_delete();

//db_onChildAdded();
//db_onChildChanged();
//db_onChildRemoved();
