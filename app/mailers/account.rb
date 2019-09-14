WhereToCode::App.mailer :account do

  email :updated do |user|
    status = (user.created_at == user.updated_at) ? "created" : "updated"

    to user.email
    subject "Account #{status}"
    locals name: user.username, status: status
    provides :plain, :html
    render 'account/updated'
  end

end