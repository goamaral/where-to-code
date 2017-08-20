require 'sinatra'
require 'rubygems'
require 'active_record'

# Database config
ActiveRecord::Base.establish_connection(
  :adapter  => "mysql2",
  :host     => "127.0.0.1",
  :username => "root",
  :password => "root",
  :database => "where-to-code"
)

# Models
Dir["#{Dir.pwd}/models/*.rb"].each { |file| require file }

class App < Sinatra::Base
  get '/' do
    erb :home
  end

  get '/location/:location' do
    @location = params[:location]

    erb :location
  end

  post '/marker' do
    res = JSON.parse(request.body.read)

    address = Address.find_or_create_by(country: res['country'], city: res['city'])

    markers = address.markers.all.select do |marker|
      marker[:lat] == res['lat'] and marker[:lng] == res['lng'] or marker[:name] == res['name']
    end

    res1 = address.markers.find_by(lat: res['lat'], lng: res['lng'])
    res2 = address.markers.find_by(name: res['name'])

    if res1 == nil and res2 == nil
      address.markers.create(
        :lat => res['lat'], \
        :lng => res['lng'], \
        :name => res['name'], \
        :opening => res['opening'], \
        :closing => res['closing'], \
        :wifi => res['wifi'].to_s == 'true', \
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

  post '/json/markers' do
    res = JSON.parse(request.body.read)

    address = Address.find_or_create_by(city: res['city'])

    return address.markers.all.to_a.to_json
  end
end
