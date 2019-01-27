# Load path and gems/bundler
$LOAD_PATH << File.expand_path(File.dirname(__FILE__))

require "bundler"
Bundler.require

# Local config
require "find"

%w{config lib}.each {|load_path| require_all load_path }

# Load app
require "where_to_code"
run WhereToCode
