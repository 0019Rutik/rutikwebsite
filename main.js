// SELECT TH SAVVE BUTTON
var button = document.querySelector(".save_button");

// select the input  box
var siteName = document.querySelector("[name='site_name']");
var url = document.querySelector("[name='url']");

// selecctt the <div> wwith cllas="bookmarks"

var bookmarksSection  = document.querySelector(".bookmarks");

// hold bookmarks  in local storage 
if(typeof(localStorage.bookmark) == "undefined") {

    localStorage.bookmarks  = " ";
}

// listen for form ssubmit 
button.addEventListener("click", function(e){

    // prevent the page from reloading when submitting the form 

    e.preventDefault();
     //let patternURL = / https?:\/\/(www\.) ? [-a-zA-Z0-9@:%._\+~#=] {2,256}\.[a-z] {2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=] *)?/gi;
  
let patternURL = /^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?\/?$/gm;

    let arrayItems , check = false;let  adr , itemAdr;


//  validation of form and url 

  if(siteName.value === " ") {
      alert('you must fill the sitename input');
  }
  else if(url.value === " ") {

    alert("You must fill the url input");
  }
  else if (!patternURL.test(url.value)) {
      alert("you must enter a valid url ");
  }
  else {
      arrayItems  = localStorage.bookmarks.split(";");
      adr = url.value;
      adr =  adr.replace(/http:\/\/|https:\/\//i, " ");
      arrayItems.lenght--; 
  }

  // check if website is alredy bookmarked 
  for(item of arrayItems) {
      itemAdr = item.split(' .' [1].replace(/http:\/\/|https:\/\//i," "));
      if(itemAdr == adr) {
          check = true;
      }
  }
  if(check == true) {
      alert('this website is already bookmark');
  }
  else {

     // if all the bookmarks arre correct .add bookmark to localstorage 
     localStorage.bookmark +=` ${siteName.value} , ${url.value}; `;
     addBookmark(siteName.value , url.value);
     siteName.value = " ";
     url.value=" ";


  }

});

// function to add bookmaarks

 function addBookmark (name, url) {
     let datalink = url;

     // After obtaining a bookmark , we display it in a div andd add 
     // a buttton to visit the link or to delete it 
     if(!url.includes("https")) {
         url= "//" + url ;
     }

        let item = ` <div class="bookmark">
         <span> ${name}</sapn>
         <a class = "visit" href="${url}" target ="_blank"
           data-link=${datalink}'>Visit</a>

           <a onclick = "removeBookmark(this)" class ="delete" href="#"> delete </a>
         
         </div> `;
         bookmarksSection.innerHTML+=item;


     
 }


 // function to render the saved bookmaark

 (function fetchbookmark(){
     if(typeof(localStorage.bookmark) != "undefined" && localStorage.bookmark !=" ") {
         let arrayItems = localStorage.bookmark.split(";");
         arrayItems.lenght--;

         for (item in arrayItems) {
             let itemspli = item.split(',');
             addBookmark(itemspli[0] , itemspli[1]);
         }

     }
 }) ();


 // funcction to remove bookmaark

 function removeBookmark(thisItem) {
     let arrayItems = [],
     index,
     item = thisItem.parentNode,
     itemURL = item.querySelector(".visit").dataset.link,
     itemName = item.querySelector("span").innerHTML;
     
     arrayItems = localStorage.bookmark.split(";");

     for (i in arrayItems) {
         if(arrayItems[i] == `${itemName}, ${itemURL}`) {
             index =i;
             break;
         }
     }

     // Update the localstorage
     index = arrayItems.indexof(`${itemName} , ${itemURL}`);
     arrayItems.splice(index,1);
     localStorage.bookmark = arrayItems.join(";");

     // update the bookmarrk secction 
     bookmarksSection.removeChild(item);

 }
