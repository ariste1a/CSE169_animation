var Tokenizer = function() {
    this.tokens = [];  
    this.text = "";   
    this.reader = new FileReader(); 
    this.files; 
    this.file; 
} 
Tokenizer.prototype.currIndex = 0; 
Tokenizer.prototype.getToken = function() { 
    var ret = this.tokens[this.currIndex];       
    this.currIndex++;     
    return ret;     
} 

Tokenizer.prototype.findToken = function(char){
    var index = this.tokens.indexOf(char, this.currIndex);    
    this.currIndex = index+1;    
    return index;     
}
