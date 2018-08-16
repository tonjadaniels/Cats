class ApplicationController < ActionController::Base
  
  protect_from_forgery with: :null_session
  include Knock::Authenticable

  def authenticate_admin
    unless current_user && current_user.admin 
      render json: {}, status: :unauthorized
    end
  end
end
