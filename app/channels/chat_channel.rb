# frozen_string_literal: true

class ChatChannel < ApplicationCable::Channel
  def subscribed
    stream_from 'chat_channel'
  end

  def speak(data)
    # ブロードキャスト
    ActionCable.server.broadcast('chat_channel', data['text'])
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
