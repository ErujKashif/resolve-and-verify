import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';
import '../../providers/auth_provider.dart';
import '../../providers/complaint_provider.dart';
import '../../widgets/complaint_card.dart';

class RouteListScreen extends StatefulWidget {
  const RouteListScreen({super.key});

  @override
  State<RouteListScreen> createState() => _RouteListScreenState();
}

class _RouteListScreenState extends State<RouteListScreen> {
  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      _loadComplaints();
    });
  }

  Future<void> _loadComplaints() async {
    try {
      await context.read<ComplaintProvider>().fetchAssignedComplaints();
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Error: ${e.toString()}')),
        );
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    final authProvider = context.watch<AuthProvider>();
    final complaintProvider = context.watch<ComplaintProvider>();

    return Scaffold(
      appBar: AppBar(
        title: const Text('My Route'),
        backgroundColor: Colors.green.shade700,
        foregroundColor: Colors.white,
        actions: [
          IconButton(
            icon: const Icon(Icons.logout),
            onPressed: () async {
              await authProvider.logout();
              if (mounted) {
                context.go('/login');
              }
            },
          ),
        ],
      ),
      body: complaintProvider.isLoading
          ? const Center(child: CircularProgressIndicator())
          : RefreshIndicator(
              onRefresh: _loadComplaints,
              child: complaintProvider.complaints.isEmpty
                  ? Center(
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Icon(
                            Icons.assignment_outlined,
                            size: 80,
                            color: Colors.grey.shade300,
                          ),
                          const SizedBox(height: 16),
                          const Text(
                            'No assigned complaints',
                            style: TextStyle(color: Colors.grey, fontSize: 16),
                          ),
                          const SizedBox(height: 8),
                          const Text(
                            'Check back later for new assignments',
                            style: TextStyle(color: Colors.grey, fontSize: 14),
                          ),
                        ],
                      ),
                    )
                  : ListView.builder(
                      padding: const EdgeInsets.all(16),
                      itemCount: complaintProvider.complaints.length,
                      itemBuilder: (context, index) {
                        final complaint = complaintProvider.complaints[index];
                        return ComplaintCard(
                          complaint: complaint,
                          showVerifyButtons: false,
                        );
                      },
                    ),
            ),
      floatingActionButton: complaintProvider.complaints.isNotEmpty
          ? FloatingActionButton.extended(
              onPressed: () {
                final unresolved = complaintProvider.complaints.where((c) => c.status == 'Assigned').toList();
                if (unresolved.isNotEmpty) {
                  Navigator.pushNamed(
                    context,
                    '/crew/resolve/${unresolved.first.id}',
                  );
                } else {
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(
                      content: Text('No complaints to resolve'),
                    ),
                  );
                }
              },
              backgroundColor: Colors.green.shade700,
              icon: const Icon(Icons.check_circle),
              label: const Text('Resolve Next'),
            )
          : null,
    );
  }
}
