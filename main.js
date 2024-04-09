console.log( "js is linked" )

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
    const newButtonHolder = document.createElement( "div" );
    newButtonHolder.classList.add( 'buttonHolder' );
    // Create a button for toggling strikethrough
    const strikethroughButton = document.createElement( 'button' );
    strikethroughButton.setAttribute( 'type', 'button' );
    // Create a trash button
    const trashButton = document.createElement( 'button' );
    trashButton.setAttribute( "type", 'button' );
    // Set strikethrough button icon via innerHTML
    strikethroughButton.innerHTML = `<img src="./note-square-outlined-button-with-a-pencil.png" alt="Strikethrough Button">`;
    // Set trash button icon via innerHTML
    trashButton.innerHTML = `<img src="./trash-bin.png" alt="Trash Button">`;
    // Add class to to style list strikethrough button
    strikethroughButton.classList.add( "strikeButton" );
    // Add class to to style list trash button
    trashButton.classList.add( "trashButton" );
    // Add event listener to the button for toggling strikethrough
    newItem.textContent = newItemText;
    // Append the strikethrough button to the new list item
    newItem.appendChild( newButtonHolder );
    newButtonHolder.appendChild( strikethroughButton );
    // Append the trash button to the new list item
    newButtonHolder.appendChild( trashButton );
    // Append the new list item to the itemList
    itemList.appendChild( newItem );
    // Clear the input field after adding the item
    itemInput.value = '';
    // Update the item count
    updateItemCount();
    strikethroughButton.addEventListener( 'click', toggleStrikethrough );
    // Add event listener to the button for trashing list item
    trashButton.addEventListener( "click", removeItem );
    // Set the text content of the new list item to the input value
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
  // Log event target and its parent element for debugging
  console.log( 'toggleStrikethrough Event target:', event.target );
  console.log( 'toggleStrikethrough Parent element:', event.target.parentNode );

  // Get the parent list item
  const listItem = event.target.parentNode.parentNode.parentNode;
  // Toggle the 'strikethrough' class
  listItem.classList.toggle( 'strikethrough' );
  console.log( "stikethrough button clicked" );
}

// Function to remove an item from the list
const removeItem = ( event ) =>
{
  // Log event target and its parent element for debugging
  console.log( 'removeItem Event target:', event.target );
  console.log( 'removeItem Parent element:', event.target.parentNode );

  // Check if the event target (the clicked element) has the class 'trashButton'
  if ( event.target.classList.contains( 'trashButton' ) )
  {
    // Remove the parent list item of the clicked trash button from the DOM
    event.target.parentNode.parentNode.remove();
    // Update the item count after removing the item
    updateItemCount();
  }
  console.log( "trash button clicked" );
}

// Add event listeners
addItemBtn.addEventListener( 'click', inputLogger );
addItemBtn.addEventListener( 'click', addItem );

// Add event listener to the input field for Enter key press
addItemBtn.addEventListener( 'keypress', ( event ) =>
{
  // Check if the pressed key is Enter (key code 13)
  if ( event.keyCode === 13 )
  {
    addItem(); // Call addItem function if Enter key is pressed
  }
} );

// Add event listener to the itemList to handle clicks on the strikethrough and trash buttons
itemList.addEventListener( 'click', ( event ) =>
{
  // Check if the clicked element is the strikethrough button
  if ( event.target.classList.contains( 'strikeButton' ) )
  {
    toggleStrikethrough( event );
  }
  // Check if the clicked element is the trash button
  else if ( event.target.classList.contains( 'trashButton' ) )
  {
    removeItem( event );
  }
} );
