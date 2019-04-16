class RemixSerializer < ActiveModel::Serializer
  attributes :id, :song_id, :remix_name, :remix_genre, :remix_artist, :remix_likes, :remix_url
  belongs_to :song
end
