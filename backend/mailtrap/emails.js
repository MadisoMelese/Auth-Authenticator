import { VERIFICATION_EMAIL_TEMPLATE } from './emailTemplates.js'
import { mailtrapClient, sender } from './mailtrap.config.js'

export const sendVerificationEmail = async(email, verificationToken)=>{
  const recipient = [{email}]

  try{
    const response = await mailtrapClient.send({
      from:sender,
      to:recipient,
      subject: "Verify your email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
      category: "Email verification"
    })

    console.log("Email sent successfully", response)
  }catch(err){
    console.error('Error sending verification', err);
    throw new Error(`Error sending verfication email: ${err}`)
  }
}