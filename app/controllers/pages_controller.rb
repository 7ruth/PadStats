class PagesController < ApplicationController

  def home
    if current_user.blank?
      @user = User.find_by(email:'guest')
    else
      @user = current_user
    end

    gon.address = session[:address]
    gon.jsindex = session[:jsindex]


    @location = Location.new

  end


end
