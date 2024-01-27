import {
  createAction,
  PieceAuth,
  Property,
} from '@activepieces/pieces-framework';
import { httpClient, HttpMethod } from '@activepieces/pieces-common';
import { StandardResponse } from '../types';

export const clearResult = createAction({
  name: 'clear_result', // Must be a unique across the piece, this shouldn't be changed.
  auth: PieceAuth.None(),
  displayName: 'Clear Inference Result',
  description: 'Clear inference result populated in Inferix',
  
  props: {
    ctx_id: Property.ShortText({
      displayName: 'Context ID',
      description: 'Context ID used for the inference',
      defaultValue: 'dummy-id',
      required: true,
    }),
    key: Property.ShortText({
      displayName: 'Result Key',
      description: 'Key of the result to clear',
      required: false,
    }),
  },
  async run(context) {
    const INFERIX_URL = 'http://localhost:8000';

    // Prepare request url
    let url = `${INFERIX_URL}/api/llm/v1/infer/streams/${context.propsValue.ctx_id}`;
    if (context.propsValue.key !== undefined && context.propsValue.key !== '') {
      url += `/${context.propsValue.key}`;
    }

    const res = await httpClient.sendRequest<StandardResponse>({
      method: HttpMethod.DELETE,
      url: url,
    });

    if (res.status !== 200) {
      throw new Error(
        `Failed to clear result: ${res.status} - ${res.body.message}`
      );
    }

    return res.body;
  },
});
