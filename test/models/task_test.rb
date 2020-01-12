# == Schema Information
#
# Table name: tasks
#
#  id                :bigint           not null, primary key
#  name              :string           not null
#  due_date          :datetime         default(Fri, 01 Nov 2019 23:15:41 UTC +00:00), not null
#  priority          :integer          not null
#  score             :float            not null
#  score_update_date :date             default(Fri, 01 Nov 2019), not null
#  user_id           :bigint           not null
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#

require 'test_helper'

class TaskTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
