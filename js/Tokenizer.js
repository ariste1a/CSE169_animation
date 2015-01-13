var Tokenizer = function() {
    this.tokens = [];  
    this.text = "";   
    this.reader = new FileReader(); 
    this.files; 
    this.file; 
} 

Tokenizer.prototype.tokenize = function() { 
    return true; 
} 

Tokenizer.prototype.open =  function (evt) { 
    var files = evt.target.files; // FileList object

    // Loop through the FileList and render image files as thumbnails.
    var file = files[0]; 

    var reader = new FileReader();
    // Closure to capture the file information.
    console.log("test");
    
    //how to relay this to when it finishes loading?
    reader.onload = (function(theFile, recursiveLoad) {
        return function(e) {
            var text = e.target.result; 
            this.text = text;
            //console.log(this.text);
        };
    })(this.file);
    reader.readAsText(file);    
} 