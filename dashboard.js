let currentUser = JSON.parse(localStorage.getItem('currentUser'));

let heading = document.querySelector('.heading');
let p1 = document.createElement('p');
p1.innerText = `Welcome back ${currentUser.name}`;
heading.appendChild(p1);

let p2 = document.createElement('p');
p2.innerText = `Your Email ID : ${currentUser.email}`;
heading.appendChild(p2);


let form = document.querySelector('form');
// console.log(form);

let user = JSON.parse(localStorage.getItem('tUser'));
form.addEventListener('submit',changePassword);

function changePassword(e){
    e.preventDefault();
    let oldPswd = document.getElementById('old');
    let newPswd = document.getElementById('pswd');
    let cPswd = document.getElementById('cpswd');

    let oldPswdFlag = false;
    let index = 0;
    for (let i=0;i<user.length;i++) {
        if(user[i].email == currentUser.email){
            if(user[i].pass == oldPswd.value){
                oldPswdFlag = true;
                index = i;
                console.log("index",index);
            }
        }
    }
    if(!oldPswdFlag){
        alert("Please Enter Correct Password");
    }
    else{

        const pswdReg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

        if(!newPswd.value.match(pswdReg)){
            alert("Password should be 8 character and it's contain number & symbol")
        }
        else if(newPswd.value != cPswd.value){
            alert("Confirm Password should be match with password");
        }
        else{
            user[index].pass = newPswd.value;
            localStorage.setItem('tUser',JSON.stringify(user));
            // console.log(user[index]);
            alert("Password Change Sucessfully");
        }
    }
}

let logoutBtn = document.getElementById('logout');
logoutBtn.addEventListener('click',logout);

function logout(){
    localStorage.removeItem('currentUser');
    alert("Logout Successfully");
    window.location.href = "./login.html";
}