import 'dart:convert';
import 'dart:typed_data';
import 'package:flutter/material.dart';

class ImageViewer extends StatelessWidget {
  final String imageData;
  final String title;

  const ImageViewer({
    super.key,
    required this.imageData,
    required this.title,
  });

  @override
  Widget build(BuildContext context) {
    Uint8List? bytes;
    try {
      final base64 = imageData.split(',').last;
      bytes = base64Decode(base64);
    } catch (e) {
      print('Error decoding image: $e');
    }

    return Scaffold(
      appBar: AppBar(
        title: Text(title),
        backgroundColor: Colors.green.shade700,
        foregroundColor: Colors.white,
      ),
      body: Center(
        child: bytes != null
            ? InteractiveViewer(
                minScale: 0.5,
                maxScale: 4.0,
                child: Image.memory(
                  bytes,
                  fit: BoxFit.contain,
                  errorBuilder: (context, error, stackTrace) {
                    return const Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Icon(Icons.broken_image, size: 80, color: Colors.grey),
                        SizedBox(height: 8),
                        Text('Failed to load image', style: TextStyle(color: Colors.grey)),
                      ],
                    );
                  },
                ),
              )
            : const Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(Icons.broken_image, size: 80, color: Colors.grey),
                  SizedBox(height: 8),
                  Text('No image data available', style: TextStyle(color: Colors.grey)),
                ],
              ),
      ),
    );
  }
}