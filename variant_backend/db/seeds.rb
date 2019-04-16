# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


new_rules = Song.find_or_create_by(song_name: "New Rules", song_genre: "Pop", song_artist: "Dua Lipa", song_url: "https://www.youtube.com/watch?v=k2qgadSvNyU")

new_rules_rmnd_remix = Remix.find_or_create_by(song: new_rules, remix_name: "New Rules (RMND Remix)", remix_genre: "Trap", remix_artist: "RMND", remix_likes: 0, remix_url: "https://www.youtube.com/watch?time_continue=11&v=8AHwaECjOPU")
new_rules_rmnd_remix = Remix.find_or_create_by(song: new_rules, remix_name: "New Rules (Suprafive Remix)", remix_genre: "House", remix_artist: "Suprafive", remix_likes: 0, remix_url: "https://www.youtube.com/watch?time_continue=4&v=f0pYwp0bLSE")
new_rules_rmnd_remix = Remix.find_or_create_by(song: new_rules, remix_name: "New Rules (Vicetone Remix)", remix_genre: "Electronic", remix_artist: "Vicetone", remix_likes: 0, remix_url: "https://www.youtube.com/watch?time_continue=56&v=RdpKa6KQxKU")
new_rules_rmnd_remix = Remix.find_or_create_by(song: new_rules, remix_name: "New Rules (Initial Talk Remix)", remix_genre: "80's", remix_artist: "Initial Talk", remix_likes: 0, remix_url: "https://www.youtube.com/watch?v=wLjNTTCVat0")
new_rules_rmnd_remix = Remix.find_or_create_by(song: new_rules, remix_name: "New Rules (Alison Wonderland Remix)", remix_genre: "Trap", remix_artist: "Alison Wonderland", remix_likes: 0, remix_url: "https://www.youtube.com/watch?v=aSJpnjmqGkY")
