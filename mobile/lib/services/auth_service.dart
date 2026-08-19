import 'dart:convert';
import 'package:shared_preferences/shared_preferences.dart';
import 'api_service.dart';
import '../models/user.dart';
import '../utils/constants.dart';

class AuthService {
  final ApiService _api = ApiService();

  Future<void> sendOTP(String email) async {
    await _api.post('/auth/send-otp', body: {'email': email});
  }

  Future<User> verifyOTP(String email, String otp) async {
    final response = await _api.post('/auth/verify-otp', body: {
      'email': email,
      'otp': otp,
    });

    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(Constants.tokenKey, response['token']);
    await prefs.setString(Constants.userKey, jsonEncode(response['user']));

    return User.fromJson(response['user']);
  }

  static Future<User?> getCurrentUser() async {
    final prefs = await SharedPreferences.getInstance();
    final userJson = prefs.getString(Constants.userKey);
    if (userJson != null) {
      return User.fromJson(jsonDecode(userJson));
    }
    return null;
  }

  static Future<String?> getToken() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getString(Constants.tokenKey);
  }

  static Future<void> logout() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove(Constants.tokenKey);
    await prefs.remove(Constants.userKey);
  }

  static Future<bool> isLoggedIn() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.containsKey(Constants.tokenKey);
  }
}