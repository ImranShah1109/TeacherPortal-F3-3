let form = document.querySelector('form');
let email = document.getElementById('email');
let pswd = document.getElementById('pswd');

form.addEventListener('submit',login);

let user = JSON.parse(localStorage.getItem('tUser'));

let valid = false;

if(JSON.parse(localStorage.getItem('currentUser')) != null){
    window.location.href = "./dashboard.html";
}

function login(e){
    e.preventDefault();
    console.log("login",email.value);
    if(email.value == ""){
        alert("Please Enter Email Id");
    }

    const mailReg = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if(!email.value.match(mailReg)){
        alert("Please Enter Proper email");
    }

    const pswdReg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

    if(!pswd.value.match(pswdReg)){
        alert("Password should be 8 character and it's contain number & symbol");
    }

    for (const u of user) {
        if(email.value == u.email && pswd.value == u.pass){
            valid = true;
            let token = generateToken();
            let currentUser = {
                email : u.email,
                name : u.name,
                token : token
            };
            localStorage.setItem('currentUser',JSON.stringify(currentUser));
            alert("Login Successfully");
            window.location.href = "./dashboard.html"
        }
    }

    if(!valid){
        console.log("valid false",valid);
        alert("Please Enter valid email & password");
    }

}

function generateToken(){
    let cap = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let sml = "abcdefghijklmnopqrstuvwxyz";
    let no = "0123456789";
    
    let str = cap + sml + no;
    let token = "";
    for(let i=0;i<16;i++){
        token += str.charAt(Math.floor(Math.random() * str.length));
    }

    return token;
}

// console.log(generateToken());