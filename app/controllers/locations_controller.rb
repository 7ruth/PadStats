class LocationsController < ApplicationController

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

private
  def location_params
    params.require(:location).permit(:address)
  end

end
