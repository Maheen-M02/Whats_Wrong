import { GoogleGenerativeAI } from '@google/generative-ai';
import { AnalyzerRequest, AnalyzerResponse } from '../types/analyzer';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
  console.warn('Gemini API key not found. Please add VITE_GEMINI_API_KEY to your .env file.');
}

const genAI = new GoogleGenerativeAI(API_KEY || '');

const createPrompt = (content: string, type: 'text' | 'code'): string => {
  const basePrompt = type === 'code' 
    ? `Analyze the following code and identify any errors, bugs, or issues. Then provide:

1. A clear description of what's wrong
2. An explanation of why it's problematic
3. A corrected version of the code

Code to analyze:
\`\`\`
${content}
\`\`\`

Please respond in this exact JSON format:
{
  "errorFound": "Brief description of the error(s) found",
  "explanation": "Detailed explanation of why this is wrong and the impact",
  "fixedVersion": "The corrected code",
  "success": true
}

If no errors are found, set "errorFound" to "No errors detected" and "fixedVersion" to the original code.`
    : `Analyze the following text for grammar, spelling, style, or structural issues. Then provide:

1. A clear description of what's wrong
2. An explanation of why it's problematic
3. A corrected version of the text

Text to analyze:
"${content}"

Please respond in this exact JSON format:
{
  "errorFound": "Brief description of the error(s) found",
  "explanation": "Detailed explanation of why this is wrong and the impact",
  "fixedVersion": "The corrected text",
  "success": true
}

If no errors are found, set "errorFound" to "No errors detected" and "fixedVersion" to the original text.`;

  return basePrompt;
};

export const analyzeWithGemini = async (request: AnalyzerRequest): Promise<AnalyzerResponse> => {
  if (!API_KEY) {
    throw new Error('Gemini API key is not configured. Please add your API key to the .env file.');
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const prompt = createPrompt(request.content, request.type);
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Try to parse JSON response
    try {
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsedResponse = JSON.parse(jsonMatch[0]);
        return {
          errorFound: parsedResponse.errorFound || 'Analysis completed',
          explanation: parsedResponse.explanation || 'No detailed explanation provided',
          fixedVersion: parsedResponse.fixedVersion || request.content,
          success: parsedResponse.success !== false
        };
      }
    } catch (parseError) {
      console.warn('Failed to parse JSON response, using fallback parsing');
    }
    
    // Fallback parsing if JSON parsing fails
    const lines = text.split('\n').filter(line => line.trim());
    return {
      errorFound: lines[0] || 'Analysis completed',
      explanation: lines.slice(1, -1).join(' ') || 'Analysis provided by Gemini AI',
      fixedVersion: lines[lines.length - 1] || request.content,
      success: true
    };
    
  } catch (error) {
    console.error('Gemini API Error:', error);
    
    if (error instanceof Error) {
      if (error.message.includes('The model is overloaded')) {
        throw new Error('Gemini AI model is currently overloaded. Please try again in a few moments.');
      } else if (error.message.includes('overloaded')) {
        throw new Error('Gemini AI model is currently overloaded. Please try again in a few moments.');
      } else if (error.message.includes('503')) {
        throw new Error('Gemini AI model is currently overloaded. Please try again in a few moments.');
      if (error.message.includes('API_KEY_INVALID')) {
        throw new Error('Invalid Gemini API key. Please check your API key configuration.');
      } else if (error.message.includes('QUOTA_EXCEEDED')) {
        throw new Error('Gemini API quota exceeded. Please try again later.');
      } else if (error.message.includes('SAFETY')) {
        throw new Error('Content was blocked by safety filters. Please try different content.');
      }
    }
    
    throw new Error('Failed to analyze content with Gemini AI. Please try again.');
  }
};