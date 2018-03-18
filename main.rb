require 'rubygems'
require 'sinatra'
require 'bundler/setup'
require 'tilt/haml'

set :session_secret, "328479283uf923fu8932fu923uf9832f23f232"
enable :sessions

get '/' do
  haml :index
end

get '/about' do
  haml :about
end

get '/reservoir-management' do
  haml :consult_1
end

get '/reservoir-characterization' do
  haml :consult_2
end


get '/multiphase-flow-systems' do
  haml :consult_3
end


get '/production-optimization' do
  haml :consult_4
end

get '/software-development' do
  haml :consult_5
end

get '/compact-separation' do
  haml :training_1
end

get '/multiphase-flow-assurance' do
  haml :training_2
end

get '/uncertainty-analysis' do
  haml :training_3
end

get '/water-treatment' do
  haml :training_4
end

get '/integrated-reservoir-development' do
  haml :training_5
end

get '/inline-compact-water-separator' do
  haml :equipment_1
end

get '/jet-gas' do
  haml :equipment_2
end

get '/gas-liquid-cylindrical-cyclone-compact-separator' do
  haml :equipment_3
end


get '/water-polisher' do
  haml :equipment_4
end

get '/wellbore-sand-transport-simulator' do
  haml :software_1
end

get '/uncertainty-based-production-allocation-analysis' do
  haml :software_2
end

get '/iloop' do
  haml :software_3
end

get '/custom-multiphase' do
  haml :software_4
end

get '/careers' do
  haml :careers
end


get '/contact' do
  @success_message = session[:success_message]
  session[:success_message] = nil
  haml :contact
end

post '/contact' do
  require 'pony'
  Pony.mail({
    :to => 'gustavoanalytics@gmail.com',
    :subject => params[:cname] + "has contacted you via your website",
    :headers => { 'Content-Type' => 'text/html' },
    :body => "<br><br>Email: #{params[:cemail]}" + "<br><br><br>Message: #{params[:cmessage]}" + "<br><br> Phone: #{params[:cphone]}",
    :via => :smtp,
    :via_options => {
      :address              => 'smtp.gmail.com',
      :port                 => '587',
      :enable_starttls_auto => true,
      :user_name            => "emailredirectionserviceonline@gmail.com",
      :password             => "rz30^4611",
      :authentication       => :plain, # :plain, :login, :cram_md5, no auth by default
      :domain               => "staycreativedesign.com" # the HELO domain provided by the client to the server
    }
  })
  session[:success_message] = "Message sent, we will be contacting you shortly."
  redirect '/contact'
end
