# What's Wrong in This? Analyzer

A beautiful, production-ready web application that uses Google Gemini AI to analyze text and code for errors, providing detailed explanations and corrected versions.

## Features

- **AI-Powered Analysis**: Uses Google Gemini 1.5 Flash for intelligent error detection
- **Dual Mode**: Analyze both text (grammar, style) and code (syntax, bugs)
- **Beautiful UI**: Modern, responsive design with Tailwind CSS
- **Real-time Feedback**: Loading states and error handling
- **Copy to Clipboard**: Easy copying of corrected versions
- **Dark Mode Support**: Automatic dark/light theme detection

## Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure Gemini API**
   - Get your API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Create a `.env` file in the root directory
   - Add your API key:
     ```
     VITE_GEMINI_API_KEY=your_actual_api_key_here
     ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```

## Usage

1. **Select Content Type**: Choose between "Text" or "Code" using the toggle
2. **Enter Content**: Paste your text or code in the textarea
3. **Analyze**: Click "Analyze Content" to get AI feedback
4. **Review Results**: See errors found, explanations, and corrected versions
5. **Copy Fixed Version**: Use the copy button to get the corrected content

## API Integration

The app uses Google Gemini AI through the `@google/generative-ai` package. The integration includes:

- Structured prompts for consistent responses
- Error handling for API limits and safety filters
- Fallback parsing for non-JSON responses
- Comprehensive error messages for troubleshooting

## Environment Variables

- `VITE_GEMINI_API_KEY`: Your Google Gemini API key (required)

## Tech Stack

- **Frontend**: React + TypeScript + Vite
- **Styling**: Tailwind CSS
- **AI**: Google Gemini 1.5 Flash
- **Icons**: Lucide React
- **Build**: Vite with hot reload

## Error Handling

The app handles various scenarios:
- Invalid or missing API keys
- API quota exceeded
- Content blocked by safety filters
- Network connectivity issues
- Malformed API responses

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - feel free to use this project for your own applications.