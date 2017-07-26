var express     = require('express'),
    app         = express(),
    bodyParser  = require('body-parser'),
    mongoose    = require('mongoose');
    
// APP CONFIG
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/blog", {useMongoClient: true});
app.set("view engine", "ejs");
app.use(express.static("public")); //to serve custom stylesheet
app.use(bodyParser.urlencoded({extended: true}));

// MONGOOSE/MODEL CONFIG
var blogSchema = new mongoose.Schema({
    title: String,
    image: {type: String, default: "https://i.imgflip.com/cnudu.jpg"}, //default: is just in case the user did not enter something
    body: String,
    created: {type: Date, default: Date.now}
});

var Blog = mongoose.model("Blog", blogSchema);

// RESTful ROUTES
app.get("/", function(req, res) {
    res.redirect("/blogs");
});

app.get("/blogs", function(req, res){
    Blog.find({}, function(err, blogs){
        if(err) {
            console.log("Error..");
        } else {
            res.render("index", {blogs: blogs});
        }
    });
});





app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server is running..");
})
    