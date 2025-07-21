export interface AnalyzerRequest {
  content: string;
  type: 'text' | 'code';
}

export interface AnalyzerResponse {
  errorFound: string;
  explanation: string;
  fixedVersion: string;
  success: boolean;
}

export interface ApiError {
  message: string;
  code?: string;
}