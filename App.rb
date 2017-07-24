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

    addresses = Address.all.select do |address|
      address[:country] == res['country'] and address[:city] == res['city']
    end

    out = []

    for a in addresses.first.markers.all.to_a do
      out.push(a.to_json)
    end

    return { :markers => out }.to_json
  end

  post '/marker' do
    res = JSON.parse(request.body.read)

    addresses = Address.all.select do |address|
      address[:country] == res['country'] and address[:city] == res['city']
    end

    if addresses.length == 0
      address = Address.create(country: res['country'], city: res['city'])
    else
      address = addresses.first
    end

    markers = address.markers.all.select do |marker|
      marker[:lat] == res['lat'].to_f and marker[:lng] == res['lng'].to_f
    end

    if markers.length == 0
      address.markers.create(lat: res['lat'], lng: res['lng'])
      return 'Spot Added'
    else
      return 'Spot Already Exists'
    end
  end
end
