# frozen_string_literal: true

class CountsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def create
    count = params[:count]
    client_id = params[:id]
    if count > 7
      ## すべての購読者
      users = User.all
      users.each do |user|
        ActionCable.server.broadcast("channel_#{user.client_id}", { tag: 'all', count: count })
      end
    elsif count > 3
      ## 自分だけ
      ActionCable.server.broadcast("channel_#{client_id}", { tag: 'one', count: count })
    end
  end
end
