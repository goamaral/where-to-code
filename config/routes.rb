# frozen_string_literal: true

Rails.application.routes.draw do
  authenticate :user, ->(u) { u.admin? } do
    scope module: 'admins', path: 'admins', as: 'admin' do
      root to: 'general#index'
    end
  end

  devise_for :users

  resources :spots, only: [:index]

  root to: 'general#index'
  match '/*a', to: redirect('/'), via: :all
end
