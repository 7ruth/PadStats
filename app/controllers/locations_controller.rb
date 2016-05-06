class LocationsController < ApplicationController

  def clear
    session[:address] = "null"
    redirect_to "/home"
  end

  def create
    if current_user.blank?
      @user = User.find_by(email:'guest')
    else
      @user = current_user
    end

    @location = @user.locations.create(location_params)
    # it might be nice to have some error handling tying into validations

    session[:address] = @location.address
    redirect_to "/home"
  end

  def set_place_types
    session[:jsindex] = params[:user][:placetype_ids]
    redirect_to "/home"
  end

  # typo, should be update. Also there is action is not being used and could be removed
  def updated

  end

private
  def location_params
    params.require(:location).permit(:address)
  end

end
