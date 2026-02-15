export interface WaitlistEntry {
  email: string;
  createdAt: string;
}

export interface ContactSubmission {
  name: string;
  email: string;
  message: string;
}

export interface MetricsEvent {
  sectionViewed: string;
  timestamp: string;
}

export interface ApiResponse {
  success: boolean;
  message?: string;
}

export interface ValidationResult {
  valid: boolean;
  error?: string;
}
