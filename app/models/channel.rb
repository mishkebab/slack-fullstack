# == Schema Information
#
# Table name: channels
#
#  id           :bigint           not null, primary key
#  name         :string           not null
#  workspace_id :bigint           not null
#  owner_id     :bigint           not null
#  description  :string
#  created_at   :datetime         not null
#  updated_at   :datetime         not null

class Channel < ApplicationRecord
  belongs_to :workspace

  belongs_to :owner,
    class_name: 'User',
    foreign_key: 'owner_id'

  has_many :channel_subscriptions,
    dependent: :destroy

  has_many :messages, as: :messageable

  has_many :users,
    through: :channel_subscriptions
end
