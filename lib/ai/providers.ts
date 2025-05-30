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
        'chat-model': newapi.chat('grok-3-fast'),
        'chat-model-reasoning': wrapLanguageModel({
          model: newapi.chat('deepseek-r1'),
          middleware: extractReasoningMiddleware({ tagName: 'think' }),
        }),
        'title-model': newapi.chat('glm-4-32b'),
        'artifact-model': newapi.chat('deepseek-r1'),
      },
      imageModels: {
        'small-model': newapi.image('grok-2-image'),
      },
    });
