Spree::Core::Engine.routes.draw do
  # Add your extension routes here
  namespace :admin do
    resource :contact_us_settings, only: [:edit, :update]
  end

  get '/contact_us', to: 'contact_us#show'

  match '/contact_us', to: 'contact_us#send_email', via: 'post'#, as: :contact_email


end
