const modalWrapper = document.querySelector('.modal-wrapper');

// modal acc
const accModal = document.querySelector('.acc-modal');
// btn acc
const btnAcc = document.querySelector('.btn-acc');

// modal add
const addModal = document.querySelector('.add-modal');
const addModalForm = document.querySelector('.add-modal .form');
// btn add
const btnAdd = document.querySelector('.btn-add');

// modal edit
const editModal = document.querySelector('.edit-modal');
const editModalForm = document.querySelector('.edit-modal .form');

// modal info
const infoModal = document.querySelector('.info-modal');
// btn info
const btnInfo = document.querySelector('.btn-info');

// modal added
const addedModal = document.querySelector('.added-modal');
// modal deleted
const deletedModal = document.querySelector('.deleted-modal');

// innerHTML variables
const tableUsers = document.querySelector('.table-users');
let headerAcc = document.querySelector('.header-acc');
let noteAcc = document.querySelector('.note-acc');

let id;



// Add Account function
function addAccount() {
    addModal.classList.add('modal-show');

    addModalForm.username.value = '';
    addModalForm.email.value = '';
    addModalForm.phoneNumber.value = '';
}
// addBtnEventHandler
var addBtnEventHandler = function() { addAccount(); };

// No Account function
function noAcc() {    
    headerAcc.innerText = `You do not have an account`;
    noteAcc.innerText = `Please sign up to view your account.`;
    btnAdd.addEventListener('click', addBtnEventHandler, true);
    btnAdd.classList.remove('inactive');
}
// Plus Account function
function plusAcc() {
    headerAcc.innerText = `Your Account`;
    noteAcc.innerText = ``;
    btnAdd.removeEventListener('click', addBtnEventHandler, true);
    btnAdd.classList.add('inactive');
}

// Default - No Account
noAcc();



// Create element and render users
const renderUser = doc => {
    const tr = `
      <tr data-id='${doc.id}' class="flex-container">
        <td class="user-info"><b>Username</b>
            <text>________</text>
            ${doc.data().username}
        </td>
        <td class="user-info"><b>Email</b>
            <text>_____________</text>
            ${doc.data().email}
        </td>
        <td class="user-info"><b>Phone Number</b>
            <text>___</text>
            ${doc.data().phoneNumber}
        </td>
        <td class="acc-btns">
            <button class="btn btn-edit">Edit</button>
            <button class="btn btn-delete">Delete</button>
        </td>
      </tr>
    `;
    tableUsers.insertAdjacentHTML('beforeend', tr);
    plusAcc();
    
    // Click edit user
    const btnEdit = document.querySelector(`[data-id='${doc.id}'] .btn-edit`);
    btnEdit.addEventListener('click', () => {
        editModal.classList.add('modal-show');
        
        id = doc.id;
        editModalForm.username.value = doc.data().username;
        editModalForm.email.value = doc.data().email;
        editModalForm.phoneNumber.value = doc.data().phoneNumber;
    });

    // Click delete user
    const btnDelete = document.querySelector(`[data-id='${doc.id}'] .btn-delete`);
    btnDelete.addEventListener('click', () => {
        if(confirm("Are you sure you want to delete your account?")){
            db.collection('users').doc(`${doc.id}`).delete().then(() => {
                console.log('Document successfully deleted!');
            }).catch(err => {
                console.log('Error removing document', err);
            });
            accModal.classList.remove('modal-show');
            deletedModal.classList.add('modal-show');
            noAcc();
        }
    });
}



// Click user account button
btnAcc.addEventListener('click', () => {
    accModal.classList.add('modal-show');
});

// Click info button
btnInfo.addEventListener('click', () => {
    infoModal.classList.add('modal-show');
});

// User click anywhere outside the modal
window.addEventListener('click', e => {
    if(e.target === accModal) {
        accModal.classList.remove('modal-show');
    }
    if(e.target === infoModal) {
        infoModal.classList.remove('modal-show');
    }
    if(e.target === addedModal) {
        addedModal.classList.remove('modal-show');
    }
    if(e.target === deletedModal) {
        deletedModal.classList.remove('modal-show');
    }
    if(e.target === addModal) {
        addModal.classList.remove('modal-show');
    }
    if(e.target === editModal) {
        editModal.classList.remove('modal-show');
    }
});

// Real time listener
db.collection('users').onSnapshot(snapshot => {
    snapshot.docChanges().forEach(change => {
        if(change.type === 'added') {
            renderUser(change.doc);
        }
        if(change.type === 'removed') {
            let tr = document.querySelector(`[data-id='${change.doc.id}']`);
            let tbody = tr.parentElement;
            tableUsers.removeChild(tbody);
        }
        if(change.type === 'modified') {
            let tr = document.querySelector(`[data-id='${change.doc.id}']`);
            let tbody = tr.parentElement;
            tableUsers.removeChild(tbody);
            renderUser(change.doc);
        }
    });
});



// Add modal input fields
const inputUsername = document.getElementById('username');
const inputEmail = document.getElementById('email');
const inputPhoneNumber = document.getElementById('phoneNumber');

// Type input in add modal
addModalForm.addEventListener('input', e => {
    // Add modal inputs
    let enteredUsername = inputUsername.value.length;
    let enteredEmail = inputEmail.value.length;
    let enteredPhoneNumber = inputPhoneNumber.value.length;

    // username character limit
    if(enteredUsername > 20){
        inputUsername.classList.add('error');
        alert("Your username has exceeded the authorised limit.");
    }else{
        inputUsername.classList.remove('error');
    }
    // email character limit
    if(enteredEmail > 25){
        inputEmail.classList.add('error');
        alert("Your email has exceeded the authorised limit.");
    }else{
        inputEmail.classList.remove('error');
    }
    // phone number limit
    if(enteredPhoneNumber > 25){
        inputPhoneNumber.classList.add('error');
        alert("Your phone number has exceeded the authorised limit.");
    }else{
        inputPhoneNumber.classList.remove('error');
    }
});



// Edit modal input fields
const editUsername = document.getElementById('editUsername');
const editEmail = document.getElementById('editEmail');
const editPhoneNumber = document.getElementById('editPhoneNumber');

// Type input in edit modal
editModalForm.addEventListener('input', e => {
    // Edit modal inputs
    let changedUsername = editUsername.value.length;
    let changedEmail = editEmail.value.length;
    let changedPhoneNumber = editPhoneNumber.value.length;
    
    // username character limit
    if(changedUsername > 20){
        editUsername.classList.add('error');
        alert("Your username has exceeded the authorised limit.");
    }else{
        editUsername.classList.remove('error');
    }
    // email character limit
    if(changedEmail > 25){
        editEmail.classList.add('error');
        alert("Your email has exceeded the authorised limit.");
    }else{
        editEmail.classList.remove('error');
    }
    // phone number limit
    if(changedPhoneNumber > 25){
        editPhoneNumber.classList.add('error');
        alert("Your phone number has exceeded the authorised limit.");
    }else{
        editPhoneNumber.classList.remove('error');
    }
});



// Click submit in add modal
addModalForm.addEventListener('submit', e => {
    e.preventDefault();
    db.collection('users').add({
        username: addModalForm.username.value,
        email: addModalForm.email.value,
        phoneNumber: addModalForm.phoneNumber.value,
    });
    addModal.classList.remove('modal-show');
    addedModal.classList.add('modal-show');
});

// Click submit in edit modal
editModalForm.addEventListener('submit', e => {
    e.preventDefault();
    db.collection('users').doc(id).update({
        username: editModalForm.username.value,
        email: editModalForm.email.value,
        phoneNumber: editModalForm.phoneNumber.value,
    });
    editModal.classList.remove('modal-show');
});