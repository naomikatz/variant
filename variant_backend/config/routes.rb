Rails.application.routes.draw do
  namespace :api do
      resources :songs, only: [:index, :show, :create, :update, :destroy] do
        resources :remixes
      end
  end
end
