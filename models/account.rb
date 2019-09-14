class Account
  include Mongoid::Document
  include Mongoid::Timestamps

  attr_accessor :password, :password_confirmation

  # Roles #
  ROLES = [:admin, :regular]

  # Fields #
  field :name, type: String
  field :username, type: String
  field :email, type: String
  field :crypted_password, type: String
  field :terms, type: Boolean, default: false
  field :role, type: Symbol, default: :regular

  # Validations #
  validates_presence_of :email, :role
  validates_presence_of :password, if: :password_required
  validates_presence_of :password_confirmation, if: :password_required

  validates_length_of :password, within: 8..40, if: :password_required
  validates_length_of :email, within: 3..100

  validates_confirmation_of :password, if: :password_required

  validates_acceptance_of :terms, on: :create

  validates_uniqueness_of :email, case_sensitive: false
  validates_uniqueness_of :username

  validates_format_of :email, with: /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\Z/i

  # Callbacks #
  before_save :encrypt_password, if: :password_required
  before_save :normalize_role
  after_save :send_update_email

  # Scope Methods #
  

  # Static Methods #
  def self.authenticate(email, password)
    account = where(email: /#{Object::Regexp.escape(email)}/i).first if email.present?
    account && account.has_password?(password) ? account : nil
  end

  # Methods #
  def has_password?(password)
    BCrypt::Password.new(crypted_password) == password
  end

  # Helper Methods #
  private
    def password_required
      @password.present? 
    end

    def encrypt_password 
      @password = BCrypt::Password.create(Time.current)[10..20] unless password_required
      self.crypted_password = BCrypt::Password.create(@password)
    end

    def normalize_role
      self.role = role.downcase.to_sym
    end
end
