from django.contrib import admin
from .models import Chat, Message, Reaction


class MessageInline(admin.TabularInline):
    model = Message
    extra = 0
    fields = ('sender', 'content', 'created_at')
    readonly_fields = ('sender', 'content', 'created_at')


@admin.register(Chat)
class ChatAdmin(admin.ModelAdmin):
    list_display = ('get_participants', 'created_at')
    search_fields = ('participants__username',)
    filter_horizontal = ('participants',)
    inlines = [MessageInline]

    def get_participants(self, obj):
        """Повертає коми для учасників чату."""
        return ', '.join([user.username for user in obj.participants.all()])

    get_participants.short_description = 'Учасники'


class ReactionInline(admin.TabularInline):
    model = Reaction
    extra = 0
    fields = ('user', 'emoji', 'created_at')
    readonly_fields = ('user', 'emoji', 'created_at')


@admin.register(Message)
class MessageAdmin(admin.ModelAdmin):
    list_display = ('content', 'sender', 'chat', 'created_at')
    search_fields = ('sender__username', 'chat__participants__username')
    list_filter = ('is_read', 'created_at', 'chat', 'sender')
    readonly_fields = ('created_at',)
    inlines = [ReactionInline]

    def get_chat(self, obj):
        """Повертає назву чату з учасниками."""
        return ', '.join([user.username for user in obj.chat.participants.all()])

    get_chat.short_description = 'Чат'
