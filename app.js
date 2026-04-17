function signup(){

    var name = document.getElementById("name").value
    var email = document.getElementById("email").value
    var password = document.getElementById("password").value

    // validation
    if(name === "" || email === "" || password === ""){
        Swal.fire("Error", "All fields are required!", "error")
        return
    }

    var users = JSON.parse(localStorage.getItem("users"))

    if(!users){
        users = []
    }

    // check if email already exists
    var checkUser = users.find(user => user.email === email)

    if(checkUser){
        Swal.fire("Error", "User already exists!", "error")
        return
    }

    var userData = {
        name: name,
        email: email,
        password: password
    }

    users.push(userData)

    localStorage.setItem("users", JSON.stringify(users))

    Swal.fire("Success", "Signup successful!", "success")

    // redirect to login
    setTimeout(()=>{
        window.location.href = "login.html"
    }, 1500)
}


function login(){

    var email = document.getElementById("email").value
    var password = document.getElementById("password").value

    if(email === "" || password === ""){
        Swal.fire("Error", "Please fill all fields!", "error")
        return
    }

    var users = JSON.parse(localStorage.getItem("users"))

    if(!users){
        Swal.fire("Error", "No user found! Please signup first", "error")
        return
    }

    var user = users.find(u => u.email === email && u.password === password)

    if(user){
        Swal.fire("Success", "Login successful!", "success")

        // save current user
        localStorage.setItem("currentUser", JSON.stringify(user))

        setTimeout(()=>{
            window.location.href = "dashboard.html"
        }, 1500)

    }else{
        Swal.fire("Error", "Invalid email or password", "error")
    }
}

function post() {
    var fontSize = document.getElementById("fontSize").value;
    var bold = document.getElementById("bold").checked;
    var italic = document.getElementById("italic").checked;

    var style = `font-size:${fontSize};`;

    if (bold) {
        style += "font-weight:bold;";
    }
    if (italic) {
        style += "font-style:italic;";
    }

    var title = document.getElementById("title")
    var description = document.getElementById("description")
    var posts = document.getElementById("posts") 
    if (title.value.trim() && description.value.trim()) {
        posts.innerHTML += `
 <div class="card text-center">
                    <div class="card-header bg-dark1 text-bdark fw-bold">
                     Post
                    </div>
                    <div class="card-body bg-light1">
                        <h5 class="card-title text-light" style="${style}">${title.value}</h5>
<p class="card-text my-3 text-light" style="${style}">${description.value}</p>
                        <a href="#" class="btn btn-success" onclick="deletepost(this)">Delete</a>
                        <a href="#" class="btn btn-success" onclick="editpost(this)">Edit</a>
                    </div>
                    <div class="card-footer text-bdark bg-dark1">
                        
                    </div>
                </div>
 `
        title.value = ""
        description.value = ""
    } else {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Title & description can't be empty!",
        });
    }

}

function deletepost(e) {
event.preventDefault()

  Swal.fire({
    title: 'Are you sure?',
    text: "This post will be deleted!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it',
    cancelButtonText: 'No'
  }).then(function(result) {

    if (result.isConfirmed) {

      e.closest('.card').remove();

      
      Swal.fire(
        'Deleted!',
        'Your post has been deleted.',
        'success'
      );
    }

  });
}
function editpost(e) {

  Swal.fire({
    title: 'Are you sure?',
    text: "Do you want to edit this post?",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes',
    cancelButtonText: 'No'
  }).then(function(result) {

    if (result.isConfirmed) {

      var card = e.parentNode.parentNode

      var titleval = card.children[1].children[0]
      var descriptionval = card.children[1].children[1]

      title.value = titleval.innerHTML
      description.value = descriptionval.innerHTML

      e.closest('.card').remove();

      // ✅ Success Alert
      Swal.fire(
        'Edited!',
        'Your post is ready to edit.',
        'success'
      );
    }

  });
}





function selectImg(src){
    cardBg = src
    console.log(src, event.target.classList);
    // event.target.className += " selectedImg"
    var bgImg = document.getElementsByClassName("bgImg")
    for(var i = 0; i<bgImg.length; i++){
        console.log(bgImg[i].className);
        bgImg[i].className = "bgImg"
    }
    event.target.classList.add("selectedImg")
}