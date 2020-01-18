module SessionHelper
  def login!
    session[:user_id] = @user.id
  end
  def logged_in?
    !!session[:user_id]
  end
  def current_user
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
  end
  def authorized_user?
    @user == current_user
  end
  def logout!
    session.clear
  end
end