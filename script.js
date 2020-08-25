const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");


//ShowLoading

function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

//Hide loading

function complete() {
  if (!loader.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
}

// Get quote from API

async function getQuote() {
  loading();
  const proxyUrl = "https://hidden-reef-07442.herokuapp.com/";
 const apiURL = "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";


try {
const response = await fetch(proxyUrl + apiURL);
const data = await response.json();

//If author is blank, add unknown

if (data.quoteAuthor === "" ) {
  authorText.innerText = "Unknown"
} else {
  authorText.innerText = data.quoteAuthor
}

//Reduce font-size for long quotes

if (data.quoteText.length > 120) {
  quoteText.classList.add("long-quote");
} else {
  quoteText.classList.remove("long-quote");
}

quoteText.innerText = data.quoteText;
//Stop loader, show quote

complete();
} catch (error) {
  getQuote();
  console.log("Whoops, no quote", error)
}

}

// Tweet quote

function tweetQuote() {
  const quote = quoteText.innerText;
  const author = authorText.innerText;

  const twitterURL = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;

  window.open(twitterURL, "_blank");
}

//Add Event Listeners

newQuoteBtn.addEventListener("click", getQuote);
twitterBtn.addEventListener("click", tweetQuote);

// On Load

getQuote();

