require 'sinatra/base'

require './Controllers/Test.rb'
require './App.rb'

# map the controllers to routes
map('/test') { run TestController }
map('/') { run ApplicationController }