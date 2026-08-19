class Complaint {
  final String id;
  final String address;
  final List<double> coordinates;
  final String beforePhoto;
  final String? afterPhoto;
  final String status;
  final String? citizenId;
  final String? assignedTo;
  final DateTime createdAt;
  final DateTime? resolvedAt;
  final DateTime? escalatedAt;
  final bool? verifiedByCitizen;
  final int penaltyAmount;

  Complaint({
    required this.id,
    required this.address,
    required this.coordinates,
    required this.beforePhoto,
    this.afterPhoto,
    required this.status,
    this.citizenId,
    this.assignedTo,
    required this.createdAt,
    this.resolvedAt,
    this.escalatedAt,
    this.verifiedByCitizen,
    this.penaltyAmount = 0,
  });

  factory Complaint.fromJson(Map<String, dynamic> json) {
    try {
      // SAFELY extract ID – always as String
      final id = json['_id']?.toString() ?? '';

      // SAFELY extract coordinates
      List<double> coords = [0.0, 0.0];
      final location = json['location'];
      if (location is Map && location['coordinates'] is List) {
        coords = (location['coordinates'] as List).map((e) => (e as num).toDouble()).toList();
      }

      // SAFELY extract citizen ID
      String? citizenId;
      if (json['citizen'] is Map) {
        citizenId = json['citizen']['_id']?.toString();
      } else {
        citizenId = json['citizen']?.toString();
      }

      // SAFELY extract assignedTo ID
      String? assignedTo;
      if (json['assignedTo'] is Map) {
        assignedTo = json['assignedTo']['_id']?.toString();
      } else {
        assignedTo = json['assignedTo']?.toString();
      }

      return Complaint(
        id: id,
        address: json['address']?.toString() ?? '',
        coordinates: coords,
        beforePhoto: json['beforePhoto']?.toString() ?? '',
        afterPhoto: json['afterPhoto']?.toString(),
        status: json['status']?.toString() ?? 'Open',
        citizenId: citizenId,
        assignedTo: assignedTo,
        createdAt: json['createdAt'] != null
            ? DateTime.parse(json['createdAt'].toString())
            : DateTime.now(),
        resolvedAt: json['resolvedAt'] != null
            ? DateTime.parse(json['resolvedAt'].toString())
            : null,
        escalatedAt: json['escalatedAt'] != null
            ? DateTime.parse(json['escalatedAt'].toString())
            : null,
        verifiedByCitizen: json['verifiedByCitizen'] as bool?,
        penaltyAmount: (json['penaltyAmount'] as num?)?.toInt() ?? 0,
      );
    } catch (e) {
      print('❌ Error parsing Complaint: $e');
      print('❌ JSON: $json');
      rethrow;
    }
  }

  Map<String, dynamic> toJson() {
    return {
      '_id': id,
      'address': address,
      'location': {
        'type': 'Point',
        'coordinates': coordinates,
      },
      'beforePhoto': beforePhoto,
      'afterPhoto': afterPhoto,
      'status': status,
      'citizen': citizenId,
      'assignedTo': assignedTo,
      'createdAt': createdAt.toIso8601String(),
      'resolvedAt': resolvedAt?.toIso8601String(),
      'escalatedAt': escalatedAt?.toIso8601String(),
      'verifiedByCitizen': verifiedByCitizen,
      'penaltyAmount': penaltyAmount,
    };
  }
}