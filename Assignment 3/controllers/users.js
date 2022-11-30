const fs = require('fs');
const registration = ((req, res) => {
   // console.log("register called")
    let { name, email, password, age, city } = req.body;


    if (fs.existsSync(`./users/${email}.txt`)) {

        res.render('regis', { errMsg: 'Email Already Registerd' })
    }
    // else if(fs.readFileSync(`./users/${password}.txt`)){
    //     alert("login succefully")

    // }
    else {
        fs.writeFile(`./users/${email}.txt`, `name:${name}\n${email}\n${password}\n${age}\n${city}`, (err) => {
            if (err) {
                res.render('regis', { errMsg: 'Something Went Wrong' })

            }
            else {

                res.redirect("/users/welcome/" + email)
            }
        })
    }

})
//Login Logic
const login = ((req, res) => {

    fs.readFile(`./users/${req.body.email}.txt`, (err, data) => {
        if (err) {
            res.render('login', { errMsg: 'Email not registerd' })
        } else {
            var obj = {

            }
            data.toString().split("\n").forEach((element, index) => {

                if (index == 1) {
                    obj.email = element

                }
                else if (index == 2) {
                    obj.password = element

                }
            });

            let existPassword = obj.password;
            let existEmail = obj.email;

            if (existEmail != req.body.email) {

                res.render('login', { errMsg: 'Email Not Registerd' })
            } else if (existPassword == req.body.password) {
              
                
               let userData=fs.readFileSync(`./users/${req.body.email}.txt`)
               let obj1={

               }
             let userDetail=userData.toString().split("\n")
             userDetail.forEach((element,index)=>
               {
                if(index==0){
                    obj1.name=element
                }else if(index==1){
                    obj1.email=element
                    
                }
                else if(index==3){
                    obj1.age=element
                }
                else if(index==4)
                {
                    obj1.city=element
                }
               })
               
               res.render('user',{obj1})
            //   res.send(userData.toString())
              

            } else {
                res.render('login', { errMsg: 'Passwrod Is Incorrect' })
            }

        }
    })



})
module.exports = {
    registration,
    login
}