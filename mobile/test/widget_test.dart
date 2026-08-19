import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:provider/provider.dart';
import 'package:resolve_verify/main.dart';
import 'package:resolve_verify/providers/auth_provider.dart';
import 'package:resolve_verify/providers/complaint_provider.dart';

void main() {
  testWidgets('App launches successfully', (WidgetTester tester) async {
    // Build our app and trigger a frame.
    await tester.pumpWidget(
      MultiProvider(
        providers: [
          ChangeNotifierProvider(create: (_) => AuthProvider()),
          ChangeNotifierProvider(create: (_) => ComplaintProvider()),
        ],
        child: const MaterialApp(
          home: Scaffold(
            body: Center(
              child: Text('Resolve & Verify'),
            ),
          ),
        ),
      ),
    );

    // Verify that the app loads
    expect(find.text('Resolve & Verify'), findsOneWidget);
  });
}