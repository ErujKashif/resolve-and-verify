import 'dart:convert';
import 'package:flutter/material.dart';
import '../models/complaint.dart';
import '../utils/constants.dart';
import 'image_viewer.dart';

class ComplaintCard extends StatelessWidget {
  final Complaint complaint;
  final VoidCallback? onVerifyYes;
  final VoidCallback? onVerifyNo;
  final bool showVerifyButtons;

  const ComplaintCard({
    super.key,
    required this.complaint,
    this.onVerifyYes,
    this.onVerifyNo,
    this.showVerifyButtons = false,
  });

  Color _getStatusColor(String status) {
    final colorHex = Constants.statusColors[status];
    return colorHex != null ? Color(int.parse('0xFF${colorHex.substring(1)}')) : Colors.grey;
  }

  @override
  Widget build(BuildContext context) {
    return Card(
      margin: const EdgeInsets.only(bottom: 12),
      elevation: 2,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Expanded(
                  child: Text(
                    complaint.address,
                    style: const TextStyle(fontSize: 16, fontWeight: FontWeight.w600),
                    maxLines: 2,
                    overflow: TextOverflow.ellipsis,
                  ),
                ),
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                  decoration: BoxDecoration(
                    color: _getStatusColor(complaint.status).withOpacity(0.1),
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Text(
                        Constants.statusIcons[complaint.status] ?? '📌',
                        style: const TextStyle(fontSize: 12),
                      ),
                      const SizedBox(width: 4),
                      Text(
                        complaint.status,
                        style: TextStyle(
                          fontSize: 12,
                          fontWeight: FontWeight.w600,
                          color: _getStatusColor(complaint.status),
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
            const SizedBox(height: 8),
            Text(
              'ID: ${complaint.id.substring(complaint.id.length > 6 ? complaint.id.length - 6 : 0)}',
              style: const TextStyle(color: Colors.grey, fontSize: 12),
            ),
            const SizedBox(height: 4),
            Text(
              'Submitted: ${_formatDate(complaint.createdAt)}',
              style: const TextStyle(color: Colors.grey, fontSize: 12),
            ),
            if (complaint.resolvedAt != null) ...[
              const SizedBox(height: 4),
              Text(
                'Resolved: ${_formatDate(complaint.resolvedAt!)}',
                style: const TextStyle(color: Colors.grey, fontSize: 12),
              ),
            ],
            if (complaint.penaltyAmount > 0) ...[
              const SizedBox(height: 4),
              Text(
                'Penalty: Rs. ${complaint.penaltyAmount}',
                style: const TextStyle(
                  color: Colors.orange,
                  fontWeight: FontWeight.w600,
                  fontSize: 14,
                ),
              ),
            ],
            if (complaint.beforePhoto.isNotEmpty) ...[
              const SizedBox(height: 8),
              Row(
                children: [
                  Expanded(
                    child: InkWell(
                      onTap: () {
                        Navigator.push(
                          context,
                          MaterialPageRoute(
                            builder: (context) => ImageViewer(
                              imageData: complaint.beforePhoto,
                              title: 'Before Photo',
                            ),
                          ),
                        );
                      },
                      child: Container(
                        height: 80,
                        decoration: BoxDecoration(
                          borderRadius: BorderRadius.circular(8),
                          color: Colors.grey.shade100,
                          border: Border.all(color: Colors.grey.shade300),
                        ),
                        child: ClipRRect(
                          borderRadius: BorderRadius.circular(8),
                          child: Image.memory(
                            base64Decode(complaint.beforePhoto.split(',').last),
                            fit: BoxFit.cover,
                            errorBuilder: (context, error, stackTrace) {
                              return const Icon(Icons.image_not_supported, size: 40, color: Colors.grey);
                            },
                          ),
                        ),
                      ),
                    ),
                  ),
                  if (complaint.afterPhoto != null) ...[
                    const SizedBox(width: 8),
                    Expanded(
                      child: InkWell(
                        onTap: () {
                          Navigator.push(
                            context,
                            MaterialPageRoute(
                              builder: (context) => ImageViewer(
                                imageData: complaint.afterPhoto!,
                                title: 'After Photo',
                              ),
                            ),
                          );
                        },
                        child: Container(
                          height: 80,
                          decoration: BoxDecoration(
                            borderRadius: BorderRadius.circular(8),
                            color: Colors.grey.shade100,
                            border: Border.all(color: Colors.grey.shade300),
                          ),
                          child: ClipRRect(
                            borderRadius: BorderRadius.circular(8),
                            child: Image.memory(
                              base64Decode(complaint.afterPhoto!.split(',').last),
                              fit: BoxFit.cover,
                              errorBuilder: (context, error, stackTrace) {
                                return const Icon(Icons.image_not_supported, size: 40, color: Colors.grey);
                              },
                            ),
                          ),
                        ),
                      ),
                    ),
                  ],
                ],
              ),
            ],
            if (showVerifyButtons && complaint.status == 'Resolved') ...[
              const SizedBox(height: 12),
              Row(
                children: [
                  Expanded(
                    child: ElevatedButton(
                      onPressed: onVerifyYes,
                      style: ElevatedButton.styleFrom(backgroundColor: Colors.green.shade700),
                      child: const Text('✅ Yes, Done'),
                    ),
                  ),
                  const SizedBox(width: 8),
                  Expanded(
                    child: ElevatedButton(
                      onPressed: onVerifyNo,
                      style: ElevatedButton.styleFrom(backgroundColor: Colors.red.shade700),
                      child: const Text('❌ No, Not Resolved'),
                    ),
                  ),
                ],
              ),
            ],
            if (complaint.verifiedByCitizen == true) ...[
              const SizedBox(height: 8),
              const Row(
                children: [
                  Icon(Icons.check_circle, color: Colors.green, size: 16),
                  SizedBox(width: 4),
                  Text(
                    '✅ Verified as resolved',
                    style: TextStyle(color: Colors.green, fontWeight: FontWeight.w600),
                  ),
                ],
              ),
            ],
            if (complaint.status == 'Escalated') ...[
              const SizedBox(height: 8),
              const Row(
                children: [
                  Icon(Icons.warning, color: Colors.red, size: 16),
                  SizedBox(width: 4),
                  Text(
                    '❌ Escalated – pending officer review',
                    style: TextStyle(color: Colors.red, fontWeight: FontWeight.w600),
                  ),
                ],
              ),
            ],
            if (complaint.status == 'Closed' && complaint.penaltyAmount > 0) ...[
              const SizedBox(height: 8),
              const Row(
                children: [
                  Icon(Icons.money_off, color: Colors.orange, size: 16),
                  SizedBox(width: 4),
                  Text(
                    '💰 Penalty recorded',
                    style: TextStyle(color: Colors.orange, fontWeight: FontWeight.w600),
                  ),
                ],
              ),
            ],
          ],
        ),
      ),
    );
  }

  String _formatDate(DateTime date) {
    return '${date.day.toString().padLeft(2, '0')}/${date.month.toString().padLeft(2, '0')}/${date.year}, ${date.hour.toString().padLeft(2, '0')}:${date.minute.toString().padLeft(2, '0')}';
  }
}