class User{
    constructor(firstName, lastName, position, salary, userId){
        this.firstName = firstName;
        this.lastName = lastName;
        this.position = position;
        this.salary = salary;
        this.userId = userId;
    }
}

class Store{
    static getUsers(user){
        let users;
        if(localStorage.getItem('users') === null){
            users = [];
        } else{
            users = JSON.parse(localStorage.getItem('users'))
        }

        return users;
    };

    static addUser(user){
        const users = Store.getUsers();
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
    };

    static removeUser(userId){
        const users = Store.getUsers();
        users.forEach((user, index)=> {
            if(user.userId == userId){
                users.splice(index, 1)
            }
        })
        localStorage.setItem('users', JSON.stringify(users))
    }
}

class UI{
    static displayUsers(){
         const users = Store.getUsers();
        
         users.forEach((user) => UI.addUserToStaff(user));
    
    }

    static addUserToStaff(user){
        const list = document.querySelector('#user-list');
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.firstName}</td>
            <td>${user.lastName}</td>
            <td>${user.position}</td>
            <td>${user.salary}</td>
            <td>${user.userId}</td>
            <td data-userId="${user.userId}">
                <a href="#" data-type="edit" class="btn btn-success btn-sm delete">&#9998</a>
                <a href="#" data-type="delete" class="btn btn-danger btn-sm delete">X</a>
            </td>
        `;

        list.appendChild(row);
    }

    static clearUserInputValue(){
        document.querySelector('#firstName').value = '';
        document.querySelector('#lastName').value = '';
        document.querySelector('#position').value = '';
        document.querySelector('#salary').value = '';
        // document.querySelector('#userId').value = '';
    }

    static showAlert(message, className){
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.innerHTML = message;
        document.querySelector('#alert-container').append(div);

        setTimeout(() =>{
            document.querySelector('.alert').remove();
        },2000)
    }

    static deleteUser(value){
        value.parentElement.parentElement.remove()
    }
}

const generateRandomId = () => Date.now().toString().slice(-5);



document.addEventListener('DOMContentLoaded', () =>{
    UI.displayUsers()
})

document.querySelector('#user-form').addEventListener('submit', e => {
    e.preventDefault();
    const firstName = document.querySelector('#firstName').value;
    const lastName = document.querySelector('#lastName').value;
    const position = document.querySelector('#position').value;
    const salary = document.querySelector('#salary').value;
    // const userId = document.querySelector('#userId').value;

    if (firstName && lastName && position && salary){  //&&  userId
        const user = new User(firstName, lastName, position, salary, generateRandomId());  //,userId
        UI.addUserToStaff(user);
        UI.clearUserInputValue();
        UI.showAlert('Added User', 'success');
        Store.addUser(user);
    }else {
        UI.showAlert('Empty fields', 'danger');
    }

})

document.querySelector('#user-list').addEventListener('click', e => {
    //remove user from UI
    if(e.target.closest('[data-type="delete"]')){
       const userId = e.target.parentElement.previousElementSibling.innerHTML;
       Store.removeUser(userId)
       UI.deleteUser(e.target)

    }
    
});


let loginBtn = document.getElementById('login');
let loginModal = document.getElementById('modal-login');
let closeBtn = document.getElementsByClassName('closeBtn')[0];
let loginContr = document.querySelector('.buttons');

loginBtn.addEventListener('click', openModal);

closeBtn.addEventListener('click', closeModal);

window.addEventListener('click', outerClick);

function openModal() {
    loginModal.style.display = 'block';
    loginContr.style.display = 'none';
}

function closeModal(e) {
    loginModal.style.display = "none";
    loginContr.style.display = 'block';
}

function outerClick(e){
    if (e.target == loginModal) {
     loginModal.style.display = "none";
     loginContr.style.display = 'block';
   }
}
