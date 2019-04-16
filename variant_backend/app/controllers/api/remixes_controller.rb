class Api::RemixesController < ApplicationController
  before_action :find_remix, only: [:update, :destroy]

  def index
    @remixes = Remix.all
    render json: @remixes
  end

  def create
    @remix = Remix.create(remix_params)
    render json: @remix
  end

  def update
    @remix.update(remix_params)
    if @remix.save
      render json: @remix, status: :accepted
    else
      render json: { errors: @remix.errors.full_messages }, status: :unprocessible_entity
    end
  end

  def destroy
    @remix.destroy
    render json: @remix
  end

  private

  def remix_params
    params.permit(:remix_name, :remix_genre, :remix_artist, :remix_url, :song_id, :remix_likes)
  end

  def find_remix
    @remix = Remix.find(params[:id])
  end
end
