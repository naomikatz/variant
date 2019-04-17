class Api::SongsController < ApplicationController
  before_action :find_song, only: [:update]

  def index
    @songs = Song.all
    render json: @songs
  end

  def create
    @song = Song.create(song_params)
    render json: @song
  end

  def show
    @song = Song.find_by(id: params[:id])
    render json: @song
  end


  def update
    @song.update(song_params)
    if @song.save
      render json: @song, status: :accepted
    else
      render json: { errors: @song.errors.full_messages }, status: :unprocessible_entity
    end
  end

  private

  def song_params
    params.permit(:song_name, :song_genre, :song_artist, :song_url)
  end

  def find_song
    @song = Song.find(params[:id])
  end
end
