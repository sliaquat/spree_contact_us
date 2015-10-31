module Spree

  class ContactUsController < Spree::StoreController

    def show

    end

    def send_email
      Rails.logger.info "contact email - >>>>>>>>>>>>>>>>>>> #{params}"

      ContactMailer.contact_email(params["name"], params["email"], params["phone"], params["subject"], params["message"]).deliver_later
      flash[:notice] = "Email has been sent successfully"
      redirect_to contact_us_path
    end

  end

end
