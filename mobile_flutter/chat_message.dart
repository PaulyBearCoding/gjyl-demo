/// Model for chat messages in the IGetTo app

class ChatMessage {
  final String id;
  final String senderId;
  final String senderName;
  final String senderAvatar;
  final String content;
  final DateTime timestamp;
  final bool isRead;
  final bool? isEncrypted;
  final String? encryptionType;

  ChatMessage({
    required this.id,
    required this.senderId,
    required this.senderName,
    required this.senderAvatar,
    required this.content,
    required this.timestamp,
    this.isRead = false,
    this.isEncrypted = false,
    this.encryptionType,
  });

  // Create a copy of this message with some fields updated
  ChatMessage copyWith({
    String? id,
    String? senderId,
    String? senderName,
    String? senderAvatar,
    String? content,
    DateTime? timestamp,
    bool? isRead,
    bool? isEncrypted,
    String? encryptionType,
  }) {
    return ChatMessage(
      id: id ?? this.id,
      senderId: senderId ?? this.senderId,
      senderName: senderName ?? this.senderName,
      senderAvatar: senderAvatar ?? this.senderAvatar,
      content: content ?? this.content,
      timestamp: timestamp ?? this.timestamp,
      isRead: isRead ?? this.isRead,
      isEncrypted: isEncrypted ?? this.isEncrypted,
      encryptionType: encryptionType ?? this.encryptionType,
    );
  }
}

class ChatConversation {
  final String id;
  final String name; // For group chats
  final List<String> participantIds;
  final List<String> participantNames;
  final List<String> participantAvatars;
  final List<ChatMessage> messages;
  final DateTime lastActivity;
  final bool? isEncrypted;
  final bool? encryptionEnabled;
  final String? encryptionType;

  ChatConversation({
    required this.id,
    required this.name,
    required this.participantIds,
    required this.participantNames,
    required this.participantAvatars,
    required this.messages,
    required this.lastActivity,
    this.isEncrypted = false,
    this.encryptionEnabled = false,
    this.encryptionType,
  });

  // Get the last message in the conversation
  ChatMessage? get lastMessage => messages.isNotEmpty ? messages.last : null;

  // Get the unread count
  int get unreadCount => messages.where((msg) => !msg.isRead).length;

  // Create a copy of this conversation with some fields updated
  ChatConversation copyWith({
    String? id,
    String? name,
    List<String>? participantIds,
    List<String>? participantNames,
    List<String>? participantAvatars,
    List<ChatMessage>? messages,
    DateTime? lastActivity,
    bool? isEncrypted,
    bool? encryptionEnabled,
    String? encryptionType,
  }) {
    return ChatConversation(
      id: id ?? this.id,
      name: name ?? this.name,
      participantIds: participantIds ?? this.participantIds,
      participantNames: participantNames ?? this.participantNames,
      participantAvatars: participantAvatars ?? this.participantAvatars,
      messages: messages ?? this.messages,
      lastActivity: lastActivity ?? this.lastActivity,
      isEncrypted: isEncrypted ?? this.isEncrypted,
      encryptionEnabled: encryptionEnabled ?? this.encryptionEnabled,
      encryptionType: encryptionType ?? this.encryptionType,
    );
  }
}
