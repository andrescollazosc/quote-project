const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twiterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");


function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
  if (!loader.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
}

// Get Quote from API
async function getQuote() {
  showLoadingSpinner();

  const proxyUrl = "https://cors-anywhere.herokuapp.com/";
  // const proxyUrl = "http://api.allorigins.win/get?url=";
  const apiUrl =
    "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";

  try {
    const response = await fetch(proxyUrl + apiUrl);
    const data = await response.json();

    authorText.innerText = data.quoteAuthor === '' ? 'Unknow' : data.quoteAuthor;

    if (data.quoteText.length > 120) {
      quoteText.classList.add('long-quote');
    } else {
      quoteText.classList.remove('long-quote');  
    }

    quoteText.innerText = data.quoteText;
    removeLoadingSpinner();
    // throw new Error('Oops');
  } catch (error) {
    // getQuote();
    console.log("whoops, no quote", error);
  }
}

// Tweet quote
function tweetQuote() {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${ quote } - ${ author }`;

  window.open(twitterUrl, '_blank');
}

// Event listeners
newQuoteBtn.addEventListener('click', getQuote);
twiterBtn.addEventListener('click', tweetQuote);

// On Load
getQuote();
