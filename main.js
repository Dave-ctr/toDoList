const date = new Date();
const monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
];
const month = monthNames[ date.getMonth() ];
const dayOfMonth = date.getDate();
const itemInput = document.getElementById( 'toDoInputField' );
const addItemBtn = document.getElementById( 'submitToDoInput' );
const itemList = document.getElementById( 'toDoList' );
const itemCount = document.getElementById( 'activeTasks' );


// Function to add ordinal suffix to the day
function getOrdinalSuffix( day )
{
  if ( day > 3 && day < 21 ) return 'th';
  switch ( day % 10 )
  {
    case 1: return "st";
    case 2: return "nd";
    case 3: return "rd";
    default: return "th";
  }
}

const ordinalSuffix = getOrdinalSuffix( dayOfMonth );

const formattedDate = `${ month }, ${ dayOfMonth }${ ordinalSuffix }`;

document.getElementById( "date" ).innerHTML = formattedDate;

// Form Input Values: Retrieve and log the value of a text input when a form is submited.

const form = document.getElementById( 'myForm' );

// Function to add a new item to the list
const addItem = () =>
{
  // Get the value of the item input and remove leading/trailing whitespace
  const newItemText = itemInput.value.trim();
  // Check if the input value is not empty
  if ( newItemText !== '' )
  {
    // Create a new list item element
    const newItem = document.createElement( 'li' );
    // Create a button for toggling strikethrough
    const strikethroughButton = document.createElement( 'button' );
    strikethroughButton.classList.add( "strikeButton" );
    strikethroughButton.innerHTML = `<img src="./note-square-outlined-button-with-a-pencil.png" alt="Strike Button">`;
    // Add event listener to the button for toggling strikethrough
    strikethroughButton.addEventListener( 'click', toggleStrikethrough );
    // Set the text content of the new list item to the input value
    newItem.textContent = newItemText;
    // Append the toggle button to the new list item
    newItem.appendChild( strikethroughButton );
    // Append the new list item to the itemList
    itemList.appendChild( newItem );
    // Clear the input field after adding the item
    itemInput.value = '';
    // Update the item count
    updateItemCount();
  }
}

const inputLogger = ( event ) =>
{
  // Prevent the default form submission behavior
  event.preventDefault();

  // Retrieve the value of the text input
  const textInputValue = document.getElementById( 'toDoInputField' ).value;
  console.log( "inputLogger executed and textInputValue = ", textInputValue );
  // Perform form validation
  if ( textInputValue.trim() === '' )
  {
    // Display error message
    alert( 'Please enter a value for the text input.' );
    // Stop further execution
    return;
  }

  // Log the value to the console
  console.log( `Submitted Text Input Value: ${ textInputValue }` );

  const submittedFormInfo = textInputValue;

  console.log( submittedFormInfo );
}


// Function to update the item count
const updateItemCount = () =>
{
  // Set the text content of itemCount to the number of children in itemList
  if ( itemList.children.length === 1 )
  {
    itemCount.textContent = `${ itemList.children.length } Active Task`;
  } else
  {
    itemCount.textContent = `${ itemList.children.length } Active Tasks`;
  }
}

// Function to toggle the strikethrough style of a list item
const toggleStrikethrough = ( event ) =>
{
  // Get the parent list item
  const listItem = event.target.parentNode;
  // Toggle the 'strikethrough' class
  listItem.classList.toggle( 'strikethrough' );
  console.log( "stikethrough button clicked" );
}

// Function to remove an item from the list
const removeItem = ( event ) =>
{
  // Check if the event target (the clicked element) is a list item
  if ( event.target.tagName === 'LI' )
  {
    // Remove the clicked list item from the DOM
    event.target.remove();
    // Update the item count after removing the item
    updateItemCount();
  }
}

// Add event listeners
addItemBtn.addEventListener( 'click', inputLogger );
addItemBtn.addEventListener( 'click', addItem );
itemList.addEventListener( 'click', removeItem );
// Add event listener to the input field for Enter key press
addItemBtn.addEventListener( 'keypress', ( event ) =>
{
  // Check if the pressed key is Enter (key code 13)
  if ( event.keyCode === 13 )
  {
    addItem(); // Call addItem function if Enter key is pressed
  }
} );
