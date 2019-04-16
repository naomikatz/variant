class SongSerializer < ActiveModel::Serializer
  attributes :id, :song_name, :song_genre, :song_artist, :song_url

  has_many :remixes

  def remixes
    object.remixes
end

end
