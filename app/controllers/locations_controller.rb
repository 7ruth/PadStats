class LocationsController < ApplicationController

  def clear
    session[:address] = "null"
    redirect_to "/home"
  end

  def create
    if current_user.blank?
      @user = User.find(1)
    else
      @user = current_user
    end

    @location = @user.locations.create(location_params)

    session[:address] = @location.address
    redirect_to "/home"
  end

  def set_place_types
    session[:jsindex] = params[:user][:placetype_ids]
    redirect_to "/home"
  end

  def updated
    
  end

private
  def location_params
    params.require(:location).permit(:address)
  end

end
