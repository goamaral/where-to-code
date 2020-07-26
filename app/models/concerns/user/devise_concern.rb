module User::DeviseConcern

  extend ActiveSupport::Concern

  included do
    devise :database_authenticatable, :registerable, :confirmable, :recoverable, :rememberable , :validatable
  end

end