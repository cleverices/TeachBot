class CourseControllers::ParticipantsController < ApplicationController
  before_action :require_user, except: [:index]
  before_action :set_course
  before_action :set_user, :require_owner, except: [:index]

  # return subscribers of the course
  # @return [Array]
  def index
    render json: { participants: @course.participants.select(:id, :username, :avatar, :slug) }
  end

  def create
    # here id = id (no slug)
    if @user.accessed_courses.where(id: @course.id).any?
      return render :json => {status: 'User has already been subscribed'}, status: :forbidden
    end

    if @user.accessed_courses << @course
      render :json => {user: @user.attributes.slice('id', 'username', 'avatar'), status: 'Done'}
    else
      render :json => {status: @user.errors}, status: :unprocessable_entity
    end
  end

  def destroy
    @user.accessed_courses.delete(@course)

    render :json => {user: @user.attributes.slice('id', 'username', 'avatar'), status: 'Done'}
  end

  private

  def set_course
    @course = get_from_cache(Course, params[:course_id])
  end

  def set_user
    @user = get_from_cache(User, params[:id])
  end

  def require_owner
    unless is_owner?(@course)
      render :json => {status: 'Access denied'}, status: :forbidden
    end
  end
end