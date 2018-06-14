Rails.application.routes.draw do
  # STEP 1: A ROUTE triggers a controller action
  # verb "/urls" => "namespace/controllers#action"
  namespace :api do

    get "/cats" => "cats#index"

    get "/cats/:id" => "cats#show"

    post "/cats" => "cats#create"

    patch "/cats/:id" => "cats#update"

    delete "/cats/:id" => "cats#destroy"

  end
end
