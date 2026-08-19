import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';
import 'screens/auth/login_screen.dart';
import 'screens/auth/otp_verify_screen.dart';
import 'screens/citizen/home_screen.dart';
import 'screens/citizen/new_complaint_screen.dart';
import 'screens/crew/route_list_screen.dart';
import 'screens/crew/resolve_complaint_screen.dart';
import 'providers/auth_provider.dart';

final router = GoRouter(
  initialLocation: '/login',
  redirect: (context, state) {
    final authProvider = Provider.of<AuthProvider>(context, listen: false);
    final isLoggedIn = authProvider.isLoggedIn;
    final isLoginRoute = state.matchedLocation == '/login' ||
        state.matchedLocation.startsWith('/verify-otp');

    if (isLoggedIn && isLoginRoute) {
      final role = authProvider.user?.role;
      switch (role) {
        case 'citizen':
          return '/citizen';
        case 'crew':
          return '/crew';
        default:
          return '/citizen';
      }
    }

    if (!isLoggedIn && !isLoginRoute) {
      return '/login';
    }

    return null;
  },
  routes: [
    GoRoute(
      path: '/login',
      name: 'login',
      builder: (context, state) => const LoginScreen(),
    ),
    GoRoute(
      path: '/verify-otp',
      name: 'verify-otp',
      builder: (context, state) {
        final email = state.extra as String? ?? '';
        return OTPVerifyScreen(email: email);
      },
    ),
    GoRoute(
      path: '/citizen',
      name: 'citizen',
      builder: (context, state) => const HomeScreen(),
      routes: [
        GoRoute(
          path: 'new-complaint',
          name: 'new-complaint',
          builder: (context, state) => const NewComplaintScreen(),
        ),
      ],
    ),
    GoRoute(
      path: '/crew',
      name: 'crew',
      builder: (context, state) => const RouteListScreen(),
      routes: [
        GoRoute(
          path: 'resolve/:id',
          name: 'resolve',
          builder: (context, state) {
            final id = state.pathParameters['id'] ?? '';
            return ResolveComplaintScreen(complaintId: id);
          },
        ),
      ],
    ),
  ],
);