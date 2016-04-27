# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
Placetype.destroy_all

place_types = [
  'Convenience store',
  'Gym',
  'Grocery or supermarket',
  'School',
  'Library',
  'Museum']

place_types.each do |type|
  Placetype.create(category: type)
end
