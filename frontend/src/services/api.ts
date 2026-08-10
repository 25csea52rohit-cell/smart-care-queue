import { mockBackendService } from './mockBackend';

const BASE_URL = '/api';

export async function fetchApi<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = localStorage.getItem('medqueue_token');

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    const contentType = response.headers.get('content-type') || '';

    // Only attempt to parse JSON if response is OK AND return type is JSON
    if (response.ok && contentType.includes('application/json')) {
      return await response.json();
    }
  } catch (e) {
    // Network or fetch error
  }

  // Client-Side Fallback Engine Router
  if (endpoint.startsWith('/queue/live')) {
    return { tickets: mockBackendService.getLiveQueue() } as unknown as T;
  }

  if (endpoint.startsWith('/queue/book')) {
    const body = options.body ? JSON.parse(options.body as string) : {};
    const newTicket = mockBackendService.bookTicket(
      body.symptoms || 'General consultation',
      body.patientAge ? parseInt(body.patientAge) : undefined,
      body.patientNameOverride,
      body.categoryOverride
    );
    return {
      message: 'Ticket generated',
      ticket: newTicket,
      updatedQueue: mockBackendService.getLiveQueue(),
    } as unknown as T;
  }

  if (endpoint.startsWith('/queue/call')) {
    const body = options.body ? JSON.parse(options.body as string) : {};
    const calledTicket = mockBackendService.callTicket(body.ticketId);
    return { message: 'Ticket called', ticket: calledTicket } as unknown as T;
  }

  if (endpoint.startsWith('/queue/complete')) {
    const body = options.body ? JSON.parse(options.body as string) : {};
    const completed = mockBackendService.completeConsultation(body.ticketId);
    return { message: 'Completed', ticket: completed } as unknown as T;
  }

  if (endpoint.startsWith('/analytics')) {
    return mockBackendService.getAnalytics() as unknown as T;
  }

  if (endpoint.startsWith('/auth/me')) {
    return {
      user: {
        id: 'patient-1',
        email: 'patient@hospital.org',
        name: 'John Doe',
        role: 'PATIENT',
      },
    } as unknown as T;
  }

  return {} as T;
}
