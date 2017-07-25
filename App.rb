require 'sinatra'
require 'rubygems'
require 'active_record'

ActiveRecord::Base.establish_connection(
  :adapter  => "mysql2",
  :host     => "127.0.0.1",
  :username => "root",
  :password => "root",
  :database => "where-to-code"
)

Dir["#{Dir.pwd}/models/*.rb"].each { |file| require file }

class App < Sinatra::Base
  get '/' do
    erb :home
  end

  get '/location/:location' do
    @location = params[:location]

    erb :location
  end

  post '/markers' do
    res = JSON.parse(request.body.read)

    address = Address.find_or_create_by(country: res['country'], city: res['city'])

    out = []

    for a in address.markers.all.to_a do
      out.push(a.to_json)
    end

    return { :markers => out }.to_json
  end

  post '/marker' do
    res = JSON.parse(request.body.read)

    address = Address.find_or_create_by(country: res['country'], city: res['city'])

    markers = address.markers.all.select do |marker|
      marker[:lat] == res['lat'] \
      and marker[:lng] == res['lng'] \
      and marker[:name] == res['name'] \
      and marker[:morning] == res['morning'] \
      and marker[:afternoon] == res['afternoon'] \
      and marker[:night] == res['night']
    end

    if !address.markers.exists?(:lat => res['lat'], :lng => res['lng'])
      address.markers.create(
        :lat => res['lat'], \
        :lng => res['lng'], \
        :name => res['name'], \
        :morning => res['morning'], \
        :afternoon => res['afternoon'], \
        :night => res['night'] \
      )
      return 'Spot Added'
    else
      return 'Spot Already Exists'
    end
  end
end
