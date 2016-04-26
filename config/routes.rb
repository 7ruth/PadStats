Rails.application.routes.draw do

  root "pages#home"

  get "/home", to: "pages#home", as: "home"

  resources :users do
    resources :locations
  end

  get "/signup" => "users#new"
  post "/users" => "users#create"

  get "/signin" => "sessions#new"
  post "/signin" => "sessions#create"
  get "/signout" => "sessions#destroy"

end
