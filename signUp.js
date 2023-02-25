// console.log("got the form");
let form = document.querySelector('form');
let tName = document.getElementById('tName');
let email = document.getElementById('email');
let pswd = document.getElementById('pswd');
let cpswd = document.getElementById('cpswd');

let valid = true;
let reg = false;

if(JSON.parse(localStorage.getItem('currentUser')) != null){
    window.location.href = "./dashboard.html";
}

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    // console.log(tName.value,email.value,pswd.value);
    let u = JSON.parse(localStorage.getItem('tUser'));
    console.log("u",u);

    if(tName.value == ""){
        alert("Please Enter Your Name")
    }
    if(email.value == ""){
        alert("Please Enter Email Id");
    }
    if(pswd.value == ""){
        alert("Please Enter the password");
    }

    const mailReg = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if(!email.value.match(mailReg)){
        alert("Please Enter Proper email");
        valid = false;
    }
    if(u != null){
        for (const i of u) {
            if(i.email == email.value){
                reg = true;
                valid = false;
            }
        }
    }

     if(reg){
        alert("Already Register email");
     }

    const pswdReg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

    if(!pswd.value.match(pswdReg)){
        alert("Password should be 8 character and it's contain number & symbol")
        valid = false;
    }
    else if(pswd.value != cpswd .value){
        alert("Confirm Password should be match with password");
        valid = false;
    }

    if(valid){
        let user = [];
        let obj = {
            name : tName.value,
            email : email.value,
            pass : pswd.value
        };

        console.log("local",u);
        if(u == null){
            console.log("set");
            user.push(obj);
            localStorage.setItem('tUser',JSON.stringify(user));
        }
        else{
            u.push(obj);
            localStorage.setItem('tUser',JSON.stringify(u));
        }

        alert("Successfully Sign up");
        window.location.href = " ./login.html"
    }
});

