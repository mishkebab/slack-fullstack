class Api::MessagesController < ApplicationController
    def index
        # @messages = Message.where(ch)
        # render 'api/messages/index'
    end

    def show
        @message = Message.find(params[:id])
        render 'api/messages/show'
    end

    def create
        @message = Message.new(message_params)
        @message.author = current_user

        if !@message.save
            render json: @message.errors.full_messages, status: 422
        else
            ChatChannel.broadcast_to(@message.messageable, @message)
            render 'api/messages/show'
        end 
    end

    def update
        @message = current_user.messages.find(params[:id])

        if !@message.update(message_params)
            render json: @message.errors.full_messages, status: 422
        else
            render 'api/messages/show'
        end 
    end

    def destroy
        @message = current_user.messages.find(params[:id])
        @message.destroy
    end 

    private
    def message_params
        params.require(:message).permit(:content, :author_id, :messageable_type, :messageable_id)
    end 
end
