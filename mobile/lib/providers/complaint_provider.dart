import 'package:flutter/material.dart';
import '../models/complaint.dart';
import '../services/api_service.dart';

class ComplaintProvider extends ChangeNotifier {
  final ApiService _api = ApiService();
  List<Complaint> _complaints = [];
  bool _isLoading = false;
  String? _error;

  List<Complaint> get complaints => _complaints;
  bool get isLoading => _isLoading;
  String? get error => _error;

  Future<void> createComplaint({
    required String address,
    required List<double> coordinates,
    required String beforePhoto,
  }) async {
    _isLoading = true;
    _error = null;
    notifyListeners();

    try {
      final response = await _api.post('/complaints', body: {
        'address': address,
        'location': {
          'type': 'Point',
          'coordinates': coordinates,
        },
        'beforePhoto': beforePhoto,
      });

      // Ensure response has 'complaint' key
      if (response is Map && response.containsKey('complaint')) {
        final complaintData = response['complaint'];
        try {
          final complaint = Complaint.fromJson(complaintData);
          _complaints.insert(0, complaint);
          notifyListeners();
        } catch (e) {
          print('❌ Failed to parse complaint: $e');
          throw Exception('Failed to parse complaint data: $e');
        }
      } else {
        throw Exception('Unexpected response format: missing "complaint" key');
      }
    } catch (e) {
      _error = e.toString();
      rethrow;
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }

  Future<void> fetchMyComplaints() async {
    _isLoading = true;
    _error = null;
    notifyListeners();

    try {
      final response = await _api.get('/complaints/my');

      if (response is List) {
        _complaints = response.map((item) {
          try {
            return Complaint.fromJson(item);
          } catch (e) {
            print('❌ Error parsing complaint: $e');
            return null;
          }
        }).whereType<Complaint>().toList();
      } else {
        _complaints = [];
      }
      notifyListeners();
    } catch (e) {
      _error = e.toString();
      rethrow;
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }

  Future<void> fetchAssignedComplaints() async {
    _isLoading = true;
    _error = null;
    notifyListeners();

    try {
      final response = await _api.get('/complaints/assigned');
      if (response is List) {
        _complaints = response.map((item) {
          try {
            return Complaint.fromJson(item);
          } catch (e) {
            print('❌ Error parsing complaint: $e');
            return null;
          }
        }).whereType<Complaint>().toList();
      } else {
        _complaints = [];
      }
      notifyListeners();
    } catch (e) {
      _error = e.toString();
      rethrow;
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }

  Future<void> resolveComplaint(String id, String afterPhoto) async {
    _isLoading = true;
    _error = null;
    notifyListeners();

    try {
      await _api.put('/complaints/$id/resolve', body: {
        'afterPhoto': afterPhoto,
      });
      await fetchAssignedComplaints();
    } catch (e) {
      _error = e.toString();
      rethrow;
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }

  Future<void> verifyComplaint(String id, bool resolved) async {
    _isLoading = true;
    _error = null;
    notifyListeners();

    try {
      await _api.put('/complaints/$id/verify', body: {
        'resolved': resolved,
      });
      await fetchMyComplaints();
    } catch (e) {
      _error = e.toString();
      rethrow;
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }
}