const date = new Date();
const monthNames = [ "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const month = monthNames[ date.getMonth() ];
const dayOfMonth = date.getDate();

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
