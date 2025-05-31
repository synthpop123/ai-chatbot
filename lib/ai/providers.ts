import {
  customProvider,
  extractReasoningMiddleware,
  wrapLanguageModel,
} from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import { isTestEnvironment } from '../constants';
import {
  artifactModel,
  chatModel,
  reasoningModel,
  titleModel,
} from './models.test';


const newapi = createOpenAI({
  compatibility: 'compatible',
  baseURL: process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1',
});

export const myProvider = isTestEnvironment
  ? customProvider({
      languageModels: {
        'chat-model': chatModel,
        'chat-model-reasoning': reasoningModel,
        'title-model': titleModel,
        'artifact-model': artifactModel,
      },
    })
  : customProvider({
      languageModels: {
        'chat-model': newapi.chat('gpt-4o'),
        'chat-model-reasoning': wrapLanguageModel({
          model: newapi.chat('qwen3-235b-a22b'),
          middleware: extractReasoningMiddleware({ tagName: 'think' }),
        }),
        'title-model': newapi.chat('gpt-4o-mini'),
        'artifact-model': newapi.chat('gpt-4o'),
      },
      imageModels: {
        'small-model': newapi.image('grok-2-image'),
      },
    });
