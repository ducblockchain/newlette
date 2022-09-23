//jshint esversion:6
const express=require("express");
const request=require("request");
const bodyParser=require("body-parser");
const https=require("https");
const app = express();
app.use(express.static("public"));
app.get("/",function(req,res){
  res.sendFile(__dirname+"/signup.html");
});
app.use(bodyParser.urlencoded({extended:true}));
app.post("/failure",function(req,res){
  res.redirect("/");
})
app.post("/",function(req,res){
  const first_name=req.body.fname;
  const last_name=req.body.lname;
  const email=req.body.email;
  const data={
    members:[
      {
        email_address:email,
        status:"subscribed",
        merge_fields:{
          FNAME:first_name,
          LNAME:last_name,
        }
      }
    ]
  };
  const jsonData=JSON.stringify(data);
  const url="https://us9.api.mailchimp.com/3.0/lists/3ed3b22a38"
  const options={
    method:"POST",
    auth:"duc:eb119d39945672212fe617b786cbf384-us9"
  }
  const request=https.request(url,options,function(reponse){
    if (reponse.statusCode===200){
      res.sendFile(__dirname+"/succes.html");
    }else{
      res.sendFile(__dirname+"/failure.html");
    }
    reponse.on("data",function(data){
      console.log(JSON.parse(data));
    });

  })
  request.write(jsonData);
  request.end();

}
)








app.listen(process.env.PORT || 3000,function(){
  console.log("Server started on port 3000");
});
//eb119d39945672212fe617b786cbf384-us9
//3ed3b22a38
