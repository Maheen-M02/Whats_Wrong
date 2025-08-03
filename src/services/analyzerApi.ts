import { AnalyzerRequest, AnalyzerResponse, ApiError } from '../types/analyzer';
import { analyzeWithGemini } from './geminiApi';
import { supabase } from '../lib/supabase';

export const analyzeContent = async (request: AnalyzerRequest, userId?: string): Promise<AnalyzerResponse> => {
  try {
    const response = await analyzeWithGemini(request);
    
    // Save to database if user is authenticated
    if (userId && response.success) {
      try {
        await supabase
          .from('analysis_history')
          .insert({
            user_id: userId,
            content: request.content,
            content_type: request.type,
            error_found: response.errorFound,
            explanation: response.explanation,
            fixed_version: response.fixedVersion,
          });
      } catch (dbError) {
        console.error('Failed to save analysis to database:', dbError);
        // Don't throw error here, just log it - the analysis still succeeded
      }
    }
    
    return response;
  } catch (error) {
    const apiError: ApiError = {
      message: error instanceof Error ? error.message : 'Unknown error occurred',
      code: 'ANALYSIS_FAILED'
    };
    throw apiError;
  }
};