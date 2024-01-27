import {
  createAction,
  PieceAuth,
  Property,
  DropdownState,
  PropertyContext,
} from '@activepieces/pieces-framework';
import { httpClient, HttpMethod } from '@activepieces/pieces-common';
import {
  CreateChatCompletionResponse,
  RunInferenceRequest,
  ListModelsResponse,
} from '../types';

const getModels = async () => {
  const INFERIX_URL = 'http://localhost:8000';

  const response = await httpClient.sendRequest<ListModelsResponse>({
    method: HttpMethod.GET,
    url: `${INFERIX_URL}/api/llm/v1/models/list`,
  });

  const state: DropdownState<string> = {
    options: response.body.models.map((model) => ({
      label: model.name,
      value: model.name,
    })),
  };
  return state;
};

export const runInference = createAction({
  name: 'run_inference', // Must be a unique across the piece, this shouldn't be changed.
  auth: PieceAuth.None(),
  displayName: 'Run Inference',
  description: 'Run inference using Inferix',
  props: {
    model: Property.ShortText({
      displayName: 'Model',
      description: 'Select a model',
      required: true,
    }),
    // Properties to ask from the user, in this ask we will take number of
    system_message: Property.LongText({
      displayName: 'System Message',
      description: 'Define a system message for the inference',
      defaultValue: 'You are a helpful AI assistant',
      required: true,
    }),
    prompt: Property.LongText({
      displayName: 'Prompt',
      description: 'Define a prompt for the inference',
      defaultValue: 'What is the best programming language?',
      required: true,
    }),
    ctx_id: Property.ShortText({
      displayName: 'Context ID',
      description: 'Context ID used for the inference',
      defaultValue: 'dummy-id',
      required: true,
    }),
    key: Property.ShortText({
      displayName: 'Context Key',
      description: 'Key of the context to use for the inference',
      defaultValue: 'dummy-key',
      required: true,
    }),
    instructions: Property.Json({
      displayName: 'Instructions Object',
      description: 'Define additional instructions for inference',
      defaultValue: { check_for_dedup: false },
      required: true,
    }),
    inference_options: Property.Json({
      displayName: 'Inference Options',
      description: 'Define additional options for inference',
      defaultValue: {},
      required: true,
    }),
  },
  async run(context) {
    const INFERIX_URL = 'http://localhost:8000';

    // Prepare request
    const inferenceRequest: RunInferenceRequest = {
      messages: [
        {
          role: 'system',
          content: context.propsValue.system_message,
        },
        {
          role: 'user',
          content: context.propsValue.prompt,
        },
      ],
      model: context.propsValue.model,
      context: {
        id: context.propsValue.ctx_id,
        key: context.propsValue.key,
      },
      instructions: context.propsValue.instructions,
      ...context.propsValue.inference_options,
    };

    const inferenceResponse =
      await httpClient.sendRequest<CreateChatCompletionResponse>({
        method: HttpMethod.POST,
        url: `${INFERIX_URL}/api/llm/v1/infer`,
        body: inferenceRequest,
      });

    return inferenceResponse.body.choices[0].message;
  },
});
