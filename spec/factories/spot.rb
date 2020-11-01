# frozen_string_literal: true

FactoryBot.define do
  factory :spot do
    name { Faker::Name.name }
    opening_hours { Faker::Time.forward(period: :morning).strftime("%R %z") }
    closing_hours { Faker::Time.forward(period: :evening).strftime("%R %z") }
    network_quality { Faker::Number.between(from: 1, to: 5) }
    plugs_available { Faker::Boolean.boolean }
    latitude { Faker::Address.latitude }
    longitude { Faker::Address.longitude }
  end
end
