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

export const sendWelcomeEmail = async (email, name) =>{
  const recipient = [{email}]

  try{
    const response = await mailtrapClient.send({
      from: sender,
      to:recipient,
      template_uuid: "5ef74961-0bb3-48d8-b642-ea59b7cedcef",
      template_variables: {
        "company_info_name": "Madisha Code Lab",
        "name":name,
      }
    })

    console.log("Welcome Email sent successfully", response)
  }catch(err){
    console.error("Error sending welcome email: ", err);
    throw new Error(`Error:, ${err}`)
  }
}