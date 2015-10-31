class Spree::Admin::ContactUsSettingsController < Spree::Admin::ResourceController
  def update
    settings = Spree::ContactUsSetting.new
    preferences = params && params.key?(:preferences) ? params.delete(:preferences) : params
    preferences.each do |name, value|
      next unless settings.has_preference? name
      settings[name] = value
    end
    flash[:success] = "Successfully updated Contact Us settings"
    redirect_to edit_admin_contact_us_settings_path
  end
end