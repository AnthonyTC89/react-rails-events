module Api::V1
  class AttendeesController < ApplicationController
    before_action :set_attendee, only: [:show, :update, :destroy]

    # GET /attendees
    def index
      if params[:user_id]
        @attendees = Attendee.where('user_id = ? AND status = 1', params[:user_id])
        @attendees = @attendees.collect {|att| att.event_id}
      else
        @attendees = Attendee.all
      end
      
      render json: @attendees
    end

    # GET /attendees/1
    def show
      render json: @attendee
    end

    # POST /attendees
    def create
      @attendee = Attendee.new(attendee_params)

      if @attendee.save
        render json: @attendee, status: :created
      else
        render json: @attendee.errors, status: :unprocessable_entity
      end
    end

    # PATCH/PUT /attendees/1
    def update
      if @attendee.update(attendee_params)
        render json: @attendee
      else
        render json: @attendee.errors, status: :unprocessable_entity
      end
    end

    # DELETE /attendees/1
    def destroy
      @attendee.destroy
    end

    # DELETE /attendees(user_id, event_id)
    def leave
      p "params >>>>>> #{params}"
      p "params[:user_id] >>>>>> #{params[:user_id]}"
      p "params[:event_id] >>>>>> #{params[:event_id]}"
      @attendee = Attendee.where('user_id = ? AND event_id = ?', params[:user_id], params[:event_id]).first
      p "@attendee >>>>>> #{@attendee}"
      @attendee.destroy
    end

    private
      # Use callbacks to share common setup or constraints between actions.
      def set_attendee
        @attendee = Attendee.find(params[:id])
      end

      # Only allow a trusted parameter "white list" through.
      def attendee_params
        params.require(:attendee).permit(:user_id, :event_id, :status)
      end
  end
end