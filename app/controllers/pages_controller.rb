class PagesController < ApplicationController

  def home
    if current_user.blank?
      @user = User.find(1)
    else
      @user = current_user
    end

    gon.address = session[:address]
    session[:address] = "null"
    @location = Location.new


  end


end
