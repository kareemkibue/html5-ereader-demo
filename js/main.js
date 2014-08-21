//DEFAULT SIMPLE
//Monocle.Reader('reader');


//LOADING FROM OBJECT DATA, OR (X)HTML
/*var bookData = {
  getComponents: function () {
    return [
      'component1.xhtml',
      'component2.xhtml',
      'component3.xhtml',
      'component4.xhtml'
    ];
  },
  getContents: function () {
    return [
      {
        title: "Chapter 1",
        src: "component1.xhtml"
      },
      {
        title: "Chapter 2",
        src: "component3.xhtml#chapter-2"
      }
    ]
  },
  getComponent: function (componentId) {
    return {
      'component1.xhtml':
        '<h1>Chapter 1</h1><p>Hello world</p>',
      'component2.xhtml':
        '<p>Chapter 1 continued.</p>',
      'component3.xhtml':
        '<p>Chapter 1 continued again.</p>' +
        '<h1 id="chapter-2">Chapter 2</h1>' +
        '<p>Hello from the second chapter.</p>',
      'component4.xhtml':
        '<p>THE END.</p>'
    }[componentId];
  },
  getMetaData: function(key) {
    return {
      title: "A book",
      creator: "Inventive Labs"
    }[key];
  }
}*/

// Initialize the reader element.
/*Monocle.Reader('reader', bookData, {}, function (reader) {
  reader.moveTo({ page: 4 });
});*/

//LOADING FROM A REMOTE FILE
//

function GetUrlValue(VarSearch){
    var SearchString = window.location.search.substring(1);
    var VariableArray = SearchString.split('&');
    for(var i = 0; i < VariableArray.length; i++){
        var KeyValuePair = VariableArray[i].split('=');
        if(KeyValuePair[0] == VarSearch){
            return KeyValuePair[1];
        }
    }
}
//alert(GetUrlValue('bookId'));
var bookId=GetUrlValue('bookId');
var epubUrl="";

if (bookId==1){
	epubUrl = "epub/The_Autobiography_of_Malcolm_X.epub";
}
else if (bookId==2){
	epubUrl = "epub/Meyer_Stephenie-Twilight.epub";
}

var request = new XMLHttpRequest();
//request.open("GET", "url/of/file.epub", true);
request.open("GET", epubUrl, true);
request.responseType = "blob";
request.onload = function () {
    new Epub(request.response, function (bookData) {
        Monocle.Reader("reader", bookData);
    });
};
request.send();

