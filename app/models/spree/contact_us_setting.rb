module Spree
  class ContactUsSetting < Preferences::Configuration
    preference :enabled, :boolean, default: false

    preference :phone_number, :string, default: ''

    preference :address, :string, default: ''

    preference :longitude, :decimal, default: ''

    preference :latitude, :decimal, default: ''

    preference :email, :string, default: ''


  end
end
