# frozen_string_literal: true

class ChatChannel < ApplicationCable::Channel
  def subscribed
    # stream_from 'some_channel'　# すべてのクライアントに配信
    stream_from "room_#{params[:id]}"
  end

  def speak(data)
    # ActionCable.server.broadcast('some_channel', 'hgge')　# すべてのクライアントに配信
    ActionCable.server.broadcast("room_#{data[:id]}", 'hgge')
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
