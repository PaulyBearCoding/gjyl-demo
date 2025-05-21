import 'dart:async';
import 'dart:math';
import '../models/chat_message.dart';
import '../utils/image_assets.dart';

/// Service to handle chat functionality
///
/// This is a mock implementation that simulates API calls
class ChatService {
  // Singleton pattern
  static final ChatService _instance = ChatService._internal();
  factory ChatService() => _instance;
  ChatService._internal();

  // Current user ID
  final String _currentUserId = 'current_user';
  final String _currentUserName = 'You';

  // Mock conversations
  List<ChatConversation> _conversations = [];

  // Stream controllers for real-time updates
  final _conversationsController =
      StreamController<List<ChatConversation>>.broadcast();
  Stream<List<ChatConversation>> get conversationsStream =>
      _conversationsController.stream;

  // Initialize the service with mock data
  Future<void> initialize() async {
    // Create mock conversations
    _conversations = [
      _createMockConversation(
        '1',
        'John',
        'John',
        ImageAssets.getChatProfileImage('John'),
        [
          "Hey there! How's your day going?",
          "I saw your post about the community service. That's amazing work!",
          "Would you be interested in joining our beach cleanup this weekend?",
        ],
      ),
      _createMockConversation(
        '2',
        'Emma',
        'Emma',
        ImageAssets.getChatProfileImage('Emma'),
        [
          "Congratulations on your sobriety milestone! 🎉",
          "One year is huge! So proud of you.",
          "Let's celebrate sometime soon!",
          "I'd love to hear more about your journey.",
        ],
      ),
      _createMockConversation(
        '3',
        'Michael',
        'Michael',
        ImageAssets.getChatProfileImage('Michael'),
        [
          "That meditation technique you shared was life-changing!",
          "I've been doing it every morning for a week now.",
          "Do you have any other wellness practices you recommend?",
        ],
      ),
      _createMockConversation(
        '4',
        'IGetTo Friends',
        'Group Chat',
        '',
        [
          "Welcome to the group chat!",
          "This is where we can all share our positive experiences.",
          "Does anyone have any exciting news to share today?",
        ],
        isGroup: true,
        participantNames: ['You', 'John', 'Emma', 'Michael'],
        participantAvatars: [
          ImageAssets.getUserAvatar('ME'),
          ImageAssets.getChatProfileImage('John'),
          ImageAssets.getChatProfileImage('Emma'),
          ImageAssets.getChatProfileImage('Michael'),
        ],
      ),
    ];

    // Initial update
    _notifyListeners();
  }

  // Create a mock conversation
  ChatConversation _createMockConversation(
    String id,
    String name,
    String participantName,
    String participantAvatar,
    List<String> messageContents, {
    bool isGroup = false,
    List<String> participantNames = const [],
    List<String> participantAvatars = const [],
  }) {
    final now = DateTime.now();

    // For one-on-one chats
    List<String> pNames =
        isGroup ? participantNames : [_currentUserName, participantName];

    List<String> pAvatars =
        isGroup
            ? participantAvatars
            : [ImageAssets.getUserAvatar('ME'), participantAvatar];

    List<String> pIds =
        isGroup
            ? List.generate(pNames.length, (index) => 'user_$index')
            : [_currentUserId, 'user_$id'];

    // Create messages
    final messages = <ChatMessage>[];

    // Determine who sends which messages
    for (int i = 0; i < messageContents.length; i++) {
      // For group chats, randomize the sender
      // For one-on-one chats, alternate between participants
      final senderIndex =
          isGroup
              ? Random().nextInt(pNames.length)
              : (i % 2 == 0)
              ? 1
              : 0; // First message from the other person

      messages.add(
        ChatMessage(
          id: 'msg_${id}_$i',
          senderId: pIds[senderIndex],
          senderName: pNames[senderIndex],
          senderAvatar: pAvatars[senderIndex],
          content: messageContents[i],
          timestamp: now.subtract(
            Duration(minutes: (messageContents.length - i) * 5),
          ),
          isRead: senderIndex != 0, // Messages from others start as unread
        ),
      );
    }

    return ChatConversation(
      id: id,
      name: name,
      participantIds: pIds,
      participantNames: pNames,
      participantAvatars: pAvatars,
      messages: messages,
      lastActivity: now,
    );
  }

  // Get all conversations
  Future<List<ChatConversation>> getConversations() async {
    // Simulate API delay
    await Future.delayed(const Duration(milliseconds: 500));
    return _conversations;
  }

  // Get a single conversation by ID
  Future<ChatConversation?> getConversation(String id) async {
    // Simulate API delay
    await Future.delayed(const Duration(milliseconds: 500));
    return _conversations.firstWhere((c) => c.id == id);
  }

  // Send a message
  Future<void> sendMessage(String conversationId, String content) async {
    // Find the conversation
    final conversationIndex = _conversations.indexWhere(
      (c) => c.id == conversationId,
    );
    if (conversationIndex == -1) return;

    final conversation = _conversations[conversationIndex];

    // Create the new message
    final newMessage = ChatMessage(
      id: 'msg_${conversationId}_${conversation.messages.length}',
      senderId: _currentUserId,
      senderName: _currentUserName,
      senderAvatar: ImageAssets.getUserAvatar('ME'),
      content: content,
      timestamp: DateTime.now(),
      isRead: false,
    );

    // Add the message to the conversation
    final updatedMessages = [...conversation.messages, newMessage];
    final updatedConversation = conversation.copyWith(
      messages: updatedMessages,
      lastActivity: DateTime.now(),
    );

    // Update the conversation list
    _conversations[conversationIndex] = updatedConversation;

    // Notify listeners
    _notifyListeners();

    // Simulate API delay
    await Future.delayed(const Duration(milliseconds: 500));

    // Simulate response for demo purposes
    if (conversation.participantIds.length == 2) {
      // Get the other participant
      final otherParticipantId = conversation.participantIds.firstWhere(
        (id) => id != _currentUserId,
      );

      final otherParticipantIndex = conversation.participantIds.indexOf(
        otherParticipantId,
      );
      final otherParticipantName =
          conversation.participantNames[otherParticipantIndex];
      final otherParticipantAvatar =
          conversation.participantAvatars[otherParticipantIndex];

      // Create an auto-response
      final responseMessage = ChatMessage(
        id:
            'msg_${conversationId}_${_conversations[conversationIndex].messages.length}',
        senderId: otherParticipantId,
        senderName: otherParticipantName,
        senderAvatar: otherParticipantAvatar,
        content: _getAutoResponse(content),
        timestamp: DateTime.now().add(const Duration(minutes: 1)),
        isRead: false,
      );

      // Add the response to the conversation
      _conversations[conversationIndex] = _conversations[conversationIndex]
          .copyWith(
            messages: [
              ..._conversations[conversationIndex].messages,
              responseMessage,
            ],
            lastActivity: DateTime.now().add(const Duration(minutes: 1)),
          );

      // Wait a bit and then notify listeners
      await Future.delayed(const Duration(seconds: 2));
      _notifyListeners();
    }
  }

  // Mark a conversation as read
  Future<void> markConversationAsRead(String conversationId) async {
    // Find the conversation
    final conversationIndex = _conversations.indexWhere(
      (c) => c.id == conversationId,
    );
    if (conversationIndex == -1) return;

    final conversation = _conversations[conversationIndex];

    // Mark all messages as read
    final updatedMessages =
        conversation.messages.map((msg) {
          return msg.copyWith(isRead: true);
        }).toList();

    // Update the conversation
    _conversations[conversationIndex] = conversation.copyWith(
      messages: updatedMessages,
    );

    // Notify listeners
    _notifyListeners();

    // Simulate API delay
    await Future.delayed(const Duration(milliseconds: 300));
  }

  // Notify all listeners of an update
  void _notifyListeners() {
    _conversationsController.add(_conversations);
  }

  // Clean up resources
  void dispose() {
    _conversationsController.close();
  }

  // Generate an auto-response based on the message content
  String _getAutoResponse(String message) {
    message = message.toLowerCase();

    if (message.contains('hello') ||
        message.contains('hi') ||
        message.contains('hey')) {
      return 'Hey there! How are you doing today?';
    } else if (message.contains('how are you')) {
      return 'I\'m doing great! Thanks for asking. How about you?';
    } else if (message.contains('thank')) {
      return 'You\'re welcome! 😊';
    } else if (message.contains('bye') || message.contains('goodbye')) {
      return 'Talk to you later! Have a great day!';
    } else if (message.contains('help')) {
      return 'I\'d be happy to help! What do you need assistance with?';
    } else if (message.contains('weekend')) {
      return 'I have some exciting plans for the weekend! How about you?';
    } else if (message.contains('event') || message.contains('meet')) {
      return 'That sounds great! Count me in!';
    } else {
      // Generic responses
      final responses = [
        'That\'s interesting!',
        'I see what you mean.',
        'I appreciate you sharing that with me.',
        'Thanks for letting me know!',
        'I\'ll keep that in mind.',
        'That\'s great to hear!',
        'How wonderful!',
        'Let\'s talk more about this soon.',
      ];

      return responses[Random().nextInt(responses.length)];
    }
  }
}
