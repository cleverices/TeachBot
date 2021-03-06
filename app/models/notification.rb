class Notification < ApplicationRecord
  belongs_to :user, touch: true

  class << self
    def generate(title, text, link = nil)
      self.new(title: title, text: text, link: link)
    end

    def new_chat(chat, initiator)
      self.new title: 'New chat',
               text: 'New chat from ' + initiator.username,
               link: '/chats?chat=' + chat.id.to_s
    end
  end
end
