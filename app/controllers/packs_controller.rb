class PacksController < ApplicationController
	include ReverseProxy::Controller

	def index
		reverse_proxy "http://localhost:8080/packs" do |config|
		
		end
	end
end