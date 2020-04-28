# frozen_string_literal: true

class NotificationChannel < ApplicationCable::Channel
  def subscribed
    user = User.new(client_id: params[:id])
    user.save!
    stream_from "channel_#{user.client_id}"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
