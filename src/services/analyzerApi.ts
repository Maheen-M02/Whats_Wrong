import { AnalyzerRequest, AnalyzerResponse, ApiError } from '../types/analyzer';
import { analyzeWithGemini } from './geminiApi';

export const analyzeContent = async (request: AnalyzerRequest): Promise<AnalyzerResponse> => {
  try {
    return await analyzeWithGemini(request);
  } catch (error) {
    const apiError: ApiError = {
      message: error instanceof Error ? error.message : 'Unknown error occurred',
      code: 'ANALYSIS_FAILED'
    };
    throw apiError;
  }
};