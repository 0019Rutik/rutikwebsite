const quoteText = document.querySelector(".quote") ,
quotebtn = document.querySelector("button");
const author =document.querySelector("#author");
SoundBtn = document.querySelector(".sound");
CopyBtn = document.querySelector(".copy");
twitterBtn = document.querySelector(".twitter");

// random quote function


   // fetching random quote/ data from the API parsing it into javascript object

  const getQuotes = async () => {
     const api = "https://api.quotable.io/random";
     try{
    let data = await fetch(api);
    let realdata = await data.json();
    console.log(realdata.content)
    console.log(realdata.author)
    quoteText.innerHTML =realdata.content;
    author.innerHTML = realdata.author;
     }catch(error) {
alert(error);
     }
  }

SoundBtn.addEventListener("click", () =>{
    let utterance = new SpeechSynthesisUtterance('${quoteText.innerHTML} by ${author.innerHTML}');
    speechSynthesis.speak(utterance); // speak method of speechSynthesis speaks the utterance
})
CopyBtn.addEventListener("click", () =>{
   navigator.clipboard.writeText(quoteText.innerText);
    
})
twitterBtn.addEventListener("click", () =>{
    let tweetUrl = 'https://twitter.com/intent/tweet?url= ';
    window.open(tweetUrl, "_blank");
     
 })

quotebtn.addEventListener("click", getQuotes);