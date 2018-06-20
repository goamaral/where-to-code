require 'sinatra'
require 'rubygems'
require 'active_record'

# Database config
ActiveRecord::Base.establish_connection(
  :adapter => "sqlite3 ",
  :pool => "5",
  :timeout => "5000",
  :database => "database.sqlite3"
)

# Models
require './Models/Marker.rb'

class ApplicationController < Sinatra::Base
  get '/' do
    erb :home
  end

  get '/location/:location' do
    @location = params['location']

    erb :location
  end

  post '/marker' do
    req = JSON.parse(request.body.read)

    address = Address.find_or_create_by(country: req['country'], city: req['city'])

    markers = address.markers.all.select do |marker|
      marker[:lat] == req['lat'] and marker[:lng] == req['lng'] \
       or marker[:name] == req['name']
    end

    res1 = address.markers.find_by(lat: req['lat'], lng: req['lng'])
    res2 = address.markers.find_by(name: req['name'])

    if res1 == nil and res2 == nil
      address.markers.create(
        :lat => req['lat'], \
        :lng => req['lng'], \
        :name => req['name'], \
        :opening => req['opening'], \
        :closing => req['closing'], \
        :wifi => req['wifi'].to_s == 'true', \
        :rating => 0, \
        :votes => 0 \
      )

      return 'Created'
    else
      return 'Updated'
    end
  end

  post '/json/countries' do
    return Country.all.to_a.to_json
  end


  post '/json/cities' do
    req = JSON.parse(request.body.read)

    states = Country.find_by(name: req['country']).states.all.to_a

    cities = []

    states.each do |state|
      if !state.cities.exists?
        cities.push(state)
      else
        cities += state.cities.all
      end
    end

    return cities.to_json
  end

  post '/json/markers' do
    req = JSON.parse(request.body.read)

    address = Address.find_or_create_by(
      city: req['city'], \
      country: req['country'] \
    )

    return address.markers.all.to_a.to_json
  end
end
