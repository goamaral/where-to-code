class User
  include Mongoid::Document
  include Mongoid::Timestamps

  before_save :hash_password

  field :username, type: String
  field :email, type: String
  field :password, type: String
  field :terms_accepted, type: Boolean

  validates :username, uniqueness: true, presence: true
  validates :email, uniqueness: true, presence: true
  validates :password, length: { minimum: 8, maximum: 16 }, presence: true
  validates :terms_accepted, presence: true

  validates_confirmation_of :password, on: :create
  validates_acceptance_of :terms_accepted, on: :create

  def hash_password
    if password_changed?
      password = BCrypt::Password.create(password)
    end
  end
end
