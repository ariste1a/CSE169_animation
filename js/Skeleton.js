//should have a filereader object and a file object in here that is grabbed by the UI instead. 

var Skeleton = function() { 
    this.local = new THREE.Matrix4(); 
    this.root = new Joint();
    this.tokenizer = new Tokenizer();
    this.tokens = [];      
} 

Skeleton.prototype.local = new THREE.Matrix4(); 
Skeleton.prototype.tokenizer = new Tokenizer(); 
Skeleton.prototype.root = new Joint(); 
Skeleton.prototype.load = function() {  
    this.root = new Joint();
    this.tokenizer.findToken("balljoint");
    this.root.load(this.tokenizer);
    //call recurisve load on joint
} 

Skeleton.prototype.update = function() { 
    
} 

Skeleton.prototype.draw = function() { 
    
} 

Skeleton.prototype.reset = function() { 
    
} 


Skeleton.prototype.open =  function (evt) { 
    var files = evt.target.files; // FileList object

    // Loop through the FileList and render image files as thumbnails.
    var file = files[0]; 

    var reader = new FileReader();
    // Closure to capture the file information. 
    reader.onload = function(e) { 
        this.text = e.target.result; 
        Skeleton.prototype.text = this.text;
        Skeleton.prototype.tokenizer.tokens = this.text.split(/\s+/);
        Skeleton.prototype.load(Skeleton.prototype.text); 
    }

    reader.readAsText(file);    
} 
