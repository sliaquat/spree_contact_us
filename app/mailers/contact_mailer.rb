class ContactMailer < ActionMailer::Base

  def contact_email(name, email, phone, subject, message)
    @name = name
    @email = email
    @phone = phone
    @subject = subject
    @message = message
    mail(to: Spree::ContactUsSetting.new[:email], from: @email, subject: @subject, reply_to:@email)
  end


end
