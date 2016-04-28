class SessionsController < ApplicationController

  def new
  end

  def create
    user = User.find_by(email: params[:email])

    if user
      if user.authenticate(params[:password])
        session[:user_id]=user.id
        flash[:notice] = "Logged in as #{user.email}!"
        redirect_to "/home"
      else
        render :new and return
      end

    else
      render :new and return
    end
  end

  def destroy
    session[:address] = "null"
    session[:user_id]=nil
    redirect_to "/home"
  end

end
