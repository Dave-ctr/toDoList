// Log a message indicating that JavaScript is linked
console.log( "js is linked" )

// Variable to hold the input field element
const itemInput = document.getElementById( 'toDoInputField' );
// Variable to hold the submit button element
const addItemBtn = document.getElementById( 'submitToDoInput' );
// Variable to hold the list element 
const itemList = document.getElementById( 'toDoList' );
// Variable to hold the item count element
const itemCount = document.getElementById( 'activeTasks' );
// Variable to hold the form element
const form = document.getElementById( 'myForm' );

// Get the current date information
// Variable to hold the current date
const date = new Date();
// Array of month names
const monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
// Variable to hold the current month name
const month = monthNames[ date.getMonth() ];
// Variable to hold the current day of the month
const dayOfMonth = date.getDate();

// Function to add ordinal suffix to the day
const getOrdinalSuffix = ( day ) =>
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

// Variable to hold the ordinal suffix for the current day
const ordinalSuffix = getOrdinalSuffix( dayOfMonth );
// Format the date string with the month, day, and ordinal suffix
const formattedDate = `${ month }, ${ dayOfMonth }${ ordinalSuffix }`;
// Set the formatted date to the corresponding HTML element
document.getElementById( "date" ).innerHTML = formattedDate;

// Function to add a new item to the list
const addItem = () =>
{
  // Get the value of the item input and remove leading/trailing whitespace
  const newItemText = `<p id="item-${ itemList.children.length }">${ itemInput.value.trim() }</p>`

  // Check to ensure that the input value is not empty
  if ( itemInput.value === "" )
  {
    // Stop further execution
    return;
  } else
  {
    // Create a new list item element
    const newItem = document.createElement( 'li' );
    newItem.setAttribute( "id", `item-${ itemList.children.length }` );

    // Create a container for buttons associated with the new list item
    const newButtonHolder = document.createElement( "div" );
    newButtonHolder.classList.add( 'buttonHolder' );

    // Create a button for toggling strikethrough
    const strikethroughButton = document.createElement( 'button' );
    strikethroughButton.setAttribute( 'type', 'button' );
    strikethroughButton.setAttribute( "id", `item-${ itemList.children.length }` );

    // Create a trash button
    const trashButton = document.createElement( 'button' );
    trashButton.setAttribute( "type", 'button' );
    trashButton.setAttribute( "id", `item-${ itemList.children.length }` );

    // Set strikethrough button icon via innerHTML
    strikethroughButton.innerHTML = `<img src="./note-square-outlined-button-with-a-pencil.png" alt="Strikethrough Button">`;

    // Give strikethrough button icon <img> element an id 
    let strikethroughButtonChild = strikethroughButton.firstChild;
    strikethroughButtonChild.setAttribute( "id", `item-${ itemList.children.length }` );

    // Set trash button icon via innerHTML
    trashButton.innerHTML = `<img src="./trash-bin.png" alt="Trash Button">`;

    // Give trash button icon <img> element an id 
    let trashButtonChild = trashButton.firstChild;
    trashButtonChild.setAttribute( "id", `item-${ itemList.children.length }` );

    // Add classes to style list buttons
    strikethroughButton.classList.add( "strikeButton" );
    trashButton.classList.add( "trashButton" );

    // Set the text of the new list item
    newItem.innerHTML = newItemText;

    // Append the button holder div to the new list item
    newItem.appendChild( newButtonHolder );

    // Append the strikethrough button to the new list item
    newButtonHolder.appendChild( strikethroughButton );

    // Append the trash button to the new list item
    newButtonHolder.appendChild( trashButton );

    // Append the new list item to the itemList
    itemList.appendChild( newItem );

    // Clear the input field after adding the item
    itemInput.value = '';

    // Update the item count
    updateItemCount();

    // Add event listener to the button for toggling strikethrough on list item
    strikethroughButton.addEventListener( 'click', toggleStrikethrough );

    // Add event listener to the button for removing list item
    trashButton.addEventListener( "click", removeItem );
  }
}

// Function to log the value of the text input when the form is submitted
const inputLogger = ( event ) =>
{
  // Prevent the default form submission behavior
  event.preventDefault();

  // Retrieve the value of the text input
  const textInputValue = document.getElementById( 'toDoInputField' ).value;

  // Log the input value
  console.log( "inputLogger executed and textInputValue = ", textInputValue );

  // Perform form validation
  if ( textInputValue.trim() === '' )
  {
    // Display error message
    alert( 'Please enter a value for the text input.' );
    // Stop further execution
    return;
  }

  // Store the submitted form information
  const submittedFormInfo = textInputValue;

  // Log the submitted text input value
  console.log( `Submitted Text Input Value: ${ submittedFormInfo }` );
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

// Function to toggle the strikethrough class on a list item
const toggleStrikethrough = ( event ) =>
{
  // Log event target and its parent element for debugging
  console.log( 'toggleStrikethrough function executed' );
  console.log( 'toggleStrikethrough Event target:', event.target );
  console.log( 'toggleStrikethrough Parent element:', event.target.parentNode );

  // Get the ID of the button clicked
  const buttonId = event.target.id;
  console.log( "buttonId = ", buttonId );

  // Get the corresponding list item ID
  const listItem = document.getElementById( buttonId );
  console.log( "listItem = ", listItem );

  // Toggle the 'strikethrough' class
  if ( listItem )
  {
    listItem.classList.toggle( 'strikethrough' );
  }
}

// Function to remove an item from the list
const removeItem = ( event ) =>
{
  // Log event target and its parent element for debugging
  console.log( 'removeItem function executed' );
  console.log( 'removeItem Event target:', event.target );
  console.log( 'removeItem Parent element:', event.target.parentNode );

  // Get the ID of the button clicked
  const buttonId = event.target.id;
  console.log( "buttonId = ", buttonId );

  // Get the corresponding list item ID
  const listItem = document.getElementById( buttonId );
  console.log( "listItem = ", listItem );

  // Remove the list item from the DOM
  if ( listItem )
  {
    listItem.remove();
    // Update the item count after removing the item
    updateItemCount();
  }
}

// Add event listeners 
// Log the input value when the button is clicked
addItemBtn.addEventListener( 'click', inputLogger );
// Add a new item to the list when the button is clicked
addItemBtn.addEventListener( 'click', addItem );

// Add event listener to the input field for Enter key press
addItemBtn.addEventListener( 'keypress', ( event ) =>
{
  // Check if the pressed key is Enter (key code 13)
  if ( event.keyCode === 13 )
  {
    // Call addItem function if Enter key is pressed
    addItem();
  }
} );
