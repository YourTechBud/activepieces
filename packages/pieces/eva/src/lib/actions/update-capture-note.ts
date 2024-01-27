import {
  createAction,
  PieceAuth,
  Property,
} from '@activepieces/pieces-framework';
import { httpClient, HttpMethod } from '@activepieces/pieces-common';

export const updateCaptureNote = createAction({
  name: 'update_capture_note', // Must be a unique across the piece, this shouldn't be changed.
  auth: PieceAuth.None(),
  displayName: 'Update capture note',
  description: 'Update fields of a capture note',
  props: {
    id: Property.ShortText({
      displayName: 'ID',
      description: 'ID of the capture note',
      required: true,
    }),
    title: Property.ShortText({
      displayName: 'Title',
      description: 'Title of the capture note',
      required: false,
    }),
    generated_summary: Property.LongText({
      displayName: 'Summary',
      description: 'Summary of the capture note',
      required: false,
    }),
    generated_body: Property.LongText({
      displayName: 'Body',
      description: 'Body of the capture note',
      required: false,
    }),
    generated_actions: Property.Json({
      displayName: 'Actions',
      description: 'Actions of the capture note',
      required: false,
    }),
  },
  async run(context) {
    const EVA_URL = 'http://localhost:11000';

    // TODO: Add some authentication

    // Prepare request url
    const url = `${EVA_URL}/api/v1/capture-notes/${context.propsValue.id}`;

    // Prepare request body
    const body = {
      title: context.propsValue.title,
      generated_summary: context.propsValue.generated_summary,
      generated_body: context.propsValue.generated_body,
      generated_actions: context.propsValue.generated_actions,
    };

    // Send request
    const res = await httpClient.sendRequest({
      method: HttpMethod.PUT,
      url: url,
      body: body,
    });

    return res;
  },
});
