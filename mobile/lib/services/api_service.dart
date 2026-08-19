import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';
import '../utils/constants.dart';

class ApiService {
  static final ApiService _instance = ApiService._internal();
  factory ApiService() => _instance;
  ApiService._internal();

  String _token = '';

  set token(String token) => _token = token;

  Future<http.Response> _request(
    String method,
    String endpoint, {
    Map<String, String>? headers,
    dynamic body,
  }) async {
    final url = Uri.parse('${Constants.baseUrl}$endpoint');
    final prefs = await SharedPreferences.getInstance();
    final token = prefs.getString(Constants.tokenKey) ?? _token;

    final defaultHeaders = {
      'Content-Type': 'application/json',
      if (token.isNotEmpty) 'Authorization': 'Bearer $token',
    };

    final request = http.Request(method, url);
    request.headers.addAll(defaultHeaders);
    if (headers != null) request.headers.addAll(headers);

    if (body != null) {
      request.body = jsonEncode(body);
    }

    final streamedResponse = await request.send();
    final response = await http.Response.fromStream(streamedResponse);

    if (response.statusCode == 401) {
      await prefs.remove(Constants.tokenKey);
      await prefs.remove(Constants.userKey);
    }

    return response;
  }

  Future<dynamic> get(String endpoint) async {
    final response = await _request('GET', endpoint);
    return _handleResponse(response);
  }

  Future<dynamic> post(String endpoint, {dynamic body}) async {
    final response = await _request('POST', endpoint, body: body);
    return _handleResponse(response);
  }

  Future<dynamic> put(String endpoint, {dynamic body}) async {
    final response = await _request('PUT', endpoint, body: body);
    return _handleResponse(response);
  }

  Future<dynamic> delete(String endpoint) async {
    final response = await _request('DELETE', endpoint);
    return _handleResponse(response);
  }

  dynamic _handleResponse(http.Response response) {
    final body = jsonDecode(response.body);
    if (response.statusCode >= 200 && response.statusCode < 300) {
      return body;
    } else {
      throw Exception(body['message'] ?? 'Something went wrong');
    }
  }
}