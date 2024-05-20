const nodemailer = require('nodemailer')
const {convert} = require('html-to-text')
const Email = class Email{
    constructor(user,url){
        this.user = user.username,
        this.url = url
        this.from=process.env.From
        this.to = user.email
    }
    newtrasnport(){
        if(process.env.NODE_ENV==="production"){
            return 1
        }
        return nodemailer.createTransport({
            host:process.env.Emailhost,
            post:process.env.Emailport,
            auth:{
                user:process.env.emailuser,
                pass:process.env.emailpass
            }
        })
    }
    async send(templete,subject){
        const html = await require('ejs').renderFile(`${__dirname}/../Templetes/${templete}.ejs`,{
            url:this.url,
            username:this.username,
            websitelink:process.env.clientLink
        })
        const txt = convert(html,{wordwrap:180})
        const mailOptions={
            from:this.from,
            to:this.to,
            subject,
            html,
            text:this.url
        }
        await this.newtrasnport().sendMail(mailOptions)
    }
    async sendWelcome(){
        await this.send('welcome','welcome to ecs')
    }
    async sendLink(){
        await this.send('Email','PasswordLink')
    }
}
module.exports = Email