# frozen_string_literal: true

module Api::V1
  class EventsController < ApplicationController
    before_action :set_event, only: %i[show update destroy]

    # GET /events
    def index
      if params[:user_id]
        @events = Event.where(user_id: params[:user_id]).order(:date, :time)
      elsif params[:date]
        p "params[:date] >>>> #{params[:date]}"
        @events = Event.where('date >= ?', params[:date]).order(:date, :time)
      else
        @events = Event.all
      end

      render json: @events
    end

    # GET /events/1
    def show
      render json: @event
    end

    # POST /events
    def create
      @event = Event.new(event_params)

      if @event.save
        render json: @event, status: :created
      else
        render json: @event.errors, status: :unprocessable_entity
      end
    end

    # PATCH/PUT /events/1
    def update
      if @event.update(event_params)
        render json: @event, status: :accepted
      else
        render json: @event.errors, status: :unprocessable_entity
      end
    end

    # DELETE /events/1
    def destroy
      @event.destroy
      @events = Event.all
      render json: @events, status: :accepted
    end

    private

    # Use callbacks to share common setup or constraints between actions.
    def set_event
      @event = Event.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def event_params
      params.require(:event).permit(:title, :description, :date, :time, :location, :status, :user_id)
    end
  end
end
