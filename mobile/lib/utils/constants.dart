import 'package:flutter_dotenv/flutter_dotenv.dart';

class Constants {
  static String get baseUrl => dotenv.env['API_BASE_URL'] ?? 'http://localhost:5000/api';

  static const String tokenKey = 'token';
  static const String userKey = 'user';

  static const Map<String, String> statusColors = {
    'Open': '#2196f3',
    'Assigned': '#ff9800',
    'Resolved': '#4caf50',
    'Closed': '#9e9e9e',
    'Escalated': '#f44336',
  };

  static const Map<String, String> statusIcons = {
    'Open': '📋',
    'Assigned': '👤',
    'Resolved': '✅',
    'Closed': '🔒',
    'Escalated': '🚨',
  };
}