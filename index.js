showNotes();

// Block to add notes in the local storage
let addbtn = document.getElementById('addbtn');
addbtn.addEventListener('click', function (e) {
    let addTxt = document.getElementById('addTxt');
    let notes = localStorage.getItem('notes');          

    // checking if a key named notes exist in the local storage.
    if (notes == null) {
        notesObj = [];                                                      // If not then create an array named notesObj.
    } else {
        notesObj = JSON.parse(notes);                                       // If it does then parse it to an array
    }
    notesObj.push(addTxt.value);                                            // Pushing our note in notesObj.
    localStorage.setItem('notes', JSON.stringify(notesObj));                // Updating the item notes in the local storage.
    addTxt.value = '';                                                      // Updating addTxt to blank again.

    showNotes();
});

// Show note block.
function showNotes() {

    let notes = localStorage.getItem('notes');                              // Extracting key named notes from the local storage.

    // Checking if there are any notes.
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }

    // Creating a card to display notes on the page.
    let html = '';
    notesObj.forEach(function (element, index) {                            // Traversing through the notesObj array.
        html += `
        <div class="noteCard card my-2 mx-2" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">Note ${index + 1}</h5>
                <p class="card-text"> ${element} </p>                       
                <button id = "${index}" onclick = "deleteNote(this.id)" class="btn btn-dark">Delete</button>
                <button id = "${index}" onclick = "updateNote(this.id)" class="btn btn-dark">Update</button>
            </div>
        </div>`
    });

    let notesEle = document.getElementById('notes');                        // Accessing element with id notes to append our html in it.
    if (notesObj.length != 0) {                                             // If notes are there then display the cards.
        notesEle.innerHTML = html;
    }else{                                                                  // else display the alert.
        notesEle.innerHTML = `
        <div class="alert alert-primary container-fluid" role="alert">
        Sorry!, no notes to display.
        </div>`
    }
}

// Function to delete note.
function deleteNote(index){
    let notesObj = JSON.parse(localStorage.getItem('notes'));               // Extracting the notes string from local storage and converting it to array using JSON.parse().
    notesObj.splice(index, 1);                                              // Removing the element user doesn't want, from the array.
    localStorage.setItem('notes', JSON.stringify(notesObj));                // Updating the local storage with the new array by converting it again into a string.
    showNotes();                                                            // Immediately calling the show funtion to display the notes.
}

// Function to update notes.
function updateNote(index){
    let notesObj = JSON.parse(localStorage.getItem('notes'));
    text = prompt("Update the note: ");
    if (text.length != 0){
        notesObj[index] = text;
    }else{
        alert("You need to enter something for the note to be updated.");
    }
    localStorage.setItem('notes', JSON.stringify(notesObj));
    showNotes();
}

// Function to search the notes.
let search = document.getElementById('searchTxt');                          // Grabbing the search element from the DOM.
search.addEventListener('input', function(e){                               // Triggering the event as soon as the user inputs something in the search.
    let inputVal = search.value.toLowerCase();                              // converting the input to lowercase.

    let noteCard = document.getElementsByClassName('noteCard');             // Grabbing all the cards, a collection is returned.

    Array.from(noteCard).forEach(function(element){                         
        let cardTxt = element.getElementsByTagName('p')[0].innerText;       // Extracting the text from each card to check for the match.
        if(cardTxt.includes(inputVal)){                                     // If the content match, we block the card to be displayed.
            element.style.display = 'block';
        }else{                                                              // If content do not match we remove the card from the page.
            element.style.display = 'none';
        }
    });
});



// TODO: Mark a note as important

