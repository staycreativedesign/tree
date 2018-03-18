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

get '/jobs' do
  haml :jobs
end


get '/jobs-show' do
  haml :jobs_show
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
