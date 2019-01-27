require_relative "spec_helper"
require_relative "../where_to_code.rb"

def app
  WhereToCode
end

describe WhereToCode do
  it "responds with a welcome message" do
    get '/'

    last_response.body.must_include 'Welcome to the Sinatra Template!'
  end
end
