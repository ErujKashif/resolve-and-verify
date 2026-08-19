import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';
import '../../providers/complaint_provider.dart';
import '../../services/location_service.dart';
import '../../services/camera_service.dart';

class NewComplaintScreen extends StatefulWidget {
  const NewComplaintScreen({super.key});

  @override
  State<NewComplaintScreen> createState() => _NewComplaintScreenState();
}

class _NewComplaintScreenState extends State<NewComplaintScreen> {
  final TextEditingController _addressController = TextEditingController();
  List<double> _coordinates = [0.0, 0.0];
  String? _beforePhoto;
  bool _isLoading = false;
  bool _isLocationLoading = false;
  String? _error;
  String? _success;

  final LocationService _locationService = LocationService();
  final CameraService _cameraService = CameraService();

  Future<void> _captureLocation() async {
    setState(() {
      _isLocationLoading = true;
      _error = null;
    });

    try {
      final position = await _locationService.getCurrentLocation();
      setState(() {
        _coordinates = [position.longitude, position.latitude];
      });
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text('📍 Location captured successfully'),
            backgroundColor: Colors.green,
          ),
        );
      }
    } catch (e) {
      setState(() => _error = e.toString());
    } finally {
      setState(() => _isLocationLoading = false);
    }
  }

  Future<void> _takePhoto() async {
    setState(() => _error = null);
    try {
      final photo = await _cameraService.takePhoto();
      if (photo != null) {
        setState(() => _beforePhoto = photo);
      }
    } catch (e) {
      setState(() => _error = e.toString());
    }
  }

  Future<void> _submitComplaint() async {
    final address = _addressController.text.trim();
    if (address.isEmpty) {
      setState(() => _error = 'Please enter the address');
      return;
    }
    if (_coordinates[0] == 0.0 && _coordinates[1] == 0.0) {
      setState(() => _error = 'Please capture your location');
      return;
    }
    if (_beforePhoto == null) {
      setState(() => _error = 'Please take a before photo');
      return;
    }

    setState(() {
      _isLoading = true;
      _error = null;
      _success = null;
    });

    try {
      await context.read<ComplaintProvider>().createComplaint(
            address: address,
            coordinates: _coordinates,
            beforePhoto: _beforePhoto!,
          );
      setState(() => _success = '✅ Complaint submitted successfully!');

      _addressController.clear();
      _coordinates = [0.0, 0.0];
      _beforePhoto = null;

      Future.delayed(const Duration(seconds: 2), () {
        if (mounted) {
          // ✅ Use go_router navigation to go back
          context.go('/citizen');
        }
      });
    } catch (e) {
      setState(() => _error = e.toString());
    } finally {
      setState(() => _isLoading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('New Complaint'),
        backgroundColor: Colors.green.shade700,
        foregroundColor: Colors.white,
      ),
      body: _isLoading
          ? const Center(child: CircularProgressIndicator())
          : SingleChildScrollView(
              padding: const EdgeInsets.all(16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  if (_error != null)
                    Container(
                      width: double.infinity,
                      padding: const EdgeInsets.all(12),
                      decoration: BoxDecoration(
                        color: Colors.red.shade50,
                        borderRadius: BorderRadius.circular(8),
                        border: Border.all(color: Colors.red.shade200),
                      ),
                      child: Text(
                        _error!,
                        style: TextStyle(color: Colors.red.shade700),
                      ),
                    ),
                  if (_success != null) ...[
                    const SizedBox(height: 12),
                    Container(
                      width: double.infinity,
                      padding: const EdgeInsets.all(12),
                      decoration: BoxDecoration(
                        color: Colors.green.shade50,
                        borderRadius: BorderRadius.circular(8),
                        border: Border.all(color: Colors.green.shade200),
                      ),
                      child: Text(
                        _success!,
                        style: TextStyle(color: Colors.green.shade700),
                      ),
                    ),
                  ],
                  const SizedBox(height: 16),
                  const Text(
                    'Address',
                    style: TextStyle(fontWeight: FontWeight.w600, fontSize: 14),
                  ),
                  const SizedBox(height: 6),
                  TextFormField(
                    controller: _addressController,
                    decoration: InputDecoration(
                      hintText: 'e.g., F-11, Street 14, Islamabad',
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(8),
                      ),
                    ),
                  ),
                  const SizedBox(height: 16),
                  const Text(
                    'Location',
                    style: TextStyle(fontWeight: FontWeight.w600, fontSize: 14),
                  ),
                  const SizedBox(height: 8),
                  Row(
                    children: [
                      Expanded(
                        child: ElevatedButton.icon(
                          onPressed: _isLocationLoading ? null : _captureLocation,
                          style: ElevatedButton.styleFrom(
                            backgroundColor: Colors.blue.shade700,
                          ),
                          icon: _isLocationLoading
                              ? const SizedBox(
                                  width: 20,
                                  height: 20,
                                  child: CircularProgressIndicator(
                                    color: Colors.white,
                                    strokeWidth: 2,
                                  ),
                                )
                              : const Icon(Icons.gps_fixed, color: Colors.white),
                          label: _isLocationLoading
                              ? const Text(
                                  'Capturing...',
                                  style: TextStyle(color: Colors.white),
                                )
                              : const Text(
                                  'Capture GPS',
                                  style: TextStyle(color: Colors.white),
                                ),
                        ),
                      ),
                      const SizedBox(width: 8),
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                        decoration: BoxDecoration(
                          border: Border.all(color: Colors.grey.shade300),
                          borderRadius: BorderRadius.circular(8),
                        ),
                        child: Text(
                          _coordinates[0] == 0.0
                              ? 'No location'
                              : '${_coordinates[1].toStringAsFixed(6)}, ${_coordinates[0].toStringAsFixed(6)}',
                          style: const TextStyle(fontSize: 12),
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 16),
                  const Text(
                    'Before Photo',
                    style: TextStyle(fontWeight: FontWeight.w600, fontSize: 14),
                  ),
                  const SizedBox(height: 8),
                  GestureDetector(
                    onTap: _takePhoto,
                    child: Container(
                      width: double.infinity,
                      height: 150,
                      decoration: BoxDecoration(
                        color: Colors.grey.shade100,
                        borderRadius: BorderRadius.circular(8),
                        border: Border.all(color: Colors.grey.shade300),
                      ),
                      child: _beforePhoto != null
                          ? ClipRRect(
                              borderRadius: BorderRadius.circular(8),
                              child: Image.memory(
                                base64Decode(_beforePhoto!.split(',').last),
                                fit: BoxFit.cover,
                              ),
                            )
                          : const Column(
                              mainAxisAlignment: MainAxisAlignment.center,
                              children: [
                                Icon(Icons.camera_alt, size: 40, color: Colors.grey),
                                SizedBox(height: 8),
                                Text(
                                  'Tap to take photo',
                                  style: TextStyle(color: Colors.grey, fontSize: 14),
                                ),
                              ],
                            ),
                    ),
                  ),
                  const SizedBox(height: 24),
                  SizedBox(
                    width: double.infinity,
                    height: 50,
                    child: ElevatedButton(
                      onPressed: _submitComplaint,
                      style: ElevatedButton.styleFrom(
                        backgroundColor: Colors.green.shade700,
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(8),
                        ),
                      ),
                      child: const Text(
                        'Submit Complaint',
                        style: TextStyle(fontSize: 16, color: Colors.white),
                      ),
                    ),
                  ),
                ],
              ),
            ),
    );
  }
}