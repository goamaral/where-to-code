# Clear
Account.delete_all

# Seed
puts "ADMIN"
admin = Account.create!(
  username: "admin",
  email: "admin@email.com",
  password: "admin_secret",
  password_confirmation: "admin_secret",
  role: :admin,
  terms: true
)
ap admin

puts "USER"
user = Account.create!(
  username: "user",
  email: "user@email.com",
  password: "user_secret",
  password_confirmation: "user_secret",
  role: :normal,
  terms: true
)
ap user