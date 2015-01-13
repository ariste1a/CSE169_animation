//should have a filereader object and a file object in here that is grabbed by the UI instead. 

var Skeleton = function() { 
    this.local = new THREE.Matrix4(); 
    this.root = new Joint();     
    this.tokens = [];  
} 


Skeleton.prototype.load = function() {      
    this.tokenizer.open();     
} 

Skeleton.prototype.update = function() { 
    
} 

Skeleton.prototype.draw = function() { 
    
} 

Skeleton.prototype.reset = function() { 
    
} 

Skeleton.prototype.recursiveLoad = function(text) {
    console.log(this.tokenizer.text); 
} 

Skeleton.prototype.open =  function (evt) { 
    var files = evt.target.files; // FileList object

    // Loop through the FileList and render image files as thumbnails.
    var file = files[0]; 

    var reader = new FileReader();
    // Closure to capture the file information.
    console.log("test");
    
    //how to relay this to when it finishes loading?
  /*  reader.onload = (function(theFile) {
        return function(e) {
            var text = e.target.result; 
        };
    })(this.file);*/ 
    reader.onload = function(e) { 
        this.text = e.target.result; 
        Skeleton.prototype.text = this.text;
        console.log(Skeleton.prototype.text); 
    }

    reader.readAsText(file);    
} 