# frozen_string_literal: true

Rails.application.routes.draw do
  devise_for :admins
  devise_for :users

  resources :spots, only: [:index]

  root to: 'general#index'
end
