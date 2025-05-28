import React from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface AiResponseFormatterProps {
  rawResponse: string; // The raw text string received from the AI chatbot
}

const AiResponseFormatter: React.FC<AiResponseFormatterProps> = ({
  rawResponse,
}) => {
  return <Markdown remarkPlugins={[remarkGfm]}>{rawResponse}</Markdown>;
};

export default AiResponseFormatter;
