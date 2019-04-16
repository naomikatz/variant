class CreateRemixes < ActiveRecord::Migration[5.2]
  def change
    create_table :remixes do |t|
      t.string :remix_name
      t.string :remix_genre
      t.string :remix_artist
      t.integer :remix_likes
      t.string :remix_url


      t.belongs_to :song
      t.timestamps
    end
  end
end
