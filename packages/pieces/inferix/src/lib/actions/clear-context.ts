import {
  createAction,
  PieceAuth,
  Property,
} from '@activepieces/pieces-framework';
import { httpClient, HttpMethod } from '@activepieces/pieces-common';
import { StandardResponse } from '../types';

export const clearContext = createAction({
  name: 'clear_context', // Must be a unique across the piece, this shouldn't be changed.
  auth: PieceAuth.None(),
  displayName: 'Clear Context',
  description: 'Clear context populated in Inferix',
  
  props: {
    ctx_id: Property.ShortText({
      displayName: 'Context ID',
      description: 'Context ID used for the inference',
      required: true,
    }),
  },
  async run(context) {
    const INFERIX_URL = 'http://localhost:8000';

    // Prepare request url
    const url = `${INFERIX_URL}/api/llm/v1/infer/contexts/${context.propsValue.ctx_id}`;

    // Send request
    const res = await httpClient.sendRequest<StandardResponse>({
      method: HttpMethod.DELETE,
      url: url,
    });

    // Check response
    if (res.status !== 200) {
      throw new Error(
        `Failed to clear result: ${res.status} - ${res.body.message}`
      );
    }

    return res.body;
  },
});
