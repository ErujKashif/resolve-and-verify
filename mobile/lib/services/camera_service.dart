import 'dart:convert';
import 'dart:typed_data';
import 'package:image_picker/image_picker.dart';

class CameraService {
  final ImagePicker _picker = ImagePicker();

  Future<String?> takePhoto() async {
    try {
      final XFile? image = await _picker.pickImage(
        source: ImageSource.camera,
        maxWidth: 1200,
        maxHeight: 1200,
        imageQuality: 70, // Built-in compression (works on all platforms)
      );

      if (image == null) return null;

      // Read bytes - works on web and mobile
      final Uint8List bytes = await image.readAsBytes();
      final String base64String = base64Encode(bytes);
      return 'data:image/jpeg;base64,$base64String';
    } catch (e) {
      print('Error taking photo: $e');
      return null;
    }
  }
}